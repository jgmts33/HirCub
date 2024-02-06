using CareHub.API.Auth;
using CareHub.API.Models;
using CareHub.API.Utils;
using CareHub.Domain.Dtos;
using CareHub.Domain.Dtos.Reporting;
using CareHub.Domain.Dtos.Reporting.Tabs;
using CareHub.Domain.Entities;
using CareHub.Domain.Enums;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReportsController : ControllerBase
    {
        #region Internals
        private readonly IReportProvider _reportProvider;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJournalEntryProvider _journalEntryProvider;
        private readonly IFinanceRecordProvider _financeRecordProvider;
        private readonly ICalendarProvider _calendarProvider;
        private readonly IHealthTrackerProvider _healthTrackerProvider;
        private readonly IQuestionProvider _questionProvider;

        public ReportsController(
            IReportProvider reportProvider,
            UserManager<ApplicationUser> userManager,
            IJournalEntryProvider journalEntryProvider,
            IFinanceRecordProvider financeRecordProvider,
            ICalendarProvider calendarProvider,
            IHealthTrackerProvider healthTrackerProvider,
            IQuestionProvider questionProvider
        )
        {
            _reportProvider = reportProvider;
            _userManager = userManager;
            _journalEntryProvider = journalEntryProvider;
            _financeRecordProvider = financeRecordProvider;
            _calendarProvider = calendarProvider;
            _healthTrackerProvider = healthTrackerProvider;
            _questionProvider = questionProvider;
        }
        #endregion

        [HttpGet("GetReport")]
        [Roles(CustomRoles.Administrator, CustomRoles.HealthReportsRead, CustomRoles.HealthReportsWrite)]
        public BaseJsonResponse<Report> GetReport([FromQuery] ReportParameters reportParameters)
        {
            var userId = User.GetId();
            var report = _reportProvider.BuildReport(userId, reportParameters);
            return new BaseJsonResponse<Report>(report);
        }

        [HttpGet("GetGraph")]
        [Roles(CustomRoles.Administrator, CustomRoles.HealthReportsRead, CustomRoles.HealthReportsWrite)]
        public BaseJsonResponse<ReportTab> GetGraph([FromQuery] ReportParameters reportParameters)
        {
            var userId = User.GetId();
            var report = _reportProvider.BuildGraph(userId, reportParameters);
            return new BaseJsonResponse<ReportTab>(report);
        }

        [HttpGet("GenerateSampleData")]
        [Roles(CustomRoles.Administrator, CustomRoles.HealthReportsRead, CustomRoles.HealthReportsWrite)]
        public async Task<BaseJsonResponse> GenerateSampleData(DateTime? dtFrom, DateTime? dtTo, int count = 100, bool eraseOld = false, string userEmail = null)
        {
            #region Presets
            #region Concerns
            var concernsRef = new string[] { "emotional", "practical", "information", "spiritual", "socialFamily", "physical" };
            var maxConcernValues = new Dictionary<int, int>
            {
                [1] = 5,
                [2] = 4,
                [3] = 4,
                [4] = 2,
                [5] = 3,
                [6] = 3
            };
            #endregion

            var problemTypesRef = new string[] { "tiredness", "drowsiness", "nausea", "lackOfAppetite", "shortnessOfBreath", "depression", "anxiety", "wellBeing" };

            var caregiverAnswerVariants = new string[] { "always", "sometimes", "rarely", "never", "null" };

            var caregiverNeeds = new string[] { "bathing", "dressing", "transferring", "eating", "toileting", "continence", "feeding" };
            #endregion

            if (dtTo == null) dtTo = DateTime.Now;
            if (dtFrom == null) dtFrom = dtTo.Value.AddMonths(-3);

            string userId;
            if (string.IsNullOrEmpty(userEmail))
            {
                userId = User.GetOriginalId();
            }
            else
            {
                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null)
                {
                    return new BaseJsonResponse(false, $"User with email {userEmail} was not found.");
                }
                userId = user.Id;
            }

            #region Erase Previous if needed
            if (eraseOld)
            {
                // Could not be deleted. (because there is no API for doing that):
                // 
                // 1. Finance Categories
                // 
                // 2. Health Tracker entities (pain, concerns, etc.)                

                // TODO: What is "note"?
                #region Note
                #endregion

                #region Journal
                var prevJournalEntries = _journalEntryProvider.GetAllJournalEntries(userId);
                foreach (var je in prevJournalEntries)
                {
                    _journalEntryProvider.DeleteJournalEntry(userId, je.Id);
                }
                #endregion

                #region Expense (Finance Records)
                var finRecords = await _financeRecordProvider.GetAllAsync(userId);
                foreach (var fr in finRecords)
                {
                    await _financeRecordProvider.DeleteAsync(userId, fr.Id);
                }

                // TODO: Here we cannot delete finance record events because calendar provider has no API to delete events
                #endregion

                #region Health Tracker
                // Could not be deleted - no API
                #endregion

                #region Caregiver Welcome Questions
                await _questionProvider.DeleteAllWelcomeQuestionsAsync(userId);
                #endregion

                #region Caregiver Needs Tool Questions
                await _questionProvider.DeleteAllCareNeedsAnswersAsync(userId);
                #endregion

                // TODO: What else?
            }
            #endregion

            var totalDays = (int)Math.Round((dtTo.Value - dtFrom.Value).TotalDays);
            var rnd = new Random();
            for (var i = 0; i < count; i++)
            {
                var day = rnd.Next(0, totalDays);
                var date = dtFrom.Value.AddDays(day).AddHours(rnd.Next(24)).AddMinutes(rnd.Next(60));
                date = DateTime.SpecifyKind(date, DateTimeKind.Utc);

                // TODO: add all possible data points for that date - note, journal, expense, health trakcer etc - 

                // TODO: What is "note"?
                #region Note
                #endregion

                #region Journal
                _journalEntryProvider.Create(
                    new JournalEntryDto
                    {
                        UserId = userId,
                        Description = $"Test Journal Entry Description of user {userEmail ?? userId} at {date}",
                        Title = $"{userEmail ?? userId} at {date}"
                    },
                    date
                );
                #endregion

                #region Expense (Finance Records)
                var someInt = rnd.Next(count + 1);

                var ev = _calendarProvider.Create(
                    new EventDto
                    {
                        UserId = userId,
                        FullDay = rnd.Bool(),
                        Start = date,
                        End = date.AddMinutes(60),
                        Description = $"Test event {someInt}"
                    },
                    userId
                );

                await _financeRecordProvider.CreateAsync(new FinanceRecordDto
                {
                    Date = date,
                    Amount = someInt,
                    Location = $"Test location {someInt}",
                    UserId = userId,
                    Categories = new List<FinanceCategoryDto>
                    {
                        new FinanceCategoryDto { Value = $"Finance Category {someInt}" },
                        new FinanceCategoryDto { Value = $"Finance Category {someInt}+" }
                    },
                    EventId = ev.Id
                });
                #endregion

                #region Health Tracker

                var period = rnd.Enum<Period>();

                // TODO: Add Notifications

                #region Concerns

                var concerns = concernsRef
                    .Select((c, i) => new
                    {
                        Name = c,
                        MaxValue = maxConcernValues[i + 1]
                    })
                    .Where(_ => rnd.Probable(probability: 0.25))
                    .Select(item => new
                    {
                        item.Name,
                        Values = Enumerable
                            .Range(1, item.MaxValue)
                            .Where(_ => rnd.Probable(probability: 1.0 / item.MaxValue * 1.5))
                            .ToList()
                    })
                    .Where(item => item.Values.Count != 0)
                    .ToDictionary(item => item.Name, item => item.Values);

                if (concerns.Count != 0)
                {
                    var healthStatePostModel = new HealthStatePostModel { Period = period, Concerns = concerns };
                    var healthStateTransport = AutoMapperHelper.Mapper.Map<HealthStateTransport>(healthStatePostModel);
                    _healthTrackerProvider.SubmitConcerns(userId, healthStateTransport, date);
                }

                #endregion

                #region Questions
                var happiness = rnd.Next(6);
                var content = rnd.Next(6);
                var additionalDetails = rnd.Bool() ? "Here are some additional details" : null;
                if (happiness != 0 || content != 0 || additionalDetails != null)
                {
                    var healthStatePostModel = new HealthStatePostModel
                    {
                        Period = period,
                        Happiness = happiness != 0 ? (int?)happiness : null,
                        Content = content != 0 ? (int?)content : null,
                        AdditionalDetails = additionalDetails
                    };
                    var healthStateTransport = AutoMapperHelper.Mapper.Map<HealthStateTransport>(healthStatePostModel);
                    _healthTrackerProvider.SubmitQuestions(userId, healthStateTransport, date);
                }
                #endregion

                #region Health

                var painProblem = rnd.Bool() ? new PainProblemPostModel
                {
                    Date = date,
                    Time = date,
                    PainType = rnd.Enum<PainType>(),
                    IsFront = rnd.Bool(),
                    BodyPart = rnd.Next(2), // range - ?
                    Intensity = rnd.Next(2), // range - ?
                    Concern = rnd.Next(2) // range - ?
                } : null;

                var problems = problemTypesRef
                    .Select((_, i) => i + 1)
                    .Where(_ => rnd.Probable(probability: 0.15))
                    .Select(id => new ProblemPostModel
                    {
                        Date = date,
                        Time = date,
                        ProblemTypeId = id,
                        Intensity = rnd.Next(2), // range - ?
                        Concern = rnd.Next(2) // range - ?
                    })
                    .ToList();

                if (painProblem != null || problems.Count != 0)
                {
                    var healthStatePostModel = new HealthStatePostModel { Period = period, PainProblem = painProblem, Problems = problems };
                    var healthStateTransport = AutoMapperHelper.Mapper.Map<HealthStateTransport>(healthStatePostModel);
                    _healthTrackerProvider.SubmitHealth(userId, healthStateTransport, date);
                }

                #endregion

                #endregion

                #region Caregiver Welcome Questions
                await _questionProvider.SubmitAnswersAsync(
                    userId,
                    new List<AnswerDto>
                    {
                        new AnswerDto { QuestionId = "feltLike", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "wasCranky", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "wasDifficult", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "wasSatisfied", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "feltUseful", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "feltThat", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "hadDifficulty", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "hadTroubleFocusing", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "foundWays", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "feltOverwhelmed", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "feltLonely", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "wasUpset", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "hadTroubleSleeping", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "feltDepressed", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "feltAnxious", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "feltIll", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] },
                        new AnswerDto { QuestionId = "homeSituation", AnswerId = caregiverAnswerVariants[rnd.Next(caregiverAnswerVariants.Length)] }
                    },
                    date
                );
                #endregion

                #region Caregiver Needs Tool Questions
                await _questionProvider.SubmitCareNeedsAnswersAsync(
                    userId,
                    caregiverNeeds
                        .Select(key => new CareNeedsDto
                        {
                            Name = key,
                            Value = rnd.Next(3)
                        })
                        .ToList(),
                    date
                );
                #endregion

                // TODO: What else?
            }

            return new BaseJsonResponse(true);
        }

        [HttpGet("questions")]
        [Roles(CustomRoles.Administrator, CustomRoles.Caregiver)]
        public async Task<BaseJsonResponse<List<AnswerViewModel>>> GetAnswersReport([FromQuery] ReportParameters reportParameters)
        {
            var userId = User.GetId();

            var answers = await _reportProvider.GetAnswersAsync(userId, reportParameters.DateFrom, reportParameters.DateTo);

            return new BaseJsonResponse<List<AnswerViewModel>>(AutoMapperHelper.Mapper.Map<List<AnswerViewModel>>(answers));
        }

        [HttpGet("care-needs")]
        [Roles(CustomRoles.Administrator, CustomRoles.Caregiver)]
        public async Task<BaseJsonResponse<List<CareNeedViewModel>>> GetCareNeedsReport([FromQuery] ReportParameters reportParameters)
        {
            var userId = User.GetId();

            var careNeeds = await _reportProvider.GetCareNeedsAnswersAsync(userId, reportParameters.DateFrom, reportParameters.DateTo);

            var report = new List<CareNeedViewModel>();
            foreach (var cn in careNeeds)
            {
                var reportRow = new CareNeedViewModel
                {
                    Date = cn.Date,
                    Report = new CareNeedReportViewModel
                    {
                        Bathing         = cn.Needs.FirstOrDefault(n => n.Name.Equals(nameof(CareNeedReportViewModel.Bathing), StringComparison.InvariantCultureIgnoreCase))?.Value,
                        Dressing        = cn.Needs.FirstOrDefault(n => n.Name.Equals(nameof(CareNeedReportViewModel.Dressing), StringComparison.InvariantCultureIgnoreCase))?.Value,
                        Transferring    = cn.Needs.FirstOrDefault(n => n.Name.Equals(nameof(CareNeedReportViewModel.Transferring), StringComparison.InvariantCultureIgnoreCase))?.Value,
                        Eating          = cn.Needs.FirstOrDefault(n => n.Name.Equals(nameof(CareNeedReportViewModel.Eating), StringComparison.InvariantCultureIgnoreCase))?.Value,
                        Toileting       = cn.Needs.FirstOrDefault(n => n.Name.Equals(nameof(CareNeedReportViewModel.Toileting), StringComparison.InvariantCultureIgnoreCase))?.Value,
                        Continence      = cn.Needs.FirstOrDefault(n => n.Name.Equals(nameof(CareNeedReportViewModel.Continence), StringComparison.InvariantCultureIgnoreCase))?.Value,
                        Feeding         = cn.Needs.FirstOrDefault(n => n.Name.Equals(nameof(CareNeedReportViewModel.Feeding), StringComparison.InvariantCultureIgnoreCase))?.Value
                    }
                };
                report.Add(reportRow);
            }

            return new BaseJsonResponse<List<CareNeedViewModel>>(report);
        }

        [HttpPost("care-needs")]
        [Roles(CustomRoles.Administrator, CustomRoles.Caregiver)]
        public async Task<BaseJsonResponse> PostCareNeedsTool([FromBody] CareNeedViewModel model)
        {
            if (!ModelState.IsValid)
                return new BaseJsonResponse(false, ModelState.Errors());

            var userId = User.GetId();

            var dto = new List<CareNeedsDto>();
            if (model.Report.Bathing.HasValue) dto.Add(new CareNeedsDto { Name = nameof(CareNeedReportViewModel.Bathing).ToLowerInvariant(), Value = model.Report.Bathing.Value });
            if (model.Report.Dressing.HasValue) dto.Add(new CareNeedsDto { Name = nameof(CareNeedReportViewModel.Dressing).ToLowerInvariant(), Value = model.Report.Dressing.Value });
            if (model.Report.Transferring.HasValue) dto.Add(new CareNeedsDto { Name = nameof(CareNeedReportViewModel.Transferring).ToLowerInvariant(), Value = model.Report.Transferring.Value });
            if (model.Report.Eating.HasValue) dto.Add(new CareNeedsDto { Name = nameof(CareNeedReportViewModel.Eating).ToLowerInvariant(), Value = model.Report.Eating.Value });
            if (model.Report.Toileting.HasValue) dto.Add(new CareNeedsDto { Name = nameof(CareNeedReportViewModel.Toileting).ToLowerInvariant(), Value = model.Report.Toileting.Value });
            if (model.Report.Continence.HasValue) dto.Add(new CareNeedsDto { Name = nameof(CareNeedReportViewModel.Continence).ToLowerInvariant(), Value = model.Report.Continence.Value });
            if (model.Report.Feeding.HasValue) dto.Add(new CareNeedsDto { Name = nameof(CareNeedReportViewModel.Feeding).ToLowerInvariant(), Value = model.Report.Feeding.Value });

            await _questionProvider.SubmitCareNeedsAnswersAsync(userId, dto, dateTime: model.Date ?? null);

            return new BaseJsonResponse();
        }
    }
}
