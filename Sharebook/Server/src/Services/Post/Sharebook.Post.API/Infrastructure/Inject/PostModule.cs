namespace Sharebook.Post.API.Infrastructure.Inject
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Client.Clients;
    using Sharebook.Post.API.Client;
    using Sharebook.Post.API.Client.Clients;
    using Sharebook.Post.API.Infrastructure.Inject.Contracts;
    using Sharebook.Post.Client.Clients;
    using Sharebook.Post.Client.Requesters;
    using Sharebook.Post.Client.Tools;

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
