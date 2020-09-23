namespace WorldFeed.Post.API.Infrastructure.Inject
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Trend.API.Infrastructure.Inject.Contracts;
    using WorldFeed.Trend.Client.Clients;
    using WorldFeed.Trend.Client.Requesters;
    using WorldFeed.Trend.Client.Tools;

    public class TrendModule : ITrendModule
    {
        public void Initialize(ITrendContainer container)
        {
            // Register a singleton of the container, do not use InstancePerApplication
            container.RegisterInstance(typeof(ITrendContainer), container);

            container.RegisterType<ITrendsClient, TrendsClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITrendsRequester, TrendsRequester>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IRawExecutors, RawExecutors>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterClientFactories, TwitterClientFactories>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IJsonClient, JsonClient>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
