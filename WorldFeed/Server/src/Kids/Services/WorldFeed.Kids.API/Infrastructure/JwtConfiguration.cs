namespace WorldFeed.Kids.API.Infrastructure
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authentication.JwtBearer;

    public class JwtConfiguration
    {
        // For signalR. JWT goes in the URL
        public static JwtBearerEvents BearerEvents 
            => new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];

                var path = context.HttpContext.Request.Path;

                // Makes the query string token to be send only at "/posts"
                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/posts"))
                {
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            }
        };
    }
}
