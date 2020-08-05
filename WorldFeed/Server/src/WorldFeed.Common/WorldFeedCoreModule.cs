namespace WorldFeed.Common
{
    using System;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Json;
    using WorldFeed.Common.Public.Exceptions;
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Common.Public.Parameters.AccountSettingsClient;
    using WorldFeed.Common.Public.Parameters.ListsClient;
    using WorldFeed.Common.Public.Parameters.MessageClient;
    using WorldFeed.Common.Public.Parameters.Search;
    using WorldFeed.Common.Public.Parameters.TimelineClient;
    using WorldFeed.Common.Public.Parameters.TweetsClient;
    using WorldFeed.Common.Upload;
    using WorldFeed.Common.Web;

    public class TweetinviCoreModule : ITweetinviModule
    {
        private static ITweetinviContainer _container;

        public TweetinviCoreModule(ITweetinviContainer container)
        {
            _container = container;
        }

        public static ITweetinviContainer TweetinviContainer => _container;

        public void Initialize(ITweetinviContainer container)
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

        private void InitializeParameters(ITweetinviContainer container)
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

            // Account
            container.RegisterType<IUpdateProfileBannerParameters, UpdateProfileBannerParameters>();

            // Search
            container.RegisterType<ISearchTweetsParameters, SearchTweetsParameters>();
            container.RegisterType<ISearchUsersParameters, SearchUsersParameters>();

            // Tweet
            container.RegisterType<IPublishTweetParameters, PublishTweetParameters>();

            // Timeline
            container.RegisterType<IGetHomeTimelineParameters, GetHomeTimelineParameters>();
            container.RegisterType<IGetMentionsTimelineParameters, GetMentionsTimelineParameters>();
            container.RegisterType<IGetRetweetsOfMeTimelineParameters, GetRetweetsOfMeTimelineParameters>();

            // Message
            container.RegisterType<IPublishMessageParameters, PublishMessageParameters>();

            // Upload
            container.RegisterType<IChunkUploadInitParameters, ChunkUploadInitParameters>();
            container.RegisterType<IChunkUploadAppendParameters, ChunkUploadAppendParameters>();
        }

        private static void InitializeParametersValidators(ITweetinviContainer container)
        {
            container.RegisterType<IParametersValidator, ParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IAccountActivityClientParametersValidator, AccountActivityClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IAccountActivityClientRequiredParametersValidator, AccountActivityClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IAccountSettingsClientParametersValidator, AccountSettingsClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IAccountSettingsClientRequiredParametersValidator, AccountSettingsClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IAuthClientParametersValidator, AuthClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IAuthClientRequiredParametersValidator, AuthClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IHelpClientParametersValidator, HelpClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IHelpClientRequiredParametersValidator, HelpClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITwitterListsClientParametersValidator, TwitterListsClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterListsClientRequiredParametersValidator, TwitterListsClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IMessagesClientParametersValidator, MessagesClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IMessagesClientRequiredParametersValidator, MessagesClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ISearchClientParametersValidator, SearchClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ISearchClientRequiredParametersValidator, SearchClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITimelineClientParametersValidator, TimelineClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITimelineClientRequiredParametersValidator, TimelineClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITrendsClientParametersValidator, TrendsClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITrendsClientRequiredParametersValidator, TrendsClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITweetsClientParametersValidator, TweetsClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITweetsClientRequiredParametersValidator, TweetsClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUploadClientParametersValidator, UploadClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IUploadClientRequiredParametersValidator, UploadClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUsersClientParametersValidator, UsersClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IUsersClientRequiredParametersValidator, UsersClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUserQueryValidator, UserQueryValidator>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
