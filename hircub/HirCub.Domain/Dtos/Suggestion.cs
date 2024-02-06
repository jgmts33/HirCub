using System;
using CareHub.Domain.Enums;

namespace CareHub.Domain.Dtos
{
    public class SuggestionDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public SuggestionType Type { get; set; }
    }

    public class UsersSuggestionDto
    {
        public long Id { get; set; }
        public SuggestionStatus Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

        public SuggestionDto Suggestion { get; set; }
    }
}
