namespace Sharebook.Post.API.Infrastructure.Inject
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Client.Clients;
    using Sharebook.Trend.API.Infrastructure.Inject.Contracts;
    using Sharebook.Trend.Client.Clients;
    using Sharebook.Trend.Client.Requesters;
    using Sharebook.Trend.Client.Tools;

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
