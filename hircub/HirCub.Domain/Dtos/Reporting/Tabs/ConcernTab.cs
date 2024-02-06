using System.Collections.Generic;

namespace CareHub.Domain.Dtos.Reporting.Tabs
{
    public class ConcernTab : ReportTab
    {
        public string InternalName { get; set; }

        public string DisplayName { get; set; }

        public List<ConcernValue> ConcernValues { get; set; }
    }
}
