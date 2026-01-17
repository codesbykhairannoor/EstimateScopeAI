namespace EstimateScope.API.Models
{
    public class ProjectInput
    {
        public string Description { get; set; } = string.Empty;
        public List<string> RiskAnswers { get; set; } = new();
    }

    public class ProjectBreakdown
    {
        public string TaskName { get; set; } = string.Empty;
        public int EstimatedHours { get; set; }
        public decimal EstimatedCost { get; set; }
        public string OutOfScope { get; set; } = string.Empty;
    }
}