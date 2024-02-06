using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CareHub.Domain.Entities
{
    public class JournalEntry
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? EventId { get; set; }
        
        [ForeignKey("EventId")]
        public Event Event { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public ICollection<Tag> Tags { get; set; }
    }
}
