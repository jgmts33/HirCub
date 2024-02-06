using System;

namespace CareHub.Domain.Entities
{
    public class Problem
    {
        public long Id { get; set; }
        public int ProblemTypeId { get; set; }
        public long TrackedHealthStateId { get; set; }
        public DateTime DateTracked { get; set; }
        public int Intensity { get; set; }
        public int? Concern { get; set; }

        public ProblemType ProblemType { get; set; }
        public ApplicationUser User { get; set; }
        public TrackedHealthState TrackedHealthState { get; set; }
    }
}
