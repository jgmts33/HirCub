using System;
using CareHub.Domain.Enums;

namespace CareHub.Domain.Entities
{
    public class UsersSuggestion
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public long SuggestionId { get; set; }
        public SuggestionStatus Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

        public ApplicationUser User { get; set; }
        public Suggestion Suggestion { get; set; }
    }
}
