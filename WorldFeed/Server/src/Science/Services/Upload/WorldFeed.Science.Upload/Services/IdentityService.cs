namespace WorldFeed.Science.Upload.Services
{
    using System;
    using Microsoft.AspNetCore.Http;

    public class IdentityService : IIdentityService
    {
        private readonly IHttpContextAccessor context;

        public IdentityService(IHttpContextAccessor context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public string GetUserIdentity()
        {
            return this.context.HttpContext.User.FindFirst("sub").Value;
        }
    }
}
