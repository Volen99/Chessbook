namespace Sharebook.Message.API.Infrastructure.Inject
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
    using Sharebook.Message.API.Validations;
    using Sharebook.Message.Application.Parameters.MessageClient;
    using Sharebook.Message.Client.Validators;
    using Sharebook.Message.Infrastructure.Inject;

    public class MessageCoreModule : IMessageModule
    {
        private static IMessageContainer _container;

        public MessageCoreModule(IMessageContainer container)
        {
            _container = container;
        }

        public static IMessageContainer TweetinviContainer => _container;

        public void Initialize(IMessageContainer container)
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

        private void InitializeParameters(IMessageContainer container)
        {
            // Base
            container.RegisterType<ICustomRequestParameters, CustomRequestParameters>();

            // Identifiers
            container.RegisterType<ITweetIdentifier, TweetIdentifier>();
            container.RegisterType<IUserIdentifier, UserIdentifier>();

            container.RegisterType<IGeoCode, GeoCode>();

            // Message
            container.RegisterType<IPublishMessageParameters, PublishMessageParameters>();
        }

        private static void InitializeParametersValidators(IMessageContainer container)
        {
            container.RegisterType<IParametersValidator, ParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IMessagesClientParametersValidator, MessagesClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IMessagesClientRequiredParametersValidator, MessagesClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUserQueryValidator, UserQueryValidator>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
