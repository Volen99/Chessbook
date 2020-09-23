namespace WorldFeed.Post.API.Infrastructure.Inject
{
    using System;

    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Models.Properties;
    using WorldFeed.Common.Wrappers;
    using WorldFeed.Logic.Helpers;
    using WorldFeed.Logic.Wrapper;
    using WorldFeed.Trend.API.Infrastructure.Inject.Contracts;

    public class TrendLogicModule : ITrendModule
    {
        public void Initialize(ITrendContainer container)
        {
            InitializeHelpers(container);
            InitializeWrappers(container);
            InitializeExceptionHandler(container);
            InitializeSerialization(container);
        }

        private void InitializeHelpers(ITrendContainer container)
        {
            container.RegisterType<ITwitterStringFormatter, TwitterStringFormatter>();
        }

        private void InitializeWrappers(ITrendContainer container)
        {
            container.RegisterType<IJObjectStaticWrapper, JObjectStaticWrapper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IJsonConvertWrapper, JsonConvertWrapper>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeExceptionHandler(ITrendContainer container)
        {
            container.RegisterType<IWebExceptionInfoExtractor, WebExceptionInfoExtractor>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterTimeoutException, TwitterTimeoutException>();
            container.RegisterType<ITwitterExceptionInfo, TwitterExceptionInfo>();
        }

        private void InitializeSerialization(ITrendContainer container)
        {
            container.RegisterType<IJsonPropertyConverterRepository, JsonPropertyConverterRepository>();
            container.RegisterType<IJsonObjectConverter, JsonObjectConverter>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
