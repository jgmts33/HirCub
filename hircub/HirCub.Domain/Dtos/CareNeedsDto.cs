using System;

namespace CareHub.Domain.Dtos
{
    public class CareNeedsDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime DateTime { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }
    }
}
