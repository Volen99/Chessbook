namespace WorldFeed.Book.Infrastructure.Inject
{
    using WorldFeed.Book.Client.Clients;
    using WorldFeed.Book.Client.Requesters;
    using WorldFeed.Client.Clients;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Public.Client.Clients;

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
