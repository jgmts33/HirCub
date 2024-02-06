using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CareHub.Domain.Providers
{
    public class JournalEntryProvider : IJournalEntryProvider
    {
        #region Internals
        readonly DomainDbContext _context;

        void UpdateEntryTags(JournalEntry journalEntity, List<string> tags)
        {
            var userTags = journalEntity.Tags == null
                ? new List<Tag>()
                : _context.Tags.Where(x => x.UserId == journalEntity.UserId).ToList()
                    .Where(x => tags.Any(t => t.Equals(x.Value, StringComparison.OrdinalIgnoreCase))).ToList();
            if (journalEntity.Tags == null)
            {
                journalEntity.Tags = new List<Tag>();
            }
            journalEntity.Tags.Clear();
            foreach (var tag in tags)
            {
                var existingTag = userTags.FirstOrDefault(t => tag.Equals(t.Value, StringComparison.OrdinalIgnoreCase));
                if (existingTag == null)
                {
                    var newTag = new Tag { UserId = journalEntity.UserId, Value = tag };
                    _context.Tags.Add(newTag);
                    journalEntity.Tags.Add(newTag);
                }
                else
                {
                    journalEntity.Tags.Add(existingTag);
                }
            }
        }
        #endregion

        public JournalEntryProvider(DomainDbContext context)
        {
            _context = context;
        }

        public JournalEntryDto Create(JournalEntryDto journalEntry, DateTime? date = null)
        {
            var journalEntity = AutoMapperHelper.Mapper.Map<JournalEntry>(journalEntry);
            journalEntity.CreatedAt = date ?? DateTime.Now;
            
            if (journalEntry.EventId.HasValue)
            {
                var evt = _context.Events.FirstOrDefault(x => x.UserId == journalEntry.UserId && x.Id == journalEntry.EventId.Value);
                if (evt == null)
                {
                    return null;
                }
            }
            
            if (journalEntry.Tags?.Count > 0)
            {
                UpdateEntryTags(journalEntity,journalEntry.Tags.Select(x=>x.Value).ToList());
            }
            
            _context.JournalEntries.Add(journalEntity);
            _context.SaveChanges();

            return AutoMapperHelper.Mapper.Map<JournalEntryDto>(journalEntity);
        }

        public JournalEntryDto Update(string userId, long journalEntryId, JournalEntryDto journalEntry)
        {
            var existingEntity = _context.JournalEntries.Where(x => x.UserId == userId && x.Id == journalEntryId).Include(e=>e.Tags).FirstOrDefault();
            if (existingEntity == null)
            {
                return null;
            }

            if (journalEntry.Description != null) existingEntity.Description = journalEntry.Description;
            if (journalEntry.Title != null) existingEntity.Title = journalEntry.Title;
            if (journalEntry.Tags!=null)
            {
                UpdateEntryTags(existingEntity,journalEntry.Tags.Select(x=>x.Value).ToList());
            }

            if (journalEntry.EventId.HasValue && journalEntry.EventId.Value != 0 && journalEntry.EventId != existingEntity.EventId)
            {
                var eventId = _context.Events.Where(x => x.Id == journalEntry.EventId.Value && x.UserId == userId).Select(x => x.Id).FirstOrDefault();
                if (eventId == journalEntry.EventId.Value)
                {
                    existingEntity.EventId = eventId;
                }
            }

            _context.SaveChanges();
            return AutoMapperHelper.Mapper.Map<JournalEntryDto>(existingEntity);
        }

        // TODO: Do we need to find and delete orphaned Tags?
        public bool DeleteJournalEntry(string userId, long journalEntryId)
        {
            var _entry = _context.JournalEntries.Where(x => x.Id == journalEntryId && x.UserId == userId).Select(x => new JournalEntry { Id = x.Id }).FirstOrDefault();
            if (_entry == null) return false;
            _context.JournalEntries.Remove(_entry);
            _context.SaveChanges();
            return true;
        }

        public List<JournalEntryDto> GetAllJournalEntries(string userId)
        {
            var entities = _context
                .JournalEntries
                .Where(x => x.UserId == userId)
                .Include(x => x.Tags)
                .Select(x => new JournalEntry
                {
                    Id = x.Id,
                    Title = x.Title,
                    CreatedAt = x.CreatedAt,
                    UserId = userId,
                    EventId = x.EventId,
                    Description = x.Description,
                    Tags = x.Tags
                })
                .ToList();

            return AutoMapperHelper.Mapper.Map<List<JournalEntryDto>>(entities);

        }

        public List<JournalEntryDto> SearchJournalEntries(string userId, string searchString)
        {
            return AutoMapperHelper.Mapper.Map<List<JournalEntryDto>>(
                _context
                    .JournalEntries
                    .Where(x => x.UserId == userId)
                    .Where(x =>
                        x.Title.Contains(searchString) ||
                        x.Description.Contains(searchString)
                    )
                    .Include(x => x.Tags).Select(x => new JournalEntry
                    {
                        Id = x.Id,
                        Title = x.Title,
                        CreatedAt = x.CreatedAt,
                        UserId = userId,
                        EventId = x.EventId,
                        Description = x.Description,
                        Tags = x.Tags
                    })
                    .ToList()
            );
        }

        public JournalEntryDto Get(string userId, long journalEntryId)
        {
            return AutoMapperHelper.Mapper.Map<JournalEntryDto>(_context.JournalEntries.Where(journalEntry => journalEntry.UserId == userId && journalEntry.Id == journalEntryId).Include(x => x.Tags)
                .FirstOrDefault());
        }

        public List<EventDto> GetAllAssociatedCalendarEvents(string userId)
        {
            return AutoMapperHelper.Mapper.Map<List<EventDto>>(_context.JournalEntries.Where(x => x.UserId == userId).Select(x => x.Event).Distinct());
        }

        public EventDto GetAssociatedCalendarEvent(string userId, long journalEntryId)
        {
            return AutoMapperHelper.Mapper.Map<EventDto>(_context.JournalEntries.Where(x => x.UserId == userId && x.Id == journalEntryId).Select(x=>x.Event).FirstOrDefault());
        }

        #region Tags
        public List<string> GetTagsForAllJournalEntries(string userId)
        {
            return _context.JournalEntries.Where(x => x.UserId == userId).SelectMany(x => x.Tags.Select(t => t.Value)).Distinct().ToList();
        }

        public List<string> GetTagsForJournalEntry(string userId, long journalEntryId)
        {
            var _entry = _context.JournalEntries
                .Where(x => x.UserId == userId && x.Id == journalEntryId)
                .Include(e => e.Tags)
                .Select(e => new JournalEntry { Id = e.Id, Tags = e.Tags })
                .FirstOrDefault();
            return _entry?.Tags.Select(x=>x.Value).ToList();
        }

        public List<JournalEntryDto> GetAllJournalEntriesForTag(string userId, string tag)
        {
            return AutoMapperHelper.Mapper.Map<List<JournalEntryDto>>(
                _context.Tags.Where(x => x.UserId==userId && x.Value == tag).SelectMany(x => x.JournalEntries.Where(e => e.UserId == userId)).Select(x => new JournalEntry
                    { Id = x.Id, Title = x.Title, User = x.User, CreatedAt = x.CreatedAt, UserId = userId, EventId = x.EventId, Tags = x.Tags }).ToList());
        }
        #endregion
    }
}
