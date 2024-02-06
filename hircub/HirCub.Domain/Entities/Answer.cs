using System;

namespace CareHub.Domain.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime DateTime { get; set; }
        public string QuestionId { get; set; }
        public string AnswerId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
