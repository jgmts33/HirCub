using System.Collections.Generic;
using CareHub.Domain.Enums;

namespace CareHub.API.Models
{
    public class IntakeManagerPostModel
    {
        public Age Age { get; set; }
        public Gender Gender { get; set; }
        public string GenderOther { get; set; }
        public string PostalCode { get; set; }
        public string CaredPostalCode { get; set; }
        public List<string> MainIssues { get; set; }
        public List<string> MinorIssues { get; set; }
        public Relationship Relationship { get; set; }
        public string CaredName { get; set; }
        public bool LiveTogether { get; set; }
        public bool AlreadyProvidedCare { get; set; }
        public CaringPeriod CaringPeriod { get; set; }
        public WorkType Work { get; set; }
        public bool HaveOtherCared { get; set; }
        public bool CaredPartner { get; set; }
        public bool CaredChildren { get; set; }
        public bool CaredOthers { get; set; }
        public bool CaredOthersChildrenUnder12 { get; set; }
        public bool CaredOthersTeens { get; set; }
        public bool CaredOthersAdults { get; set; }
        public bool Drive { get; set; }
    }

}