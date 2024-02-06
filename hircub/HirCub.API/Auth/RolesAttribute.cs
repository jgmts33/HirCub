using Microsoft.AspNetCore.Authorization;

namespace CareHub.API.Auth
{
    public class RolesAttribute : AuthorizeAttribute
    {
        public RolesAttribute(params string[] roles) => Roles = string.Join(",", roles);
    }
}
