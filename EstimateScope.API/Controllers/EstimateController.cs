using Microsoft.AspNetCore.Mvc;
using EstimateScope.API.Models;

namespace EstimateScope.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstimateController : ControllerBase
    {
        [HttpPost("analyze")]
        public IActionResult Analyze([FromBody] ProjectInput input)
        {
            // Dummy Data dulu biar lu bisa ngetes koneksi ke Angular
            // Nanti di part berikutnya kita ganti pake logic AI beneran
            var mockResult = new List<ProjectBreakdown>
            {
                new ProjectBreakdown { 
                    TaskName = "Setup Database & Auth", 
                    EstimatedHours = 10, 
                    EstimatedCost = 500,
                    OutOfScope = "Tidak termasuk migrasi data dari sistem lama."
                },
                new ProjectBreakdown { 
                    TaskName = "UI Implementation", 
                    EstimatedHours = 20, 
                    EstimatedCost = 1000,
                    OutOfScope = "Hanya untuk 3 halaman utama, tidak termasuk Dashboard Admin."
                }
            };

            return Ok(new {
                Success = true,
                Data = mockResult,
                RiskLevel = "Low"
            });
        }
    }
}