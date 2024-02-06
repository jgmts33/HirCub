using System;

namespace CareHub.Domain.Dtos.Reporting
{
    public class AnswerDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime DateTime { get; set; }
        public string QuestionId { get; set; }
        public string AnswerId { get; set; }
    }
}
