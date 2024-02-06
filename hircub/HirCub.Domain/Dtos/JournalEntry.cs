using System;
using System.Collections.Generic;

namespace CareHub.Domain.Dtos
{
    public class JournalEntryDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? EventId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; }

        public List<TagDto> Tags { get; set; }
    }
}
