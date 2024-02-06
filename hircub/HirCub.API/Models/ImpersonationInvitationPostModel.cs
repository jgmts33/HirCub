using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CareHub.API.Models
{
    public class ImpersonationInvitationPostModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public List<string> Roles { get; set; }
    }
}
