namespace Sharebook.Post.API.Infrastructure.Inject
{
    using System;

    using Sharebook.Common.Exceptions;
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Models.Properties;
    using Sharebook.Common.Wrappers;
    using Sharebook.Logic.Helpers;
    using Sharebook.Logic.Wrapper;
    using Sharebook.Trend.API.Infrastructure.Inject.Contracts;

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
