using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CareHub.Domain.Interfaces
{
    public interface IJournalEntryProvider
    {
        List<JournalEntryDto> GetAllJournalEntries(string userId);
        List<JournalEntryDto> SearchJournalEntries(string userId, string searchString);
        JournalEntryDto Get(string userId, long journalEntryId);
        JournalEntryDto Create(JournalEntryDto journalEntry, DateTime? date = null);
        JournalEntryDto Update(string userId, long journalEntryId, JournalEntryDto journalEntry);
        List<EventDto> GetAllAssociatedCalendarEvents(string userId);
        EventDto GetAssociatedCalendarEvent(string userId, long journalEntryId);
        List<string> GetTagsForAllJournalEntries(string userId);
        List<string> GetTagsForJournalEntry(string userId, long journalEntryId);
        List<JournalEntryDto> GetAllJournalEntriesForTag(string userId, string tag);
        bool DeleteJournalEntry(string userId, long journalEntryId);
    }
}
