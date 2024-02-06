using System.Linq;
using System.Security.Claims;

namespace CareHub.API.Auth
{
    public static class UserHelper
    {
        public static string GetId(this ClaimsPrincipal user) => user.Claims.SingleOrDefault(c => c.Type == "user_id")?.Value;

        public static string GetOriginalId(this ClaimsPrincipal user) => user.Claims.SingleOrDefault(c => c.Type == "original_user_id")?.Value ?? GetId(user);
    }
}
