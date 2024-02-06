using CareHub.Domain.Dtos.Reporting;
using CareHub.Domain.Dtos.Reporting.Tabs;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CareHub.Domain.Interfaces
{
    public interface IReportProvider
    {
        Report BuildReport(string userId, ReportParameters reportParameters);
        ReportTab BuildGraph(string userId, ReportParameters reportParameters);
        Task<List<AnswerDto>> GetAnswersAsync(string userId, DateTime? dateFrom, DateTime? dateTo, CancellationToken cancellationToken = default);
        Task<List<CareNeedsPerDayDto>> GetCareNeedsAnswersAsync(string userId, DateTime? dateFrom, DateTime? dateTo, CancellationToken cancellationToken = default);
    }
}
