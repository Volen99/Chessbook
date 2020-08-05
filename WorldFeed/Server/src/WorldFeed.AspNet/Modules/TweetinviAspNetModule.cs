namespace WorldFeed.AspNet.Modules
{
    using WorldFeed.AspNet.Core.Logic;
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.Public.Models.Webhooks;

    public class TweetinviAspNetModule : ITweetinviModule
    {
        public void Initialize(ITweetinviContainer container)
        {
            container.RegisterType<IWebhooksHelper, WebhooksHelper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IWebhooksRoutes, WebhooksRoutes>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IWebhookRouter, WebhookRouter>();
            container.RegisterType<IAccountActivityRequestHandler, AccountActivityRequestHandler>();
        }
    }
}
