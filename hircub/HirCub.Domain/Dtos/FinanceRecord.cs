using System;
using System.Collections.Generic;

namespace CareHub.Domain.Dtos
{
    public class FinanceRecordDto
    {
        public long Id { get; set; }
        public List<FinanceCategoryDto> Categories { get; set; }
        public string Location { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? Date { get; set; }

        public int? EventId { get; set; }
        public EventDto Event { get; set; }
        public string UserId { get; set; }
    }
}
