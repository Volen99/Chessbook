namespace Sharebook.Upload.Infrastructure.Middlewares
{
    using System;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Primitives;

    class ByPassAuthMiddleware
    {
        private readonly RequestDelegate next;
        private string currentUserId;

        public ByPassAuthMiddleware(RequestDelegate next)
        {
            this.next = next;
            this.currentUserId = null;
        }

        public async Task Invoke(HttpContext context)
        {
            var path = context.Request.Path;
            if (path == "/noauth")
            {
                var userid = context.Request.Query["userid"];
                if (!string.IsNullOrEmpty(userid))
                {
                    this.currentUserId = userid;
                }
                context.Response.StatusCode = 200;
                context.Response.ContentType = "text/string";
                await context.Response.WriteAsync($"User set to {this.currentUserId}");
            }

            else if (path == "/noauth/reset")
            {
                this.currentUserId = null;
                context.Response.StatusCode = 200;
                context.Response.ContentType = "text/string";
                await context.Response.WriteAsync($"User set to none. Token required for protected endpoints.");
            }
            else
            {
                var currentUserId = this.currentUserId;

                var authHeader = context.Request.Headers["Authorization"];
                if (authHeader != StringValues.Empty)
                {
                    var header = authHeader.FirstOrDefault();
                    if (!string.IsNullOrEmpty(header) && header.StartsWith("Email ") && header.Length > "Email ".Length)
                    {
                        currentUserId = header.Substring("Email ".Length);
                    }
                }


                if (string.IsNullOrEmpty(currentUserId) == false)
                {
                    var user = new ClaimsIdentity(new[] {
                    new Claim("emails", currentUserId),
                    new Claim("name", "Test user"),
                    new Claim("nonce", Guid.NewGuid().ToString()),
                    new Claim("http://schemas.microsoft.com/identity/claims/identityprovider", "ByPassAuthMiddleware"),
                    new Claim("nonce", Guid.NewGuid().ToString()),
                    new Claim("sub", "1234"),
                    new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname","User"),
                    new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname","Microsoft")}, "ByPassAuth");

                    context.User = new ClaimsPrincipal(user);
                }

                await this.next.Invoke(context);
            }
        }
    }
}
