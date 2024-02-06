using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CareHub.Domain.Entities
{
    public class FinanceRecord
    {
        public long Id { get; set; }
        public ICollection<FinanceCategory> Categories { get; set; }
        public string Location { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        
        public int EventId { get; set; }
        [ForeignKey("EventId")]
        public Event Event { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
    }
}
