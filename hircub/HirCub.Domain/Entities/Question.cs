using System;

namespace CareHub.Domain.Entities
{
    public class Question
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }
        public DateTime DateCreated { get; set; }

        public ApplicationUser User { get; set; }
    }
}
