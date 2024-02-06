using System;

namespace CareHub.Domain.Entities
{
    public class CareNeeds
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime DateTime { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }
        public ApplicationUser User { get; set; }
    }
}
