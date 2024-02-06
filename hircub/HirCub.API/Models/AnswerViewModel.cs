using System;
using System.ComponentModel.DataAnnotations;

namespace CareHub.API.Models
{
    public class AnswerViewModel
    {
        public int? Id { get; set; }
        public string UserId { get; set; }
        public DateTime? DateTime { get; set; }
        [Required]
        public string QuestionId { get; set; }
        [Required]
        public string AnswerId { get; set; }
    }
}
