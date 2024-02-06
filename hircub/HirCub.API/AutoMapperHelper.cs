using System;
using System.Linq;
using AutoMapper;
using CareHub.API.Models;
using CareHub.Domain.Dtos;
using CareHub.Domain.Dtos.Reporting;
using CareHub.Domain.Entities;

namespace CareHub.API
{
    public static class AutoMapperHelper
    {
        private static readonly object _lock = new object();
        public static IMapper Mapper { get; }

        private static Func<DateTime, DateTime, DateTime> MergeToLocalDateTime = (DateTime date, DateTime time) =>
        {
            var easternZoneId = "Eastern Standard Time";
            var easternZone = TimeZoneInfo.FindSystemTimeZoneById(easternZoneId);
            // TODO: Here is something suspicious: if we convert "time" param, but not convert "date" param, then probably
            // we could get a situation (especially near the border of the day) when date will be from one day and time -
            // from the another?
            var localTime = TimeZoneInfo.ConvertTimeFromUtc(time, easternZone);
            

            return new DateTime(date.Year, date.Month, date.Day, localTime.Hour,
                    localTime.Minute, 0);
        };

        static AutoMapperHelper()
        {
            if (Mapper == null)
            {
                lock (_lock)
                {
                    if (Mapper == null)
                    {
                        Mapper = new MapperConfiguration(cfg =>
                            {
                                cfg.CreateMap<QuestionPostModel, QuestionDto>();
                                cfg.CreateMap<QuestionDto, QuestionViewModel>();
                                cfg.CreateMap<UsersSuggestionDto, UserSuggestionViewModel>()
                                    .ForMember(d => d.SuggestionId, s => s.MapFrom(sg => sg.Suggestion.Id))
                                    .ForMember(d => d.Title, s => s.MapFrom(sg => sg.Suggestion.Title))
                                    .ForMember(d => d.Link, s => s.MapFrom(sg => sg.Suggestion.Link))
                                    .ForMember(d => d.Type, s => s.MapFrom(sg => sg.Suggestion.Type));
                                cfg.CreateMap<PainProblemPostModel, PainProblemTransport>()
                                    .ForMember(d => d.DateTracked, s => s.MapFrom(p =>
                                        MergeToLocalDateTime(p.Date, p.Time)));
                                cfg.CreateMap<ProblemPostModel, ProblemTransport>()
                                    .ForMember(d => d.DateTracked, s => s.MapFrom(p =>
                                        MergeToLocalDateTime(p.Date, p.Time)));
                                cfg.CreateMap<HealthStatePostModel, HealthStateTransport>()
                                    .ForMember(d => d.TrackedConcerns, s => s.MapFrom(hs => hs.Concerns));
                                cfg.CreateMap<EventPostModel, EventDto>()
                                    .ForMember(d => d.Start, s => s.MapFrom(p => MergeToLocalDateTime(p.StartDate, p.StartTime)))
                                    .ForMember(d => d.End, s => s.MapFrom(p => MergeToLocalDateTime(p.EndDate, p.EndTime)));
                                cfg.CreateMap<EventDto, EventPostModel>()
                                    .ForMember(d => d.StartDate, s => s.MapFrom(p => p.Start))
                                    .ForMember(d => d.StartTime, s => s.MapFrom(p => p.Start))
                                    .ForMember(d => d.EndDate, s => s.MapFrom(p => p.End))
                                    .ForMember(d => d.EndTime, s => s.MapFrom(p => p.End));

                                #region JournalEntry
                                cfg.CreateMap<JournalEntryPostModel, JournalEntryDto>()
                                    .ForMember(d => d.Tags,
                                        s => s.MapFrom(sg => sg.Tags.Where(x => !string.IsNullOrWhiteSpace(x)).Select(x => x.Trim()).Distinct().Select(x => new TagDto { Value = x }).ToList()));
                                cfg.CreateMap<JournalEntryDto, JournalEntryPostModel>()
                                    .ForMember(d => d.Tags, s => s.MapFrom(sg => sg.Tags.Select(x => x.Value)));
                                
                                cfg.CreateMap<TagDto,Tag>();
                                #endregion

                                #region FinanceRecord
                                cfg.CreateMap<FinanceRecordPostModel, FinanceRecordDto>()
                                    .ForMember(d => d.Categories,
                                        s => s.MapFrom(sg => sg.Categories.Where(x => !string.IsNullOrWhiteSpace(x)).Select(x => x.Trim()).Distinct().Select(x => new FinanceCategoryDto { Value = x }).ToList()));
                                cfg.CreateMap<FinanceRecordDto, FinanceRecordPostModel>()
                                    .ForMember(d => d.Categories, s => s.MapFrom(sg => sg.Categories.Select(x => x.Value)));

                                cfg.CreateMap<FinanceCategoryDto, FinanceCategory>();
                                #endregion

                                cfg.CreateMap<MedicationPostModel,MedicationDto>();
                                cfg.CreateMap<MedicationDto,MedicationPostModel>();

                                cfg.CreateMap<PatientQuestionsViewModel, PatientQuestionsDto>().ReverseMap();
                                cfg.CreateMap<CaregiverQuestionsViewModel, CaregiverQuestionsDto>().ReverseMap();
                                cfg.CreateMap<CommonQuestionsViewModel, CommonQuestionsDto>().ReverseMap();

                                cfg.CreateMap<ReminderViewModel, ReminderDto>().ReverseMap();
                                cfg.CreateMap<AnswerViewModel, AnswerDto>().ReverseMap();
                            })
                            .CreateMapper();
                    }
                }
            }
        }
    }
}
