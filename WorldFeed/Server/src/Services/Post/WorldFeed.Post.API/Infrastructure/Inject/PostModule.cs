namespace WorldFeed.Post.API.Infrastructure.Inject
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Post.API.Client;
    using WorldFeed.Post.API.Client.Clients;
    using WorldFeed.Post.API.Infrastructure.Inject.Contracts;
    using WorldFeed.Post.Client.Clients;
    using WorldFeed.Post.Client.Requesters;
    using WorldFeed.Post.Client.Tools;

    public class PostModule : IPostModule
    {
        public void Initialize(IPostContainer container)
        {
            // Register a singleton of the container, do not use InstancePerApplication
            container.RegisterInstance(typeof(IPostContainer), container);

            container.RegisterType<ITimelinesClient, TimelinesClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITimelinesRequester, TimelinesRequester>(RegistrationLifetime.InstancePerApplication);


            container.RegisterType<ITweetsClient, TweetsClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITweetsRequester, TweetsRequester>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IRawExecutors, RawExecutors>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterClientFactories, TwitterClientFactories>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IJsonClient, JsonClient>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
