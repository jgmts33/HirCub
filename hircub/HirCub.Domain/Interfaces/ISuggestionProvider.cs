using System.Collections.Generic;
using CareHub.Domain.Dtos;
using CareHub.Domain.Enums;

namespace CareHub.Domain.Interfaces
{
    public interface ISuggestionProvider
    {
        List<UsersSuggestionDto> Get(string userId);
        void Update(long usersSuggestionId, SuggestionStatus suggestionStatus);
        bool CheckAlreadyInLibrary(long suggestionId, string userId);
        UsersSuggestionDto AddToLibrary(long suggestionId, string userId);
        List<SuggestionDto> GetAllSuggestions();
    }
}
