using System;
using System.Collections.Generic;
using CareHub.Domain.Enums;

namespace CareHub.Domain.Entities
{
    public class TrackedHealthState
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public Period? Period { get; set; }
        public int? Happiness { get; set; }
        public int? Content { get; set; }
        public List<Problem> Problems { get; set; }
        public PainProblem PainProblem { get; set; }
        public List<TrackedConcern> TrackedConcerns { get; set; }
        public DateTime DateCreated { get; set; }
        public string AdditionalDetails { get; set; }

        public ApplicationUser User { get; set; }
    }
}
