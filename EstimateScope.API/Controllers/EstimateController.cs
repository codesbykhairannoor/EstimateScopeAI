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
        
        // Timeout 60 detik biar aman
        private static readonly HttpClient _httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(60) };

        // INJECTION: Kita ambil API Key dari appsettings.json, BUKAN ditulis di sini
        public EstimateController(IConfiguration configuration)
        {
            _apiKey = configuration["Gemini:ApiKey"];
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> Analyze([FromBody] ProjectInput input)
        {
            Console.WriteLine("\n[1] Request Masuk...");

            if (input == null || string.IsNullOrEmpty(input.Description))
            {
                return BadRequest(new { success = false, message = "Deskripsi kosong." });
            }

            // Validasi darurat kalau Key belum dipasang di appsettings.json
            if (string.IsNullOrEmpty(_apiKey))
            {
                Console.WriteLine("[ERR] API Key belum diset di appsettings.json!");
                return StatusCode(500, new { message = "Konfigurasi Server Error: API Key hilang." });
            }

            try
            {
                // Menggunakan model 'gemini-2.5-flash' yang terbukti jalan di akun lu
                var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={_apiKey}";
                
                var requestBody = new
                {
                    contents = new[] {
                        new { 
                            parts = new[] { 
                                new { text = $"Anda adalah Senior Project Manager. Analisis proyek: '{input.Description}'. Berikan breakdown tugas dalam format JSON MURNI (tanpa markdown ```json). Struktur: {{ \"success\": true, \"riskLevel\": \"Low/Medium/High\", \"data\": [ {{ \"taskName\": \"...\", \"estimatedHours\": 10, \"estimatedCost\": 500, \"outOfScope\": \"...\" }} ] }}. Gunakan Bahasa Indonesia." } 
                            } 
                        }
                    }
                };

                Console.WriteLine($"[2] Mengirim ke Gemini 2.5 Flash...");
                var jsonRequest = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(url, content);
                var responseString = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"[ERR] Gagal: {responseString}");
                    return StatusCode((int)response.StatusCode, new { message = "Google Error", detail = responseString });
                }

                Console.WriteLine("[3] Berhasil! Parsing Respon...");
                using var doc = JsonDocument.Parse(responseString);
                
                var aiText = doc.RootElement
                    .GetProperty("candidates")[0]
                    .GetProperty("content")
                    .GetProperty("parts")[0]
                    .GetProperty("text")
                    .GetString();

                // Bersihin Markdown kalau ada
                string cleanJson = aiText ?? "{}";
                if (cleanJson.Contains("```"))
                {
                    cleanJson = cleanJson.Replace("```json", "").Replace("```", "").Trim();
                }

                Console.WriteLine("[4] Sukses! Data dikirim ke Angular.");
                return Content(cleanJson, "application/json");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERR] Fatal: {ex.Message}");
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}