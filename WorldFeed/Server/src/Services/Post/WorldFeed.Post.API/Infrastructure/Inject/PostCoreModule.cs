namespace WorldFeed.Post.API.Infrastructure.Inject
{
    using System;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Common.Web;
    using WorldFeed.Post.API.Application.Validations;
    using WorldFeed.Post.API.Application.Web;
    using WorldFeed.Post.API.Events;
    using WorldFeed.Post.API.Exceptions;
    using WorldFeed.Post.API.Infrastructure.Inject.Contracts;
    using WorldFeed.Post.API.Iterators;
    using WorldFeed.Post.API.Json;
    using WorldFeed.Post.Application.Parameters.TimelineClient;
    using WorldFeed.Post.Client.Validators;

    public class PostCoreModule : IPostModule
    {
        private static IPostContainer _container;

        public PostCoreModule(IPostContainer container)     // new UploadCoreModule(this)
        {
            _container = container;
        }

        public static IPostContainer UploadContainer => _container;

        public void Initialize(IPostContainer container)
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

            container.RegisterType<IPostJsonConverter, PostJsonConverter>(RegistrationLifetime.InstancePerApplication);

            InitializeParameters(container);
            InitializeParametersValidators(container);
        }

        private void InitializeParameters(IPostContainer container)
        {
            // Base
            container.RegisterType<ICustomRequestParameters, CustomRequestParameters>();

            // Identifiers
            container.RegisterType<ITweetIdentifier, TweetIdentifier>();
            container.RegisterType<IUserIdentifier, UserIdentifier>();

            container.RegisterType<IGeoCode, GeoCode>();

            // Timeline
            container.RegisterType<IGetHomeTimelineParameters, GetHomeTimelineParameters>();
            container.RegisterType<IGetMentionsTimelineParameters, GetMentionsTimelineParameters>();
            container.RegisterType<IGetRetweetsOfMeTimelineParameters, GetRetweetsOfMeTimelineParameters>();
        }

        private static void InitializeParametersValidators(IPostContainer container)
        {
            container.RegisterType<IParametersValidator, ParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITimelineClientParametersValidator, TimelineClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITimelineClientRequiredParametersValidator, TimelineClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITweetsClientParametersValidator, TweetsClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITweetsClientRequiredParametersValidator, TweetsClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUserQueryValidator, UserQueryValidator>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
