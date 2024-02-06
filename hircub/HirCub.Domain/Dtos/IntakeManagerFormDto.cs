namespace CareHub.Domain.Dtos
{
    public class IntakeManagerFormDto
    {
        public long Id { get; set; }
        public bool LiveTogether { get; set; }
        public string PostalCode { get; set; }
        public string CaredPostalCode { get; set; }
        public string CaredName { get; set; }
        public string UserId { get; set; }
        public string ScreenName { get; set; }
    }
}
