using Microsoft.AspNetCore.Mvc;
using EstimateScope.API.Models;
using System.Text;
using System.Text.Json;

namespace EstimateScope.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstimateController : ControllerBase
    {
        private readonly string _apiKey;
        private static readonly HttpClient _httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(60) };

        public EstimateController(IConfiguration configuration)
        {
            _apiKey = configuration["Gemini:ApiKey"];
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> Analyze([FromBody] ProjectInput input)
        {
            // [FIX 1] Deklarasikan userRate DULUAN sebelum dipakai di prompt
            // Kita kasih fallback ke 15 kalau inputnya 0 atau error
            decimal userRate = input.HourlyRate > 0 ? input.HourlyRate : 15;

            // Debugging di Terminal biar lu tau angka berapa yang dipake
            Console.WriteLine($"\n[1] Processing Request... Rate: ${userRate}/hr");

            if (input == null || string.IsNullOrEmpty(input.Description))
            {
                return BadRequest(new { success = false, message = "Deskripsi kosong." });
            }

            try
            {
                var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={_apiKey}";
                
                // [FIX 2] Prompt "Galak" biar jam-nya dipecah kecil & harga akurat
                var prompt = $@"
                PERAN: Anda adalah Senior Software Estimator.
                KONTEKS: Proyek '{input.ProjectType}' (Kompleksitas: {input.Complexity}).
                TARIF: ${userRate} per jam.
                DESKRIPSI: {input.Description}

                INSTRUKSI WAJIB (JANGAN DILANGGAR):
                1. **GRANULARITAS**: Pecah fitur besar menjadi sub-task. 
                   - MAKSIMAL 15 jam per baris task. Jangan ada task 40 jam!
                   - Contoh: Jangan 'Backend (100h)', tapi 'Setup DB (8h)', 'API Auth (10h)', dst.
                
                2. **MATEMATIKA**:
                   - EstimatedCost HARUS = (EstimatedHours x {userRate}).
                   - JANGAN membulatkan harga seenaknya.
                   - Contoh: Jika 10 jam, biaya = ${10 * userRate}.

                3. **OUTPUT**: JSON MURNI tanpa format markdown.

                JSON TEMPLATE:
                {{
                  ""success"": true,
                  ""riskLevel"": ""Low/Medium/High"",
                  ""data"": [
                    {{
                      ""taskName"": ""Desain Schema Database"",
                      ""estimatedHours"": 8,
                      ""estimatedCost"": {8 * userRate}, 
                      ""outOfScope"": ""Migrasi data lama""
                    }}
                  ]
                }}
                Bahasa: Indonesia Formal.";

                var requestBody = new
                {
                    contents = new[] {
                        new { parts = new[] { new { text = prompt } } }
                    }
                };

                var jsonRequest = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                Console.WriteLine("[2] Mengirim ke Gemini...");
                var response = await _httpClient.PostAsync(url, content);
                var responseString = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, new { message = "Google Error", detail = responseString });
                }

                using var doc = JsonDocument.Parse(responseString);
                var aiText = doc.RootElement.GetProperty("candidates")[0]
                    .GetProperty("content").GetProperty("parts")[0]
                    .GetProperty("text").GetString();

                string cleanJson = aiText ?? "{}";
                // Bersihkan Markdown ```json
                if (cleanJson.Contains("```")) {
                    cleanJson = cleanJson.Replace("```json", "").Replace("```", "").Trim();
                }

                Console.WriteLine("[3] Sukses! Mengirim data ke Angular.");
                return Content(cleanJson, "application/json");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERR] {ex.Message}");
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}