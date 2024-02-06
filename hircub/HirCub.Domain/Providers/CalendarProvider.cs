using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;

namespace CareHub.Domain.Providers
{
    public class CalendarProvider : ICalendarProvider
    {
        private readonly DomainDbContext _context;

        public CalendarProvider(DomainDbContext context)
        {
            _context = context;
        }

        public List<EventDto> Get(string userId)
        {
            return AutoMapperHelper.Mapper.Map<List<EventDto>>(_context.Events.Where(e => e.UserId == userId).ToList());
        }

        public Dictionary<string, List<EventDto>> GetImpersonated(string userEmail, string roleForCalendarRead)
        {
            var trustersEmails = _context
                .ImpersonationRecords
                .Where(rec => rec.GuestEmail == userEmail)
                .Where(rec => rec.Role == roleForCalendarRead)
                .Select(rec => rec.TrusterEmail)
                .Distinct()
                .ToList();

            var events = _context
                .Events
                .Include(ev => ev.User)
                .Select(ev => new
                {
                    Event = new EventDto
                    {
                        Id = ev.Id,
                        Title = ev.Title,
                        Description = ev.Description,
                        Start = ev.Start,
                        End = ev.End,
                        FullDay = ev.FullDay,
                        UserId = ev.UserId
                    },
                    ev.User.Email
                })
                .Where(ev => trustersEmails.Any(email => email == ev.Email))
                .ToList();

            var result = events
                .GroupBy(ev => ev.Email)
                .OrderBy(g => g.Key)
                .ToDictionary(
                    g => g.Key,
                    g => g
                        .Select(x => x.Event)
                        .OrderBy(ev => ev.Start)
                        .ToList()
                );

            return result;
        }

        public EventDto Create(EventDto eventDto, string userId)
        {
            var eventEntity = AutoMapperHelper.Mapper.Map<Event>(eventDto);
            eventEntity.UserId = userId;
            eventEntity.DateCreated = DateTime.UtcNow;
            _context.Events.Add(eventEntity);
            _context.SaveChanges();
            return AutoMapperHelper.Mapper.Map<EventDto>(eventEntity);
        }
    }
}
