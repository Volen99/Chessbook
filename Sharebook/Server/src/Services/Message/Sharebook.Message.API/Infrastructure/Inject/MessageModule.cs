namespace Sharebook.Message.API.Infrastructure.Inject
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Client.Clients;
    using Sharebook.Message.Client;
    using Sharebook.Message.Client.Requesters;
    using Sharebook.Message.Infrastructure.Inject;

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
