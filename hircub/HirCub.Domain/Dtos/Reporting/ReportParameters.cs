using CareHub.Domain.Enums;
using System;

namespace CareHub.Domain.Dtos.Reporting
{
    public class ReportParameters
    {
        public bool IsPain { get; set; }
        public bool IsFront { get; set; }
        public bool IsConcern { get; set; }
        public bool IsHappiness { get; set; }
        public int BodyPart { get; set; }
        public int ProblemTypeId { get; set; }
        public ReportPeriod ReportPeriod { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
    }
}
