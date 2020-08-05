namespace WorldFeed.Credentials
{
    using WorldFeed.Common.Credentials;
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.RateLimit;
    using WorldFeed.Common.Web;
    using WorldFeed.Credentials.RateLimit;

    public class TweetinviCredentialsModule : ITweetinviModule
    {
        public void Initialize(ITweetinviContainer container)
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
