using Sharebook.Common;

namespace Sharebook.Infrastructure
{
    using Microsoft.AspNetCore.Authorization;

    using static GlobalConstants;

    public class AuthorizeAdministratorAttribute : AuthorizeAttribute
    {
        public AuthorizeAdministratorAttribute() => this.Roles = AdministratorRoleName;
    }
}
