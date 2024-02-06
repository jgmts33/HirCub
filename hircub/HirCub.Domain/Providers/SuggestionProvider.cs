using System;
using System.Collections.Generic;
using System.Linq;
using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using CareHub.Domain.Enums;
using CareHub.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareHub.Domain.Providers
{
    public class SuggestionProvider : ISuggestionProvider
    {
        private readonly DomainDbContext _context;

        public SuggestionProvider(DomainDbContext context)
        {
            _context = context;
        }


        public List<UsersSuggestionDto> Get(string userId)
        {
            return AutoMapperHelper.Mapper.Map<List<UsersSuggestionDto>>(_context.UsersSuggestions
                .Include(us => us.Suggestion)
                .Where(us => us.UserId == userId)
                .OrderByDescending(us => us.DateUpdated)
                .ToList()
            );
        }

        public void Update(long usersSuggestionId, SuggestionStatus suggestionStatus)
        {
            var suggestion =
                _context.UsersSuggestions.Single(us => us.Id == usersSuggestionId);
            suggestion.Status = suggestionStatus;
            suggestion.DateUpdated = DateTime.UtcNow;
            _context.SaveChanges();
        }

        public bool CheckAlreadyInLibrary(long suggestionId, string userId)
        {
            return _context.UsersSuggestions.Any(us => us.SuggestionId == suggestionId && us.UserId == userId);
        }

        public UsersSuggestionDto AddToLibrary(long suggestionId, string userId)
        {
            var utcNow = DateTime.UtcNow;
            var userSuggestion = new UsersSuggestion
            {
                UserId = userId,
                DateCreated = utcNow,
                DateUpdated = utcNow,
                Status = SuggestionStatus.Suggested,
                SuggestionId = suggestionId
            };
            _context.UsersSuggestions.Add(userSuggestion);
            _context.SaveChanges();
            var userSuggestionDto = AutoMapperHelper.Mapper.Map<UsersSuggestionDto>(_context.UsersSuggestions
                .Include(us => us.Suggestion)
                .Single(us => us.Suggestion.Id == suggestionId && us.UserId == userId));
            return userSuggestionDto;
        }

        public List<SuggestionDto> GetAllSuggestions()
        {
            var suggestions = AutoMapperHelper.Mapper.Map<List<SuggestionDto>>(_context.Suggestions.ToList());
            return suggestions;
        }
    }
}
