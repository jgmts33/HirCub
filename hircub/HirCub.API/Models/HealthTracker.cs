using System;
using System.Collections.Generic;
using CareHub.Domain.Enums;

namespace CareHub.API.Models
{
    public class PainProblemPostModel
    {
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public int Intensity { get; set; }
        public int? Concern { get; set; }
        public PainType PainType { get; set; }
        public bool IsFront { get; set; }
        public int BodyPart { get; set; }
    }

    public class ProblemPostModel
    {
        public int ProblemTypeId { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public int Intensity { get; set; }
        public int? Concern { get; set; }
    }

    public class HealthStatePostModel
    {
        public Period? Period { get; set; }
        public PainProblemPostModel PainProblem { get; set; }
        public List<ProblemPostModel> Problems { get; set; }
        public int? Happiness { get; set; }
        public int? Content { get; set; }
        public Dictionary<string, List<int>> Concerns { get; set; }
        public string AdditionalDetails { get; set; }
    }
}
