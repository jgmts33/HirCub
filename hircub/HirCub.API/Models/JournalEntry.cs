using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareHub.API.Models
{
    public class JournalEntryPostModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? EventId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; }
        public List<string> Tags { get; set; }
    }
}
