using System.Collections.Generic;

namespace CareHub.Domain.Entities
{
    public class FinanceCategory
    {
        public long Id { get; set; }
        
        public string UserId { get; set; }
        
        public ApplicationUser User { get; set; }
        
        public ICollection<FinanceRecord> FinanceRecords { get; set; }

        public string Value { get; set; }
    }
}
