using System.Collections.Generic;

namespace CareHub.Domain.Entities
{
    public class Concern
    {
        public int Id { get; set; }
        public string InternalName { get; set; }
        public string DisplayName { get; set; }

        public List<ConcernValue> ConcernValues { get; set; }
    }
}
