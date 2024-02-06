using CareHub.Domain.Enums;

namespace CareHub.API.Models
{
    public class UserSuggestionViewModel
    {
        public long Id { get; set; }
        public long SuggestionId { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public SuggestionType Type { get; set; }
        public SuggestionStatus Status { get; set; }
    }

    public class UserSuggestionUpdateModel
    {
        public SuggestionStatus Status { get; set; }
    }

    public class AddMultipleSuggestionsPostModel
    {
        public int[] Ids { get; set; }
    }
}
