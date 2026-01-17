namespace EstimateScope.API.Models
{
    public class ProjectInput
    {
        public string Description { get; set; } = string.Empty;
        public List<string> RiskAnswers { get; set; } = new();
        public string ProjectType { get; set; } = "Software Development"; // Web, Mobile, Construction
        public string Complexity { get; set; } = "Medium"; // Low, Medium, High
        public decimal HourlyRate { get; set; } = 50; // Default $50
        public string Duration { get; set; } = "1 Month";
    }

    public class ProjectBreakdown
    {
        public string TaskName { get; set; } = string.Empty;
        public int EstimatedHours { get; set; }
        public decimal EstimatedCost { get; set; }
        public string OutOfScope { get; set; } = string.Empty;
    }
}