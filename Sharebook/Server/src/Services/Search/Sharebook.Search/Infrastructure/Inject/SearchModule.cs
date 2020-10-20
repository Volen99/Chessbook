namespace Sharebook.Search.Infrastructure.Inject
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Search.Client.Clients;
    using Sharebook.Search.Client.Requesters;
    using Sharebook.Search.Infrastructure.Inject.Contracts;

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
