using CareHub.Domain.Enums;

namespace CareHub.Domain.Dtos
{
    public class ProfileDto
    {
        public string UserId { get; set; }
        public string NickName { get; set; }
        public string PostalCode { get; set; }
        public string Email { get; set; }
        public AccountType AccountType { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ProfileColor { get; set; }
        public int BackgroundImageCode { get; set; }
    }

    public abstract class QuestionsDto { }

    public class PatientQuestionsDto : QuestionsDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public Age? Age { get; set; }
        public Gender? Gender { get; set; }
        public string GenderOther { get; set; }
        public string MainHealthIssue { get; set; }
        public int? LivingWithMainHealthIssue { get; set; }
        public string NotesForCaregiver { get; set; }
    }

    public class CaregiverQuestionsDto : QuestionsDto
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
    }

    public class CommonQuestionsDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public bool? InterestedInInclusiveness { get; set; }
        public bool? InterestedSupporingChildren { get; set; }
        public bool? InterestedAboutIndigenousPeople { get; set; }
        public bool? InterestedAboutGrieving { get; set; }
    }

    public class AccountDto
    {
        public ProfileDto Profile { get; set; }
        public QuestionsDto Questions { get; set; }
        public CommonQuestionsDto CommonQuestions { get; set; }
    }
}
