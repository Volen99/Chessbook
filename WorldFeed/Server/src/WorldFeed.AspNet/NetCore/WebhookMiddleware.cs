namespace WorldFeed.AspNet.NetCore
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Options;

    using WorldFeed.AspNet.Public;
    using WorldFeed.Common.Public.Models.Webhooks;

    public static class WebhookMiddlewareExtensions
    {
        public static IApplicationBuilder UseTweetinviWebhooks(this IApplicationBuilder app, WebhookMiddlewareConfiguration configuration)
        {
            var config = configuration as InternalWebhookMiddlewareConfiguration;
            return app.UseMiddleware<WebhookMiddleware>(Options.Create(config));
        }
    }

    public class WebhookMiddleware
    {
        private readonly RequestDelegate next;
        private readonly IAccountActivityRequestHandler accountActivityHandler;

        public WebhookMiddleware(RequestDelegate next, IOptions<InternalWebhookMiddlewareConfiguration> options)
        {
            this.next = next;

            this.accountActivityHandler = options.Value.RequestHandler;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var request = new WebhooksRequestForAspNetCore(context);
            var isRequestManagedByTweetinvi = await this.accountActivityHandler.IsRequestManagedByTweetinviAsync(request).ConfigureAwait(false);

            if (isRequestManagedByTweetinvi)
            {
                var routeHandled = await this.accountActivityHandler.TryRouteRequestAsync(request).ConfigureAwait(false);
                if (routeHandled)
                {
                    return;
                }
            }

            // Continue to any other request supported by the website.
            await this.next(context).ConfigureAwait(false);
        }
    }
}
