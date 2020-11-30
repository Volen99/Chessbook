using Sharebook.Common;

namespace Sharebook.Common.Infrastructure
{
    using System.Security.Claims;

    using static GlobalConstants;

    public static class ClaimsPrincipalExtensions
    {
        public static bool IsAdministrator(this ClaimsPrincipal user)
            => user.IsInRole(AdministratorRoleName);
    }
}
