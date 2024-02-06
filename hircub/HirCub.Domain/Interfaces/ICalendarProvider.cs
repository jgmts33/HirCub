using System.Collections.Generic;
using CareHub.Domain.Dtos;

namespace CareHub.Domain.Interfaces
{
    public interface ICalendarProvider
    {
        List<EventDto> Get(string userId);

        Dictionary<string, List<EventDto>> GetImpersonated(string userEmail, string role);

        EventDto Create(EventDto eventDto, string userId);
    }
}
