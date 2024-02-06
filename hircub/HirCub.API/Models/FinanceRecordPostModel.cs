using System;
using System.Collections.Generic;

namespace CareHub.API.Models
{
    public class FinanceRecordPostModel
    {
        public long Id { get; set; }
        public List<string> Categories { get; set; }
        public string Location { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? Date { get; set; }
        public int? EventId { get; set; }
        public EventPostModel Event { get; set; }
        public string UserId { get; set; }
    }
}
