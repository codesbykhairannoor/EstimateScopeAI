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
        // Timeout diperpanjang jadi 120 detik (2 menit) karena AI butuh mikir lebih lama buat grouping
        private static readonly HttpClient _httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(120) };

        public EstimateController(IConfiguration configuration)
        {
            _apiKey = configuration["Gemini:ApiKey"] ?? "";
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> Analyze([FromBody] ProjectInput input)
        {
            // Ambil rate dari input, fallback ke 15 jika 0
            decimal userRate = input.HourlyRate > 0 ? input.HourlyRate : 15;

            // Log untuk debugging
            Console.WriteLine($"\n[1] Analisis: {input.ProjectType} | Rate: ${userRate}");

            if (input == null || string.IsNullOrEmpty(input.Description))
            {
                return BadRequest(new { success = false, message = "Deskripsi kosong." });
            }

            try
            {
                var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={_apiKey}";
                
                // --- PROMPT BARU YANG LEBIH GENERAL & CERDAS ---
                var prompt = $@"
ROLE: Senior Strategic Project Estimator.
TASK: Create a High-Level Executive Cost Estimate (Quotation).

INPUT DATA:
- Domain/Industry: {input.ProjectType}
- Project Scope: {input.Description}
- User Rate: ${userRate}/hour (FIXED RATE).

STRICT RULES (MUST FOLLOW):
1. **NO MICRO-TASKS**: Do not list granular items like 'Install Git', 'Create Sketch', or 'Setup Database'.
2. **PHASED APPROACH**: Group all related activities into **High-Level Phases**.
   - Example (Dev): Group 'Setup Env', 'Repo Init', 'DB Design' -> into ""Phase 1: Initialization & Architecture"".
   - Example (Design): Group 'Moodboard', 'Wireframe', 'Mockup' -> into ""Phase 1: Research & Visual Exploration"".
   - Example (General): Group 'Planning', 'Survey', 'Permits' -> into ""Phase 1: Pre-Project Preparation"".
3. **ROW LIMIT**: The output JSON must contain **ONLY 4 to 8 items** (Milestones).
4. **MATHEMATICS**: `estimatedCost` MUST be calculated as (`estimatedHours` * {userRate}). Do not use market standards. Use the User Rate provided.

OUTPUT FORMAT (JSON ONLY, NO MARKDOWN):
{{
  ""success"": true,
  ""riskLevel"": ""Low/Medium/High"",
  ""data"": [
    {{
      ""taskName"": ""Phase 1: [Phase Name Based on Domain]"",
      ""estimatedHours"": 25,
      ""estimatedCost"": {(25 * userRate)}, 
      ""outOfScope"": ""[Specific boundary for this phase]""
    }},
    {{
      ""taskName"": ""Phase 2: [Core Implementation Name]"",
      ""estimatedHours"": 40,
      ""estimatedCost"": {(40 * userRate)}, 
      ""outOfScope"": ""...""
    }}
  ]
}}";
                var requestBody = new
                {
                    contents = new[] { new { parts = new[] { new { text = prompt } } } }
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
                if (cleanJson.Contains("```")) {
                    cleanJson = cleanJson.Replace("```json", "").Replace("```", "").Trim();
                }

                Console.WriteLine("[3] Sukses! Mengirim data ke Angular.");
                return Content(cleanJson, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}