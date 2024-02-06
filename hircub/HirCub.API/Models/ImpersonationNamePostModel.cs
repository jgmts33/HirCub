using System.ComponentModel.DataAnnotations;

namespace CareHub.API.Models
{
    public class ImpersonationNamePostModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
