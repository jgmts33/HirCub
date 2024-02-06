using System.Linq;
using AutoMapper;
using CareHub.Domain.Dtos;
using CareHub.Domain.Dtos.Reporting;
using CareHub.Domain.Entities;

namespace CareHub.Domain
{
    public static class AutoMapperHelper
    {
        private static readonly object _lock = new object();
        public static IMapper Mapper { get; }
        static AutoMapperHelper()
        {
            if (Mapper == null)
            {
                lock (_lock)
                {
                    if (Mapper == null)
                    {
                        Mapper = new MapperConfiguration(cfg => {
                            cfg.CreateMap<Question, QuestionDto>().ReverseMap();
                            cfg.CreateMap<Suggestion, SuggestionDto>().ReverseMap();
                            cfg.CreateMap<UsersSuggestion, UsersSuggestionDto>().ReverseMap();
                            cfg.CreateMap<PainProblemTransport, PainProblem>();
                            cfg.CreateMap<ProblemTransport, Problem>();
                            cfg.CreateMap<HealthStateTransport, TrackedHealthState>()
                                .ForMember(d => d.TrackedConcerns, s => s.Ignore())
                                .ForMember(d => d.PainProblem,
                                    s => s.MapFrom(m => m.PainProblem.Intensity > 0 ? m.PainProblem : null))
                                .ForMember(d => d.Problems,
                                    s => s.MapFrom(m => m.Problems.Where(p => p.Intensity > 0)));
                            cfg.CreateMap<Event, EventDto>().ReverseMap();
                            cfg.CreateMap<IntakeManagerForm, IntakeManagerFormDto>().ReverseMap();
                            cfg.CreateMap<JournalEntry, JournalEntryDto>().ReverseMap();
                            cfg.CreateMap<Tag, TagDto>().ReverseMap();
                            cfg.CreateMap<MedicationEntity, MedicationDto>().ReverseMap();
                            cfg.CreateMap<FinanceRecord, FinanceRecordDto>().ReverseMap();
                            cfg.CreateMap<FinanceCategory, FinanceCategoryDto>().ReverseMap();
                            cfg.CreateMap<ProfileQuestionsPatient, PatientQuestionsDto>().ReverseMap();
                            cfg.CreateMap<ProfileQuestionsCaregiver, CaregiverQuestionsDto>().ReverseMap();
                            cfg.CreateMap<ProfileQuestionsCommon, CommonQuestionsDto>().ReverseMap();
                            cfg.CreateMap<Reminder, ReminderDto>().ReverseMap();
                            cfg.CreateMap<Answer, AnswerDto>().ReverseMap();
                            cfg.CreateMap<CareNeeds, CareNeedsDto>().ReverseMap();
                        })
                        .CreateMapper();
                    }
                }
            }
        }
    }
}
