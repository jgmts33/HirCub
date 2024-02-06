using System;

namespace CareHub.Domain.Dtos
{
    public class MedicationDto
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string Medication { get; set; }
        public string Dose { get; set; }
        public string Schedule { get; set; }
        public string Time { get; set; }
        public bool? Active { get; set; }
        public DateTime Date { get; set; }
        public string Purpose { get; set; }
        public string Notes { get; set; }
    }
}
