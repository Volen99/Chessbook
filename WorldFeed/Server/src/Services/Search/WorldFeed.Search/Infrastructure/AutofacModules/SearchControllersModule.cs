namespace WorldFeed.Search.Infrastructure.AutofacModules
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Search.Application.QueryExecutors;
    using WorldFeed.Search.Application.QueryGenerators;
    using WorldFeed.Search.Controllers;
    using WorldFeed.Search.Infrastructure.Inject.Contracts;

    public class SearchControllersModule : ISearchModule
    {
        public void Initialize(ISearchContainer container)
        {
            InitializeControllers(container);
            InitializeQueryExecutors(container);
            InitializeQueryGenerators(container);
        }

        private void InitializeControllers(ISearchContainer container)
        {
            container.RegisterType<ISearchController, SearchController>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeQueryExecutors(ISearchContainer container)
        {
            container.RegisterType<ISearchQueryExecutor, SearchQueryExecutor>();
        }

        private void InitializeQueryGenerators(ISearchContainer container)
        {
            container.RegisterType<ISearchQueryGenerator, SearchQueryGenerator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ISearchQueryParameterGenerator, SearchQueryParameterGenerator>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
