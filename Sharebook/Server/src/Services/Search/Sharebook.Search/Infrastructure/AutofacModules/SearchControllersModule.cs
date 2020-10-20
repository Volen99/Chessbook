namespace Sharebook.Search.Infrastructure.AutofacModules
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Search.Application.QueryExecutors;
    using Sharebook.Search.Application.QueryGenerators;
    using Sharebook.Search.Controllers;
    using Sharebook.Search.Infrastructure.Inject.Contracts;

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
