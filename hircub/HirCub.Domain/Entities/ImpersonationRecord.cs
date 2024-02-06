using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace CareHub.Domain.Entities
{
    [Index(nameof(GuestEmail))]
    public class ImpersonationRecord
    {
        public int Id { get; set; }

        [Required]
        public string TrusterEmail { get; set; }

        public string TrusterName { get; set; }

        [Required]
        public string GuestEmail { get; set; }

        [Required]
        public string Role { get; set; }

        public Guid GuestGuid { get; set; }
    }
}
