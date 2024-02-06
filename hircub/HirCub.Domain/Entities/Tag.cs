using System.Collections.Generic;

namespace CareHub.Domain.Entities
{
    public class Tag
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<JournalEntry> JournalEntries { get; set; }

        public string Value { get; set; }
    }
}