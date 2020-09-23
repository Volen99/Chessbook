namespace WorldFeed.Search.Infrastructure.Inject
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Search.Client.Clients;
    using WorldFeed.Search.Client.Requesters;
    using WorldFeed.Search.Infrastructure.Inject.Contracts;

    public class SearchModule : ISearchModule
    {
        public void Initialize(ISearchContainer container)
        {
            // Register a singleton of the container, do not use InstancePerApplication
            container.RegisterInstance(typeof(ISearchContainer), container);

            container.RegisterType<ISearchClient, SearchClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ISearchRequester, SearchRequester>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
