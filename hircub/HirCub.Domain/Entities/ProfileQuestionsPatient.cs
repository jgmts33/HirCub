using CareHub.Domain.Enums;

namespace CareHub.Domain.Entities
{
    public class ProfileQuestionsPatient
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Age? Age { get; set; }
        public Gender? Gender { get; set; }
        public string GenderOther { get; set; }
        public string MainHealthIssue { get; set; }
        public int? LivingWithMainHealthIssue { get; set; }
        public string NotesForCaregiver { get; set; }
    }
}
