using CareHub.Domain.Enums;

namespace CareHub.Domain.Entities
{
    public class ProfileQuestionsCaregiver
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public Age? Age { get; set; }
        public Gender? Gender { get; set; }
        public string GenderOther { get; set; }
        public bool? HaveExperienceProvidingCare { get; set; }
        public int? ExperienceLength { get; set; }
        public int? CaregivingFrequency { get; set; }
        public int? CaregivingAmountOfTime { get; set; }
        public bool? HaveChildrenOrOthersWhomAlsoCaring { get; set; }
        public int? Responsibilities { get; set; }
        public int? CaringFor { get; set; }
        public string NotesAboutCaregiving { get; set; }

        public ApplicationUser User { get; set; }
    }
}
