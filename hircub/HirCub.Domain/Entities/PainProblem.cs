using System;
using CareHub.Domain.Enums;

namespace CareHub.Domain.Entities
{
    public class PainProblem
    {
        public long Id { get; set; }
        public long TrackedHealthStateId { get; set; }
        public DateTime DateTracked { get; set; }
        public int Intensity { get; set; }
        public int? Concern { get; set; }
        public PainType PainType { get; set; }
        public bool IsFront { get; set; }
        public int BodyPart { get; set; }

        public TrackedHealthState TrackedHealthState { get; set; }
    }
}
