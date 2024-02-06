using CareHub.API.Auth;
using CareHub.API.Models;
using CareHub.Domain.Dtos;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CareHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JournalEntryController : Controller
    {
        #region Internals
        readonly IJournalEntryProvider _journalEntryProvider;
        #endregion

        public JournalEntryController(IJournalEntryProvider journalEntryProvider)
        {
            _journalEntryProvider = journalEntryProvider;
        }

        [HttpPost]
        [Roles(CustomRoles.Administrator, CustomRoles.JournalEntryWrite)]
        public BaseJsonResponse<JournalEntryPostModel> Post([FromBody] JournalEntryPostModel journalEntryPostModal)
        {
            var journalEntryDto = AutoMapperHelper.Mapper.Map<JournalEntryDto>(journalEntryPostModal);
            journalEntryDto.UserId = User.GetId();

            JournalEntryDto newJournalEntry = _journalEntryProvider.Create(journalEntryDto);
            if (newJournalEntry == null)
            {
                return new BaseJsonResponse<JournalEntryPostModel>(false, "Event not found") { StatusCode = StatusCodes.Status404NotFound };
            }
            return new BaseJsonResponse<JournalEntryPostModel>(AutoMapperHelper.Mapper.Map<JournalEntryPostModel>(newJournalEntry)){StatusCode = StatusCodes.Status201Created};
        }

        [HttpPut("{id}")]
        [Roles(CustomRoles.Administrator, CustomRoles.JournalEntryWrite)]
        public BaseJsonResponse<JournalEntryPostModel> UpdateJournalEntry(long id, [FromBody] JournalEntryPostModel journalEntry)
        {
            var userId = User.GetId();
            var updatedEntry = _journalEntryProvider.Update(userId, id, AutoMapperHelper.Mapper.Map<JournalEntryDto>(journalEntry));
            if (updatedEntry == null)
            {
                return new BaseJsonResponse<JournalEntryPostModel>(false, "Not found"){StatusCode = StatusCodes.Status404NotFound};
            }

            return new BaseJsonResponse<JournalEntryPostModel>(AutoMapperHelper.Mapper.Map<JournalEntryPostModel>(updatedEntry));
        }

        [HttpDelete("{id}")]
        [Roles(CustomRoles.Administrator, CustomRoles.JournalEntryWrite)]
        public BaseJsonResponse DeleteJournalEntry(long id)
        {
            var userId = User.GetId();
            var result = _journalEntryProvider.DeleteJournalEntry(userId, id);
            if (!result)
            {
                return new BaseJsonResponse(false, "Not found") { StatusCode = StatusCodes.Status404NotFound };
            }

            return new BaseJsonResponse();
        }

        /// <summary>
        ///  GetAll
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Roles(CustomRoles.Administrator, CustomRoles.JournalEntryRead, CustomRoles.JournalEntryWrite)]
        public BaseJsonResponse<List<JournalEntryPostModel>> Get()
        {
            var userId = User.GetId();
            var journalEntries = _journalEntryProvider.GetAllJournalEntries(userId);
            var journeyModel = AutoMapperHelper.Mapper.Map<List<JournalEntryPostModel>>(journalEntries);
            return new BaseJsonResponse<List<JournalEntryPostModel>>(journeyModel);
        }

        [HttpGet("search")]
        [Roles(CustomRoles.Administrator, CustomRoles.JournalEntryRead, CustomRoles.JournalEntryWrite)]
        public BaseJsonResponse<List<JournalEntryPostModel>> Search(string searchQuery)
        {
            if (string.IsNullOrWhiteSpace(searchQuery))
            {
                return new BaseJsonResponse<List<JournalEntryPostModel>>(false, "Search string should be provided") { StatusCode = StatusCodes.Status400BadRequest };
            }

            var userId = User.GetId();
            var journalEntries = _journalEntryProvider.SearchJournalEntries(userId, searchQuery);
            var journeyModel = AutoMapperHelper.Mapper.Map<List<JournalEntryPostModel>>(journalEntries);
            return new BaseJsonResponse<List<JournalEntryPostModel>>(journeyModel);
        }

        [HttpGet("{id}")]
        [Roles(CustomRoles.Administrator, CustomRoles.JournalEntryRead, CustomRoles.JournalEntryWrite)]
        public BaseJsonResponse<JournalEntryPostModel> GetJournalById(long id)
        {
            var userId = User.GetId();
            var journalEntry = _journalEntryProvider.Get(userId,id);
            if (journalEntry == null)
            {
                return new BaseJsonResponse<JournalEntryPostModel>(false, "Not found"){StatusCode = StatusCodes.Status404NotFound};
            }

            return new BaseJsonResponse<JournalEntryPostModel>(AutoMapperHelper.Mapper.Map<JournalEntryPostModel>(journalEntry));
        }

        [HttpGet("events")]
        [Roles(CustomRoles.Administrator, CustomRoles.JournalEntryRead, CustomRoles.JournalEntryWrite)]
        public BaseJsonResponse<List<EventDto>> GetAllAssociatedCalendarEvents()
        {
            var userId = User.GetId();
            var events = _journalEntryProvider.GetAllAssociatedCalendarEvents(userId);
            return new BaseJsonResponse<List<EventDto>>(events);
        }

        [HttpGet("{id}/events")]
        [Roles(CustomRoles.Administrator, CustomRoles.JournalEntryRead, CustomRoles.JournalEntryWrite)]
        public BaseJsonResponse<EventDto> GetAssociatedCalendarEvent(long id)
        {
            var userId = User.GetId();
            var evt = _journalEntryProvider.GetAssociatedCalendarEvent(userId,id);
            if (evt == null)
            {
                return new BaseJsonResponse<EventDto>(false, "Not found") { StatusCode = StatusCodes.Status404NotFound };
            }
            return new BaseJsonResponse<EventDto>(evt);
        }

        #region Tags
        [HttpGet("tags")]
        [Roles(CustomRoles.Administrator, CustomRoles.JournalEntryRead, CustomRoles.JournalEntryWrite)]
        public BaseJsonResponse<List<string>> GetAllTags()
        {
            var userId = User.GetId();
            var tags = _journalEntryProvider.GetTagsForAllJournalEntries(userId);
            return new BaseJsonResponse<List<string>>(tags);
        }
        
        [HttpGet("{id}/tags")]
        [Roles(CustomRoles.Administrator, CustomRoles.JournalEntryRead, CustomRoles.JournalEntryWrite)]
        public BaseJsonResponse<List<string>> GetTagsForJournalEntry(long id)
        {
            var userId = User.GetId();
            var tags = _journalEntryProvider.GetTagsForJournalEntry(userId,id);
            if (tags == null)
            {
                return new BaseJsonResponse<List<string>>(false, "Not found") { StatusCode = StatusCodes.Status404NotFound };
            }
            return new BaseJsonResponse<List<string>>(tags);
        }

        [HttpGet("tags/{tag}")]
        [Roles(CustomRoles.Administrator, CustomRoles.JournalEntryRead, CustomRoles.JournalEntryWrite)]
        public BaseJsonResponse<List<JournalEntryPostModel>> GetJournalEntriesForTag(string tag)
        {
            var userId = User.GetId();
            var entries = _journalEntryProvider.GetAllJournalEntriesForTag(userId, tag);
            return new BaseJsonResponse<List<JournalEntryPostModel>>(AutoMapperHelper.Mapper.Map<List<JournalEntryPostModel>>(entries));
        }
        #endregion
    }
}
