using System;
using System.Collections.Generic;

namespace CareHub.Domain.Dtos.Reporting
{
    public class CareNeedsPerDayDto
    {
        public DateTime Date { get; set; }
        public List<CareNeedsAnswerDto> Needs { get; set; }
    }
}
