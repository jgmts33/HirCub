using CareHub.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace CareHub.API.Models
{
    public class ReminderViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [Required]
        public int ReminderReferenceId { get; set; }
        [Required]
        public ReminderState State { get; set; }
        [Required]
        [Range(0, 23)]
        public int Hours { get; set; }
        [Required]
        [Range(0, 59)]
        public int Minutes { get; set; }
    }
}
