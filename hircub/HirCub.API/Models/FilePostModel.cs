using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace CareHub.API.Models
{
    public class FilePostModel
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
