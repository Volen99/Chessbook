namespace WorldFeed.Logic
{
    using WorldFeed.Common.DTO;
    using WorldFeed.Common.DTO.Events;
    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.Properties;
    using WorldFeed.Common.Models.TwitterEntities;
    using WorldFeed.Common.Public.Exceptions;
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Entities;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Events;
    using WorldFeed.Common.Wrappers;
    using WorldFeed.Logic.Exceptions;
    using WorldFeed.Logic.Helpers;
    using WorldFeed.Logic.Wrapper;

    public class TweetinviLogicModule : ITweetinviModule
    {
        public void Initialize(ITweetinviContainer container)
        {
            InitializeTwitterModels(container);
            InitializeTweetinviModels(container);

            InitializeDTOs(container);
            InitializeHelpers(container);
            InitializeWrappers(container);
            InitializeExceptionHandler(container);
            InitializeSerialization(container);
        }

        // Initialize Models that are not objects coming from Twitter
        private void InitializeTweetinviModels(ITweetinviContainer container)
        {
            container.RegisterType<IMedia, Media>();
            container.RegisterType<ISearchResults, SearchResults>();
        }

        // Initialize Models that are Twitter objects
        private void InitializeTwitterModels(ITweetinviContainer container)
        {
            container.RegisterType<ITweet, Tweet>();
            container.RegisterType<ITweetWithSearchMetadata, TweetWithSearchMetadata>();
            container.RegisterType<IOEmbedTweet, OEmbedTweet>();

            container.RegisterType<IUser, User>();
            container.RegisterType<IAuthenticatedUser, AuthenticatedUser>();

            container.RegisterType<ITwitterList, TwitterList>();

            container.RegisterType<ICoordinates, CoordinatesDTO>();
            container.RegisterType<ILocation, Location>();

            container.RegisterType<IAccountSettings, AccountSettings>();
            container.RegisterType<IMessage, Message>();
            container.RegisterType<IMention, Mention>();
            container.RegisterType<IRelationshipDetails, RelationshipDetails>();
            container.RegisterType<IRelationshipState, RelationshipState>();
            container.RegisterType<ISavedSearch, SavedSearch>();
        }

        private void InitializeDTOs(ITweetinviContainer container)
        {
            container.RegisterType<ITweetDTO, TweetDTO>();
            container.RegisterType<ITwitterListDTO, TwitterListDTO>();
            container.RegisterType<IUserDTO, UserDTO>();
            container.RegisterType<IRelationshipDetailsDTO, RelationshipDetailsDTO>();

            container.RegisterType<ITweetEntities, TweetEntitiesDTO>();
            container.RegisterType<IObjectEntities, ObjectEntitiesDTO>();
            container.RegisterType<IUserEntities, UserEntities>();

            container.RegisterType<IUrlEntity, UrlEntity>();
            container.RegisterType<IHashtagEntity, HashtagEntity>();
            container.RegisterType<IDescriptionEntity, DescriptionEntity>();
            container.RegisterType<ISymbolEntity, SymbolEntity>();

            container.RegisterType<IQuickReplyOption, QuickReplyOption>();
            container.RegisterType<IQuickReplyDTO, QuickReplyDTO>();
            container.RegisterType<IApp, App>();
            container.RegisterType<IEventInitiatedViaDTO, EventInitiatedViaDTO>();
            container.RegisterType<IMessageDataDTO, MessageDataDTO>();
            container.RegisterType<IQuickReplyResponse, QuickReplyResponse>();
            container.RegisterType<IMessageCreateTargetDTO, MessageCreateTargetDTO>();
            container.RegisterType<IMessageEventDTO, MessageEventDTO>();
            container.RegisterType<IMessageCreateDTO, MessageCreateDTO>();
            container.RegisterType<IGetMessageDTO, GetMessageDTO>();
            container.RegisterType<ICreateMessageDTO, CreateMessageDTO>();
            container.RegisterType<IAttachmentDTO, AttachmentDTO>();
            container.RegisterType<IMessageEntities, MessageEntitiesDTO>();
            container.RegisterType<IMediaEntity, MediaEntity>();
        }

        private void InitializeHelpers(ITweetinviContainer container)
        {
            container.RegisterType<ITwitterStringFormatter, TwitterStringFormatter>();
        }

        private void InitializeWrappers(ITweetinviContainer container)
        {
            container.RegisterType<IJObjectStaticWrapper, JObjectStaticWrapper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IJsonConvertWrapper, JsonConvertWrapper>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeExceptionHandler(ITweetinviContainer container)
        {
            container.RegisterType<IWebExceptionInfoExtractor, WebExceptionInfoExtractor>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterTimeoutException, TwitterTimeoutException>();
            container.RegisterType<ITwitterExceptionInfo, TwitterExceptionInfo>();
        }

        private void InitializeSerialization(ITweetinviContainer container)
        {
            container.RegisterType<IJsonPropertyConverterRepository, JsonPropertyConverterRepository>();
            container.RegisterType<IJsonObjectConverter, JsonObjectConverter>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
