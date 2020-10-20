namespace Sharebook.Book.API.Infrastructure.Inject
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
    using Sharebook.Book.Client.Validators;
    using Sharebook.Book.Infrastructure.Inject;
    using Sharebook.Book.Models;
    using Sharebook.Book.Application.Parameters.ListsClient;
    using Sharebook.Post.API.Application.Validations;

    public class BookCoreModule : IBookModule
    {
        private static IBookContainer _container;

        public static IBookContainer TweetinviContainer => _container;

        public BookCoreModule(IBookContainer container)
        {
            _container = container;
        }

        public void Initialize(IBookContainer container)
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

            container.RegisterType<ITwitterResultFactory, TwitterResultFactory>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITweetinviJsonConverter, TweetinviJsonConverter>(RegistrationLifetime.InstancePerApplication);

            InitializeParameters(container);
            InitializeParametersValidators(container);
        }

        private void InitializeParameters(IBookContainer container)
        {
            // Base
            container.RegisterType<ICustomRequestParameters, CustomRequestParameters>();

            // Identifiers
            container.RegisterType<ITweetIdentifier, TweetIdentifier>();
            container.RegisterType<IUserIdentifier, UserIdentifier>();
            container.RegisterType<ITwitterListIdentifier, TwitterListIdentifier>();

            container.RegisterType<IGeoCode, GeoCode>();

            // Parameters
            container.RegisterType<IGetTweetsFromListParameters, GetTweetsFromListParameters>();
        }

        private static void InitializeParametersValidators(IBookContainer container)
        {
            container.RegisterType<IParametersValidator, ParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITwitterListsClientParametersValidator, TwitterListsClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterListsClientRequiredParametersValidator, TwitterListsClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUserQueryValidator, UserQueryValidator>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
