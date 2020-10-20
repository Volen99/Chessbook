namespace Sharebook.Notifications.Infrastructure
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authentication.JwtBearer;

    public class JwtConfiguration
    {
        public static JwtBearerEvents BearerEvents
            // For signalR. JWT goes in the URL
            => new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    var accessToken = context.Request.Query["access_token"];

                    var path = context.HttpContext.Request.Path;

                    // Makes the query string token to be send only at "/notifications"
                    if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/notifications"))
                    {
                        context.Token = accessToken;
                    }

                    return Task.CompletedTask;
                }
            };
    }
}
