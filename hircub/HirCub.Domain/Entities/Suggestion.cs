using System.Collections.Generic;
using CareHub.Domain.Enums;

namespace CareHub.Domain.Entities
{
    public class Suggestion
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public SuggestionType Type { get; set; }

        public List<UsersSuggestion> UsersSuggestions { get; set; }
    }
}
