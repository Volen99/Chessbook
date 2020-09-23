namespace WorldFeed.Identity.API.Credentials
{
    using WorldFeed.Common.Credentials;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Identity.API.Infrastructure.Inject;
    using WorldFeed.Identity.Credentials.RateLimit;

    public class IdentityCredentialsModule : IIdentityModule
    {
        public void Initialize(IIdentityContainer container)
        {
            container.RegisterType<ITwitterAccessor, TwitterAccessor>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ICredentialsAccessor, CredentialsAccessor>(RegistrationLifetime.InstancePerApplication);

            RegisterRateLimitHandler(container);
        }

        private void RegisterRateLimitHandler(ITweetinviContainer container)
        {
            container.RegisterType<IRateLimitAwaiter, RateLimitAwaiter>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IRateLimitCache, RateLimitCache>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IRateLimitCacheManager, RateLimitCacheManager>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IRateLimitHelper, RateLimitHelper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IRateLimitUpdaterFactory, RateLimitUpdaterFactory>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
