namespace Sharebook.Book.Infrastructure.Inject
{
    using Sharebook.Book.Client.Clients;
    using Sharebook.Book.Client.Requesters;
    using Sharebook.Client.Clients;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Client.Clients;

    public class BookModule : IBookModule
    {
        public void Initialize(IBookContainer container)
        {
            // Register a singleton of the container, do not use InstancePerApplication
            container.RegisterInstance(typeof(IBookContainer), container);

            container.RegisterType<IListsClient, ListsClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterListsRequester, TwitterListsRequester>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITwitterClientFactories, TwitterClientFactories>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IJsonClient, JsonClient>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
