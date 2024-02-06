using System;
using System.ComponentModel.DataAnnotations;

namespace CareHub.API.Models
{
    public class CareNeedViewModel
    {
        public DateTime? Date { get; set; }
        [Required]
        public CareNeedReportViewModel Report { get; set; }
    }

    public class CareNeedReportViewModel
    {
        [Range(0, 2)]
        public int? Bathing { get; set; }
        [Range(0, 2)]
        public int? Dressing { get; set; }
        [Range(0, 2)]
        public int? Transferring { get; set; }
        [Range(0, 2)]
        public int? Eating { get; set; }
        [Range(0, 2)]
        public int? Toileting { get; set; }
        [Range(0, 2)]
        public int? Continence { get; set; }
        [Range(0, 2)]
        public int? Feeding { get; set; }
    }
}
