namespace WorldFeed.Message.API.Infrastructure.Inject
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Message.Client;
    using WorldFeed.Message.Client.Requesters;
    using WorldFeed.Message.Infrastructure.Inject;

    public class MessageModule : IMessageModule
    {
        public void Initialize(IMessageContainer container)
        {
            // Register a singleton of the container, do not use InstancePerApplication
            container.RegisterInstance(typeof(IMessageContainer), container);


            container.RegisterType<IRateLimitsClient, RateLimitsClient>(RegistrationLifetime.InstancePerApplication);


            container.RegisterType<IMessagesClient, MessagesClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IMessageRequester, MessageRequester>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IRawExecutors, RawExecutors>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterClientFactories, TwitterClientFactories>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IJsonClient, JsonClient>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
