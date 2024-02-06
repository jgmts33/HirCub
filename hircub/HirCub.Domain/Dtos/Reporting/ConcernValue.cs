using System;
using System.Collections.Generic;

namespace CareHub.Domain.Dtos.Reporting
{
    public class ConcernValue
    {
        public string Name { get; set; }

        public int Value { get; set; }

        public List<DateTime> Points { get; set; }
    }
}
