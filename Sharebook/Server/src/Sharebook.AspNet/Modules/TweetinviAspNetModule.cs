namespace Sharebook.AspNet.Modules
{
    using Sharebook.AspNet.Core.Logic;
    using Sharebook.Common.InjectWorldFeed;
    using Sharebook.Common.Public.Models.Webhooks;

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
