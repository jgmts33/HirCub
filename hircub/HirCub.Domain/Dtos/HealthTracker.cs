using System;
using System.Collections.Generic;
using CareHub.Domain.Entities;
using CareHub.Domain.Enums;

namespace CareHub.Domain.Dtos
{
    public class ProblemTypeTransport
    {
        public int Id { get; set; }
        public string InternalName { get; set; }
        public string DisplayName { get; set; }
    }

    public class ProblemTransport
    {
        public long Id { get; set; }
        public int ProblemTypeId { get; set; }
        public DateTime DateTracked { get; set; }
        public int Intensity { get; set; }
        public int? Concern { get; set; }

        public ProblemTypeTransport ProblemType { get; set; }
        public ApplicationUser User { get; set; }
    }

    public class PainProblemTransport
    {
        public long Id { get; set; }
        public DateTime DateTracked { get; set; }
        public int Intensity { get; set; }
        public int? Concern { get; set; }
        public PainType PainType { get; set; }
        public bool IsFront { get; set; }
        public int BodyPart { get; set; }
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }
    }

    public class TrackedConcernTransport
    {
        public string ConcernName { get; set; }
        public int ConcernValue { get; set; }
    }

    public class HealthStateTransport
    {
        public long Id { get; set; }
        public Period? Period { get; set; }
        public int? Happiness { get; set; }
        public int? Content { get; set; }
        public List<ProblemTransport> Problems { get; set; }
        public PainProblemTransport PainProblem { get; set; }
        public Dictionary<string, List<int>> TrackedConcerns { get; set; }
        public string AdditionalDetails { get; set; }
    }
}
