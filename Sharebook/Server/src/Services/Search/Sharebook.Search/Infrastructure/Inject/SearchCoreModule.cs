namespace Sharebook.Post.API.Infrastructure.Inject
{
    using System;

    using Sharebook.Common.Events;
    using Sharebook.Common.Exceptions;
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Models;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Parameters;
    using Sharebook.Common.Web;
    using Sharebook.Search.Application.Parameters;
    using Sharebook.Search.Client.Validators;
    using Sharebook.Search.Infrastructure.Inject.Contracts;

    public class SearchCoreModule : ISearchModule
    {
        private static ISearchContainer _container;

        public static ISearchContainer TweetinviContainer => _container;

        public SearchCoreModule(ISearchContainer container)
        {
            _container = container;
        }

        public void Initialize(ISearchContainer container)
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

        private void InitializeParameters(ISearchContainer container)
        {
            // Base
            container.RegisterType<ICustomRequestParameters, CustomRequestParameters>();

            // Identifiers
            container.RegisterType<ITweetIdentifier, TweetIdentifier>();
            container.RegisterType<IUserIdentifier, UserIdentifier>();

            container.RegisterType<IGeoCode, GeoCode>();

            // Search
            container.RegisterType<ISearchTweetsParameters, SearchTweetsParameters>();
            container.RegisterType<ISearchUsersParameters, SearchUsersParameters>();
        }

        private static void InitializeParametersValidators(ISearchContainer container)
        {
            container.RegisterType<ISearchClientParametersValidator, SearchClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ISearchClientRequiredParametersValidator, SearchClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUserQueryValidator, UserQueryValidator>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
