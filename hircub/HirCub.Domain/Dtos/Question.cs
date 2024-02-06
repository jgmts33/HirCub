using System;
using CareHub.Domain.Entities;

namespace CareHub.Domain.Dtos
{
    public class QuestionDto
    {
        public long Id { get; set; }
        public string Text { get; set; }
        public DateTime DateCreated { get; set; }

        public ApplicationUser User { get; set; }
    }
}
