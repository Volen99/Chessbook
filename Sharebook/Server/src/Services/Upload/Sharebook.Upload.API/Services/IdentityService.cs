namespace Sharebook.Upload.Services
{
    using System;
    using Microsoft.AspNetCore.Http;

    using Sharebook.Upload.Application.Common.Interfaces;

    public class IdentityService : IIdentityService, ICurrentUser
    {
        private readonly IHttpContextAccessor context;

        public IdentityService(IHttpContextAccessor context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));

            this.UserId = this.context.HttpContext.User.FindFirst("sub").Value;
        }

        public string UserId { get; }

        public string GetUserIdentity()
        {
            throw new NotImplementedException();
        }
    }
}
