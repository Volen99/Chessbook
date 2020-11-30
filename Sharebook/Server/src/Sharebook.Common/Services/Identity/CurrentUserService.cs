namespace Sharebook.Services.Identity
{
    using System;
    using System.Security.Claims;
    using Microsoft.AspNetCore.Http;

    using Sharebook.Common.Infrastructure;

    public class CurrentUserService : ICurrentUserService
    {
        private readonly ClaimsPrincipal user;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            this.user = httpContextAccessor.HttpContext?.User;

            if (user == null)
            {
                throw new InvalidOperationException("This request does not have an authenticated user.");
            }
        }

        public string UserId
        {
            get
            {
                return this.user.FindFirstValue(ClaimTypes.NameIdentifier);
            }
        }

        public bool IsAdministrator => this.user.IsAdministrator();
    }
}
