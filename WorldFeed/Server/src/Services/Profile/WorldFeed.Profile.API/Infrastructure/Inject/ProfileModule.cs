namespace WorldFeed.Profile.Infrastructure.Inject
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Profile.Client;

    public class ProfileModule : IProfileModule
    {
        public void Initialize(IProfileContainer container)
        {
            // Register a singleton of the container, do not use InstancePerApplication
            container.RegisterInstance(typeof(IProfileContainer), container);

            container.RegisterType<IExecuteClient, ExecuteClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IExecuteRequester, ExecuteRequester>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IRateLimitsClient, RateLimitsClient>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IRawExecutors, RawExecutors>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterClientFactories, TwitterClientFactories>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IJsonClient, JsonClient>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
