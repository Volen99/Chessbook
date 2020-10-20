namespace Sharebook.Post.API.Infrastructure.Inject
{
    using System;

    using Sharebook.Common.Events;
    using Sharebook.Common.Exceptions;
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Parameters;
    using Sharebook.Common.Web;
    using Sharebook.Trend.API.Infrastructure.Inject.Contracts;
    using Sharebook.Trend.Client.Validators;

    public class TrendCoreModule : ITrendModule
    {
        private static ITrendContainer _container;
        public static ITrendContainer TweetinviContainer => _container;

        public TrendCoreModule(ITrendContainer container)
        {
            _container = container;
        }

        public void Initialize(ITrendContainer container)
        {
            if (container != _container)
            {
                throw new InvalidOperationException("This container can only be initialized with the main container");
            }

            container.RegisterGeneric(typeof(IFactory<>), typeof(Factory<>));
            container.RegisterType<ITaskDelayer, TaskDelayer>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IAttributeHelper, AttributeHelper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IHttpUtility, HttpUtility>(RegistrationLifetime.InstancePerApplication);
            container.RegisterGeneric(typeof(IWeakEvent<>), typeof(WeakEvent<>));
            container.RegisterInstance(typeof(ITweetinviEvents), new TweetinviGlobalEvents());
            container.RegisterType<ITwitterClientEvents, TwitterClientEvents>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ISingleAggregateExceptionThrower, SingleAggregateExceptionThrower>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterExceptionFactory, TwitterExceptionFactory>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterException, TwitterException>();
            container.RegisterType<IPagedOperationsHelper, PagedOperationsHelper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<JsonContentFactory, JsonContentFactory>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IMultiLevelCursorIteratorFactory, MultiLevelCursorIteratorFactory>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IPageCursorIteratorFactories, PageCursorIteratorFactories>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterResultFactory, TwitterResultFactory>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITweetinviJsonConverter, TweetinviJsonConverter>(RegistrationLifetime.InstancePerApplication);

            InitializeParameters(container);
            InitializeParametersValidators(container);
        }

        private void InitializeParameters(ITrendContainer container)
        {
            // Base
            container.RegisterType<ICustomRequestParameters, CustomRequestParameters>();
        }

        private static void InitializeParametersValidators(ITrendContainer container)
        {
            container.RegisterType<IParametersValidator, ParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITrendsClientParametersValidator, TrendsClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITrendsClientRequiredParametersValidator, TrendsClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUserQueryValidator, UserQueryValidator>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
