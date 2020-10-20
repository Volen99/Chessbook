namespace Sharebook.Book.API.Infrastructure.Inject
{
    using Sharebook.Book.DTO;
    using Sharebook.Book.Infrastructure.Inject;
    using Sharebook.Book.Models;
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

    public class BookLogicModule : IBookModule
    {
        public void Initialize(IBookContainer container)
        {
            InitializeTwitterModels(container);

            InitializeDTOs(container);
            InitializeHelpers(container);
            InitializeWrappers(container);
            InitializeExceptionHandler(container);
            InitializeSerialization(container);
        }

        // Initialize Models that are Twitter objects
        private void InitializeTwitterModels(IBookContainer container)
        {
            container.RegisterType<ITwitterList, TwitterList>();

            container.RegisterType<ICoordinates, CoordinatesDTO>();
            container.RegisterType<ILocation, Location>();
        }

        private void InitializeDTOs(IBookContainer container)
        {
            container.RegisterType<ITwitterListDTO, TwitterListDTO>();
        }

        private void InitializeHelpers(IBookContainer container)
        {
            container.RegisterType<ITwitterStringFormatter, TwitterStringFormatter>();
        }

        private void InitializeWrappers(IBookContainer container)
        {
            container.RegisterType<IJObjectStaticWrapper, JObjectStaticWrapper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IJsonConvertWrapper, JsonConvertWrapper>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeExceptionHandler(IBookContainer container)
        {
            container.RegisterType<IWebExceptionInfoExtractor, WebExceptionInfoExtractor>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterTimeoutException, TwitterTimeoutException>();
            container.RegisterType<ITwitterExceptionInfo, TwitterExceptionInfo>();
        }

        private void InitializeSerialization(IBookContainer container)
        {
            container.RegisterType<IJsonPropertyConverterRepository, JsonPropertyConverterRepository>();
            container.RegisterType<IJsonObjectConverter, JsonObjectConverter>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
