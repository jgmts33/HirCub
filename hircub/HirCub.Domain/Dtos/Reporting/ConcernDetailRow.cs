using CareHub.Domain.Enums;
using System;

namespace CareHub.Domain.Dtos.Reporting
{
    public class ConcernDetailRow
    {
        public DateTime Date { get; }

        public string PainType { get; }

        public string Concerned { get; }

        public string AdditionalDetails { get; }

        public ConcernDetailRow(DateTime date, int? concerned, string additionalDetails, PainType? painType = null)
        {
            Date = date;
            PainType = painType.HasValue && painType.Value != 0 ? painType.Value.ToString() : null;
            Concerned = !concerned.HasValue ? null : concerned.Value switch
            {
                1 => "Not",
                2 => "Somewhat",
                3 => "Very Important",
                _ => "Undefined",
            };
            AdditionalDetails = additionalDetails;
        }
    }
}
