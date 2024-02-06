using CareHub.API.Auth;
using CareHub.API.Models;
using CareHub.Domain.Dtos;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CareHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SuggestionController : ControllerBase
    {
        private readonly ISuggestionProvider _suggestionProvider;

        public SuggestionController(ISuggestionProvider suggestionProvider)
        {
            _suggestionProvider = suggestionProvider;
        }

        [HttpGet]
        [Roles(CustomRoles.Administrator, CustomRoles.LibraryRead)]
        public BaseJsonResponse<List<UserSuggestionViewModel>> Get()
        {
            var userId = User.GetId();
            var suggestions = _suggestionProvider.Get(userId);
            var suggestionViewModels = AutoMapperHelper.Mapper.Map<List<UserSuggestionViewModel>>(suggestions);
            return new BaseJsonResponse<List<UserSuggestionViewModel>>(suggestionViewModels);
        }

        [HttpPost("{id}")]
        [Roles(CustomRoles.Administrator, CustomRoles.LibraryRead, CustomRoles.LibraryWrite)]
        public BaseJsonResponse Post(long id, [FromBody] UserSuggestionUpdateModel userSuggestionUpdateModel)
        {
            _suggestionProvider.Update(id, userSuggestionUpdateModel.Status);
            return new BaseJsonResponse();
        }

        [HttpGet("All")]
        [Roles(CustomRoles.Administrator, CustomRoles.LibraryRead)]
        public BaseJsonResponse<List<SuggestionDto>> All()
        {
            var suggestions = _suggestionProvider.GetAllSuggestions();
            return new BaseJsonResponse<List<SuggestionDto>>(suggestions);
        }

        [HttpPost("Add/{suggestionId}")]
        [Roles(CustomRoles.Administrator, CustomRoles.LibraryRead, CustomRoles.LibraryWrite)]
        public BaseJsonResponse<UserSuggestionViewModel> Add(long suggestionId)
        {
            var userId = User.GetId();
            if (_suggestionProvider.CheckAlreadyInLibrary(suggestionId, userId))
            {
                return new BaseJsonResponse<UserSuggestionViewModel>(false, "This suggestion has already been added.");
            }
            var suggestion = _suggestionProvider.AddToLibrary(suggestionId, userId);
            var suggestionViewModel = AutoMapperHelper.Mapper.Map<UserSuggestionViewModel>(suggestion);
            return new BaseJsonResponse<UserSuggestionViewModel>(suggestionViewModel);
        }

        [HttpPost("Add")]
        [Roles(CustomRoles.Administrator, CustomRoles.LibraryRead, CustomRoles.LibraryWrite)]
        public BaseJsonResponse<UserSuggestionViewModel[]> Add([FromBody] AddMultipleSuggestionsPostModel model)
        {
            if ((model?.Ids?.Length ?? 0) == 0)
                return new BaseJsonResponse<UserSuggestionViewModel[]>(false, "No suggestions to add.");

            var suggestions = new List<UsersSuggestionDto>();
            var result = new List<UserSuggestionViewModel>();

            var userId = User.GetId();
            foreach (var id in model.Ids)
            {
                UsersSuggestionDto suggestion;
                if (!_suggestionProvider.CheckAlreadyInLibrary(id, userId))
                {
                    suggestion = _suggestionProvider.AddToLibrary(id, userId);
                }
                else
                {
                    if (suggestions.Count == 0)
                        suggestions = _suggestionProvider.Get(userId);
                    suggestion = suggestions.First(s => s.Suggestion.Id == id);
                }

                result.Add(AutoMapperHelper.Mapper.Map<UserSuggestionViewModel>(suggestion));
            }

            return new BaseJsonResponse<UserSuggestionViewModel[]>(result.ToArray());
        }
    }
}
