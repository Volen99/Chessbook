namespace Sharebook.Post.API.Infrastructure.Inject
{
    using System;

    using Sharebook.Common.DTO;
    using Sharebook.Common.Exceptions;
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Models.Properties;
    using Sharebook.Common.Public.Models;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Wrappers;
    using Sharebook.Logic.Helpers;
    using Sharebook.Logic.Wrapper;
    using Sharebook.Search.Infrastructure.Inject.Contracts;
    using Sharebook.Search.Models;

    public class SearchLogicModule : ISearchModule
    {
        public void Initialize(ISearchContainer container)
        {
            InitializeTwitterModels(container);

            InitializeHelpers(container);
            InitializeWrappers(container);
            InitializeExceptionHandler(container);
            InitializeSerialization(container);
        }

        // Initialize Models that are Twitter objects
        private void InitializeTwitterModels(ISearchContainer container)
        {
            container.RegisterType<ICoordinates, CoordinatesDTO>();
            container.RegisterType<ILocation, Location>();

            container.RegisterType<ISavedSearch, SavedSearch>();
        }

        private void InitializeHelpers(ISearchContainer container)
        {
            container.RegisterType<ITwitterStringFormatter, TwitterStringFormatter>();
        }

        private void InitializeWrappers(ISearchContainer container)
        {
            container.RegisterType<IJObjectStaticWrapper, JObjectStaticWrapper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IJsonConvertWrapper, JsonConvertWrapper>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeExceptionHandler(ISearchContainer container)
        {
            container.RegisterType<IWebExceptionInfoExtractor, WebExceptionInfoExtractor>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterTimeoutException, TwitterTimeoutException>();
            container.RegisterType<ITwitterExceptionInfo, TwitterExceptionInfo>();
        }

        private void InitializeSerialization(ISearchContainer container)
        {
            container.RegisterType<IJsonPropertyConverterRepository, JsonPropertyConverterRepository>();
            container.RegisterType<IJsonObjectConverter, JsonObjectConverter>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
