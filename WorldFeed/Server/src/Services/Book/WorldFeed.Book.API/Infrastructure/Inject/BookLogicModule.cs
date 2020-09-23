namespace WorldFeed.Book.API.Infrastructure.Inject
{
    using WorldFeed.Book.DTO;
    using WorldFeed.Book.Infrastructure.Inject;
    using WorldFeed.Book.Models;
    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Models.Properties;
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Wrappers;
    using WorldFeed.Logic.Helpers;
    using WorldFeed.Logic.Wrapper;

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
