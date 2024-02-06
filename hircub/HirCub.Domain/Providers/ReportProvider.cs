using CareHub.Domain.Dtos;
using CareHub.Domain.Dtos.Reporting;
using CareHub.Domain.Dtos.Reporting.Tabs;
using CareHub.Domain.Entities;
using CareHub.Domain.Enums;
using CareHub.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CareHub.Domain.Providers
{
    public class ReportProvider : IReportProvider
    {
        #region Internals

        #region Custom tuples
        abstract class SomethingWithText
        {
            public string Text { get; }

            public SomethingWithText(string text) => Text = text;
        }

        class PainProblemWithText : SomethingWithText
        {
            public PainProblem PainProblem { get; }

            public PainProblemWithText(PainProblem painProblem, string text) : base(text) => PainProblem = painProblem;
        }

        class ProblemWithText : SomethingWithText
        {
            public Problem Problem { get; }

            public ProblemWithText(Problem problem, string text) : base(text) => Problem = problem;
        }
        #endregion

        private const int MaxTicks = 10;
        private readonly DomainDbContext _context;

        public ReportProvider(DomainDbContext context)
        {
            _context = context;
        }

        private ReportTab GetPainGraph(List<PainProblemWithText> painProblems, ReportPeriod reportPeriod)
        {
            if (painProblems.Count < 2)
            {
                return new ProblemTab
                {
                    NotEnoughData = true,
                    IsPain = true,
                    ProblemTypeName = "Pain"
                };
            }

            var concernRows = painProblems
                .OrderBy(x => x.PainProblem.DateTracked)
                .Select(x => new ConcernDetailRow(x.PainProblem.DateTracked, x.PainProblem.Concern, x.Text, x.PainProblem.PainType))
                // Remove duplicates
                .GroupBy(pp => new { pp.Date, pp.Concerned, pp.AdditionalDetails, pp.PainType })
                .Select(group => group.First())
                .ToList();

            painProblems.ForEach(x => x.PainProblem.DateTracked = x.PainProblem.DateTracked.Date);

            var reportPoints = painProblems
                .GroupBy(x => x.PainProblem.DateTracked)
                .Select(g => new
                {
                    Date = g.Key,
                    AverageIntensity = Math.Round((double)g.Sum(x => x.PainProblem.Intensity) / g.Count())
                })
                .OrderBy(rp => rp.Date)
                .Select(rp => new
                {
                    Date = reportPeriod == ReportPeriod.Monthly
                        ? new DateTime(rp.Date.Year, rp.Date.Month, 1)
                        : reportPeriod == ReportPeriod.Weekly
                            ? new DateTime(rp.Date.Year, rp.Date.Month, rp.Date.Day).AddDays(-(int)rp.Date.DayOfWeek)
                            : new DateTime(rp.Date.Year, rp.Date.Month, rp.Date.Day),
                    AverageIntensity = rp.AverageIntensity
                })
                .GroupBy(rp => rp.Date)
                .Select(g => new ReportPoint
                {
                    X = g.Key,
                    Y = (int)Math.Round(g.Sum(p => p.AverageIntensity) / g.Count())
                })
                .ToList();

            if (reportPoints.Count < 2)
            {
                return new ProblemTab
                {
                    NotEnoughData = true,
                    IsPain = true,
                    ProblemTypeName = "Pain"
                };
            }
            var firstPainProblem = painProblems.First().PainProblem;
            return new ProblemTab
            {
                Points = reportPoints,
                IsPain = true,
                IsFront = firstPainProblem.IsFront,
                BodyPart = firstPainProblem.BodyPart,
                ProblemTypeName = "Pain",
                XTickCount = Math.Min(reportPoints.Count, MaxTicks),
                Table = concernRows
            };

        }

        private List<ReportTab> GetProblemsGraphs(List<IGrouping<ProblemType, ProblemWithText>> problemGroups)
        {
            var problemReports = new List<ReportTab>();
            foreach (var group in problemGroups)
            {
                var problems = group.ToList();
                var problemGraph = GetProblemGraph(problems, group.Key.Id, group.Key.DisplayName, ReportPeriod.Daily);
                if (problemGraph != null)
                {
                    problemReports.Add(problemGraph);
                }
            }

            return problemReports;
        }

        // If there is not enough data for monthly view, it still might be enough to show weekly report.
        bool CheckShouldShow(IEnumerable<Problem> problems)
        {
            var reportPoints = problems
                .GroupBy(pp => pp.DateTracked)
                .Select(g => new
                {
                    Date = g.Key,
                    AverageIntensity = Math.Round((double)g.Sum(p => p.Intensity) / g.Count())
                })
                .OrderBy(pp => pp.Date)
                .Select(rp => new
                {
                    Date = new DateTime(rp.Date.Year, rp.Date.Month, rp.Date.Day).AddDays(-(int)rp.Date.DayOfWeek),
                    AverageIntensity = rp.AverageIntensity
                })
                .GroupBy(rp => rp.Date)
                .Select(g => new ReportPoint
                {
                    X = g.Key,
                    Y = (int)Math.Round(g.Sum(p => p.AverageIntensity) / g.Count())
                })
                .ToList();
            if (reportPoints.Count < 2 || reportPoints.All(rp => rp.Y == 0))
            {
                return false;
            }

            return true;
        }

        ProblemTab GetProblemGraph(List<ProblemWithText> problems, int problemTypeId, string problemTypeName, ReportPeriod reportPeriod)
        {
            if (problems.Count < 2)
            {
                return null;
            }

            var concernRows = problems
                .OrderBy(x => x.Problem.DateTracked)
                .Select(x => new ConcernDetailRow(x.Problem.DateTracked, x.Problem.Concern, x.Text))
                // Remove duplicates
                .GroupBy(pp => new { pp.Date, pp.Concerned, pp.AdditionalDetails })
                .Select(group => group.First())
                .ToList();

            problems.ForEach(x => x.Problem.DateTracked = x.Problem.DateTracked.Date);
            if (!CheckShouldShow(problems.Select(x => x.Problem)))
            {
                return null;
            }
            var reportPoints = problems
                .GroupBy(x => x.Problem.DateTracked)
                .Select(g => new
                {
                    Date = g.Key,
                    AverageIntensity = Math.Round((double)g.Sum(x => x.Problem.Intensity) / g.Count())
                })
                .OrderBy(pp => pp.Date)
                .Select(rp => new
                {
                    Date = reportPeriod == ReportPeriod.Monthly
                        ? new DateTime(rp.Date.Year, rp.Date.Month, 1)
                        : reportPeriod == ReportPeriod.Weekly
                            ? new DateTime(rp.Date.Year, rp.Date.Month, rp.Date.Day).AddDays(-(int)rp.Date.DayOfWeek)
                            : new DateTime(rp.Date.Year, rp.Date.Month, rp.Date.Day),
                    AverageIntensity = rp.AverageIntensity
                })
                .GroupBy(rp => rp.Date)
                .Select(g => new ReportPoint
                {
                    X = g.Key,
                    Y = (int)Math.Round(g.Sum(p => p.AverageIntensity) / g.Count())
                })
                .ToList();

            if (reportPoints.Count < 2)
            {
                return new ProblemTab
                {
                    NotEnoughData = true,
                    ProblemTypeId = problemTypeId,
                    ProblemTypeName = problemTypeName
                };
            }

            var problemGraph = new ProblemTab
            {
                Points = reportPoints,
                ProblemTypeId = problemTypeId,
                ProblemTypeName = problemTypeName,
                XTickCount = Math.Min(reportPoints.Count, MaxTicks),
                Table = concernRows
            };

            return problemGraph;
        }

        Report BuildConcernsReport(List<TrackedHealthState> records)
        {
            var tabAxes = _context.ConcernValues.ToList();

            var tabs = _context
                .Concerns
                .ToList()
                .Select(concern => new
                {
                    ConcernId = concern.Id,
                    InternalName = concern.InternalName,
                    DisplayName = concern.DisplayName,
                    Axes = tabAxes
                        .Where(axis => axis.ConcernId == concern.Id)
                        .Select(axis => new
                        {
                            ConcernValueId = axis.Id,
                            Name = axis.Name,
                            Value = axis.Value
                        })
                        .OrderBy(axis => axis.ConcernValueId)
                        .ToList()
                })
                .OrderBy(concern => concern.ConcernId)
                .ToList();

            var recordsInTabs = records
                .SelectMany(rec => rec.TrackedConcerns, (rec, tc) => new
                {
                    rec.DateCreated,
                    tc
                })
                .GroupBy(rec => rec.tc.ConcernId)
                .ToList();

            var filledTabs = new List<ReportTab>();
            foreach (var tab in tabs)
            {
                var axis = _context
                    .ConcernValues
                    .Where(cv => cv.ConcernId == tab.ConcernId)
                    .OrderBy(cv => cv.Value)
                    .ToList();

                var recordsPerConcernValue = recordsInTabs
                    .Where(rt => rt.Key == tab.ConcernId)
                    .SelectMany(rt => rt)
                    .GroupBy(rpc => rpc.tc.ConcernValue)
                    .ToList();

                var filledTab = new ConcernTab
                {
                    InternalName = tab.InternalName,
                    DisplayName = tab.DisplayName,
                    ConcernValues = axis
                        .Select(y => new Dtos.Reporting.ConcernValue
                        {
                            Name = y.Name,
                            Value = y.Value,
                            Points = recordsPerConcernValue
                                .Where(group => group.Key == y.Value)
                                .SelectMany(group => group, (_, record) => record.DateCreated)
                                .OrderBy(date => date)
                                .ToList()
                        })
                        .ToList()
                };

                filledTabs.Add(filledTab);
            }

            return new Report { ReportType = ReportType.Concerns.ToString(), ProblemGraphs = filledTabs };
        }

        Report BuildHappinessReport(List<TrackedHealthState> records)
        {
            var report = new Report
            {
                ReportType = ReportType.Happiness.ToString(),
                ProblemGraphs = new List<ReportTab>
                {
                    new ProblemTab
                    {
                        Points = records
                            .Select(rec => new ReportPoint
                            {
                                X = rec.DateCreated,
                                Y = rec.Happiness.Value
                            })
                            .ToList()
                    }
                }
            };

            return report;
        }
        #endregion

        public Report BuildReport(string userId, ReportParameters reportParameters)
        {
            if (reportParameters?.IsConcern ?? false)
            {
                var concernsQuery = _context.TrackedHealthStates
                    .Include(ths => ths.TrackedConcerns)
                    .ThenInclude(tc => tc.Concern)
                    .Where(ths => ths.UserId == userId);

                if (reportParameters.DateFrom.HasValue)
                    concernsQuery = concernsQuery.Where(ths => ths.DateCreated >= reportParameters.DateFrom.Value);
                if (reportParameters.DateTo.HasValue)
                    concernsQuery = concernsQuery.Where(ths => ths.DateCreated < reportParameters.DateTo.Value.AddDays(1));

                concernsQuery
                    .OrderBy(ths => ths.Happiness.Value)
                    .ThenBy(ths => ths.DateCreated);

                var records = concernsQuery.ToList();
                var concernsReport = BuildConcernsReport(records);
                return concernsReport;
            }

            else if (reportParameters?.IsHappiness ?? false)
            {
                var happinessQuery = _context.TrackedHealthStates
                    .Where(ths => ths.UserId == userId)
                    .Where(ths => ths.Happiness.HasValue);
                if (reportParameters.DateFrom.HasValue)
                    happinessQuery = happinessQuery.Where(ths => ths.DateCreated >= reportParameters.DateFrom.Value);
                if (reportParameters.DateTo.HasValue)
                    happinessQuery = happinessQuery.Where(ths => ths.DateCreated < reportParameters.DateTo.Value.AddDays(1));

                var records = happinessQuery.ToList();
                var happinessReport = BuildHappinessReport(records);
                return happinessReport;
            }

            var painProblems = _context.TrackedHealthStates
                .Where(ths => ths.UserId == userId)
                .Select(ths => new { ths.PainProblem, ths.AdditionalDetails })
                .Where(x =>
                    x.PainProblem.DateTracked != null && x.PainProblem.DateTracked.Year > 2018 && x.PainProblem.BodyPart == 1 &&
                    x.PainProblem.IsFront)
                .ToList()
                .Select(x => new PainProblemWithText(x.PainProblem, x.AdditionalDetails))
                .ToList();
            var painGraph = GetPainGraph(painProblems, ReportPeriod.Daily);

            var problemsGroups = _context.TrackedHealthStates
                .Include(ths => ths.Problems)
                .ThenInclude(p => p.ProblemType)
                .Where(ths => ths.UserId == userId)
                .SelectMany(ths => ths.Problems, (ths, p) => new { ths.AdditionalDetails, Problem = p })
                .Where(x => x.Problem.DateTracked != null && x.Problem.DateTracked.Year > 2018)
                .ToList()
                .Select(x => new ProblemWithText(x.Problem, x.AdditionalDetails))
                .GroupBy(x => x.Problem.ProblemType)
                .ToList();
            var problemGraphs = GetProblemsGraphs(problemsGroups);

            var graphs = new List<ReportTab>();
            graphs.Add(painGraph);
            graphs.AddRange(problemGraphs);

            var report = new Report
            {
                ProblemGraphs = graphs,
            };

            return report;
        }

        public ReportTab BuildGraph(string userId, ReportParameters reportParameters)
        {
            if (reportParameters.IsPain)
            {
                var painProblemsQuery = _context.TrackedHealthStates
                    .Where(ths => ths.UserId == userId)
                    .Select(ths => new { ths.PainProblem, ths.AdditionalDetails })
                    .Where(x =>
                        x.PainProblem.DateTracked != null && x.PainProblem.DateTracked.Year > 2010 &&
                        x.PainProblem.BodyPart == reportParameters.BodyPart &&
                        x.PainProblem.IsFront == reportParameters.IsFront);
                if (reportParameters.DateFrom.HasValue)
                {
                    painProblemsQuery = painProblemsQuery.Where(x => x.PainProblem.DateTracked >= reportParameters.DateFrom.Value);
                }
                if (reportParameters.DateTo.HasValue)
                {
                    painProblemsQuery = painProblemsQuery.Where(x => x.PainProblem.DateTracked <= reportParameters.DateTo.Value);
                }

                var painProblems = painProblemsQuery
                    .ToList()
                    .Select(x => new PainProblemWithText(x.PainProblem, x.AdditionalDetails))
                    .ToList();
                var painGraph = GetPainGraph(painProblems, reportParameters.ReportPeriod);
                return painGraph;
            }

            var problemsQuery = _context.TrackedHealthStates
                .Where(ths => ths.UserId == userId)
                .SelectMany(ths => ths.Problems, (ths, p) => new { ths.AdditionalDetails, Problem = p })
                .Where(x =>
                    x.Problem.DateTracked != null && x.Problem.DateTracked.Year > 2010 &&
                    x.Problem.ProblemTypeId == reportParameters.ProblemTypeId);

            if (reportParameters.DateFrom.HasValue)
            {
                problemsQuery = problemsQuery.Where(x => x.Problem.DateTracked >= reportParameters.DateFrom.Value);
            }
            if (reportParameters.DateTo.HasValue)
            {
                problemsQuery = problemsQuery.Where(x => x.Problem.DateTracked <= reportParameters.DateTo.Value);
            }

            var problems = problemsQuery
                .ToList()
                .Select(x => new ProblemWithText(x.Problem, x.AdditionalDetails))
                .ToList();

            var problemTypeName =
                _context.ProblemTypes.Single(pt => pt.Id == reportParameters.ProblemTypeId).DisplayName;
            var problemGraph = GetProblemGraph(problems, reportParameters.ProblemTypeId, problemTypeName, reportParameters.ReportPeriod);
            return problemGraph;
        }

        public async Task<List<AnswerDto>> GetAnswersAsync(string userId, DateTime? dateFrom, DateTime? dateTo, CancellationToken cancellationToken = default)
        {
            var query = _context
                .Answers
                .Where(a => a.UserId == userId)
                .OrderBy(a => a.DateTime)
                .ThenBy(a => a.QuestionId);

            if (dateFrom.HasValue)
            {
                query.Where(a => a.DateTime >= dateFrom.Value.Date);
            }
            if (dateTo.HasValue)
            {
                var maxValue = dateTo.Value.Date.AddDays(1);
                query.Where(a => a.DateTime < maxValue);
            }

            var answersRecords = await query.ToListAsync(cancellationToken);

            // Re-group answers per date
            var answers = answersRecords
                .Select(a =>
                new
                {
                    a.DateTime,
                    Dto = new AnswerDto
                    {
                        UserId = userId,
                        QuestionId = a.QuestionId,
                        AnswerId = a.AnswerId,
                        DateTime = a.DateTime.Date, // Change DateTime to Date
                        Id = a.Id
                    }
                })
                .GroupBy(a => new { a.Dto.DateTime, a.Dto.QuestionId }) // Group by dates (here they are without a time part) and questions
                .Select(g => g
                    .OrderByDescending(a => a.DateTime) // Get the most recent answer for each question per day
                    .First()
                    .Dto
                )
                .OrderBy(a => a.DateTime)
                .ThenBy(a => a.QuestionId)
                .ToList();

            return answers;
        }

        public async Task<List<CareNeedsPerDayDto>> GetCareNeedsAnswersAsync(string userId, DateTime? dateFrom, DateTime? dateTo, CancellationToken cancellationToken = default)
        {
            #region Query
            var query = _context
                .CareNeeds
                .Where(c => c.UserId == userId)
                .OrderBy(c => c.DateTime)
                .ThenBy(c => c.Name);

            if (dateFrom.HasValue)
            {
                query.Where(a => a.DateTime >= dateFrom.Value.Date);
            }
            if (dateTo.HasValue)
            {
                var maxValue = dateTo.Value.Date.AddDays(1);
                query.Where(a => a.DateTime < maxValue);
            }

            var answersRecords = await query.ToListAsync(cancellationToken);
            #endregion

            #region Re-group answers per date in case there are more then 1 answer per any question daily
            var answers = answersRecords
                .Select(a =>
                new
                {
                    a.DateTime,
                    Dto = new CareNeedsDto
                    {
                        UserId = userId,
                        Name = a.Name,
                        Value = a.Value,
                        DateTime = a.DateTime.Date, // Change DateTime to Date
                        Id = a.Id
                    }
                })
                .GroupBy(a => new { a.Dto.DateTime, a.Dto.Name }) // Group by dates (here they are without a time part) and questions
                .Select(g => g
                    .OrderByDescending(a => a.DateTime) // Get the most recent answer for each question per day
                    .First()
                    .Dto
                );
            #endregion

            #region Calculate totals and build the result
            var answersPerDay = answers
                .GroupBy(a => a.DateTime);

            var result = answersPerDay
                .Select(apd => new CareNeedsPerDayDto
                {
                    Date = apd
                        .Key,
                    Needs = apd
                        .Select(a => new CareNeedsAnswerDto
                        {
                            Name = a.Name,
                            Value = a.Value
                        })
                        .ToList()
                })
                .OrderBy(day => day.Date)
                .ToList();

            foreach (var day in result)
            {
                day.Needs.Add(new CareNeedsAnswerDto
                {
                    Name = "total",
                    Value = day
                        .Needs
                        .Sum(n => n.Value)
                });
            }
            #endregion

            return result;
        }
    }
}
