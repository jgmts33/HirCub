using CareHub.API.Auth;
using CareHub.API.Models;
using CareHub.Domain.Dtos;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalendarController : ControllerBase
    {
        #region Internals
        private readonly ICalendarProvider _calendarProvider;
        private readonly IUserProvider _userProvider;

        public CalendarController(ICalendarProvider calendarProvider, IUserProvider userProvider)
        {
            _calendarProvider = calendarProvider;
            _userProvider = userProvider;
        }
        #endregion

        [HttpGet("Events")]
        [Roles(CustomRoles.Administrator, CustomRoles.CalendarRead)]
        public BaseJsonResponse<List<EventDto>> Events()
        {
            var userId = User.GetId();
            var events = _calendarProvider.Get(userId);
            return new BaseJsonResponse<List<EventDto>>(events);
        }

        [HttpGet("AllEvents")]
        [Roles(CustomRoles.Administrator, CustomRoles.CalendarRead)]
        public async Task<BaseJsonResponse<Dictionary<string, List<EventDto>>>> AllEvents()
        {
            var user = await _userProvider.GetUserAsync(User.GetOriginalId());

            var events = new Dictionary<string, List<EventDto>>();

            var ownEvents = _calendarProvider.Get(user.Id);
            events.Add(user.Email, ownEvents);

            var impersonatedEvents = _calendarProvider.GetImpersonated(user.Email, CustomRoles.CalendarRead);
            if (impersonatedEvents.Any())
            {
                foreach (var eventDto in impersonatedEvents)
                    events.Add(eventDto.Key, eventDto.Value);
            }

            return new BaseJsonResponse<Dictionary<string, List<EventDto>>>(events);
        }

        [HttpPost("Events")]
        [Roles(CustomRoles.Administrator, CustomRoles.CalendarRead, CustomRoles.CalendarWrite)]
        public BaseJsonResponse<EventDto> Put([FromBody] EventPostModel eventPostModel)
        {
            var userId = User.GetId();
            var eventEntity = AutoMapperHelper.Mapper.Map<EventDto>(eventPostModel);
            var eventDto = _calendarProvider.Create(eventEntity, userId);
            return new BaseJsonResponse<EventDto>(eventDto);
        }
    }
}
