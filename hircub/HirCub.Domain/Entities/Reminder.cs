using CareHub.Domain.Enums;

namespace CareHub.Domain.Entities
{
    public class Reminder
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ReminderReferenceId { get; set; }
        public ReminderState State { get; set; }
        public int Hours { get; set; }
        public int Minutes { get; set; }

        public ApplicationUser User { get; set; }
        public ReminderReference ReminderReference { get; set; }
    }
}
