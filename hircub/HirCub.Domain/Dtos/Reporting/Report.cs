using CareHub.Domain.Dtos.Reporting.Tabs;
using System;
using System.Collections.Generic;

namespace CareHub.Domain.Dtos.Reporting
{
    public class Report
    {
        public string ReportType { get; set; }

        public List<ReportTab> ProblemGraphs { get; set; }
    }

    public class ReportPoint
    {
        public DateTime X { get; set; }
        public int Y { get; set; }
    }
}
