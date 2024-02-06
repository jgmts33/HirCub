using System.Collections.Generic;

namespace CareHub.Domain.Dtos.Reporting.Tabs
{
    public class ProblemTab : ReportTab
    {
        public bool IsPain { get; set; }
        public bool IsFront { get; set; }
        public int BodyPart { get; set; }
        public int ProblemTypeId { get; set; }
        public string ProblemTypeName { get; set; }
        public List<ReportPoint> Points { get; set; }
        public bool NotEnoughData { get; set; }
        public int XTickCount { get; set; }
        public List<ConcernDetailRow> Table { get; set; }
    }
}
