using System;
using System.Collections.Generic;
using System.Linq;

namespace CareHub.Domain.Dtos
{
    public class ImpersonationPerson
    {
        #region Internals
        readonly List<string> roles;
        #endregion

        public string Email { get; }

        public string Name { get; }

        public string UserId { get; }
        
        public string ProfileColor { get; }

        public IReadOnlyCollection<string> Roles => roles.AsReadOnly();

        public ImpersonationPerson(string userId, string email, string name, string profileColor, IEnumerable<string> roles)
        {
            UserId = userId ?? throw new ArgumentNullException(nameof(userId));
            Email = email ?? throw new ArgumentNullException(nameof(email));
            ProfileColor = profileColor;

            this.roles = new List<string>(roles ?? throw new ArgumentNullException(nameof(roles)));
            if (!this.roles.Any()) throw new ArgumentException("Roles are empty", nameof(roles));
            
            Name = name;
        }
    }
}
