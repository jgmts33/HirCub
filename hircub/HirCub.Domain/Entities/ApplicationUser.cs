using CareHub.Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace CareHub.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public AccountType AccountType { get; set; }
        public string NickName { get; set; }
        public string PostalCode { get; set; }
        public string ProfileColor { get; set; }
        public int BackgroundImageCode { get; set; }
        public bool FirstLogin { get; set; }
    }
}
