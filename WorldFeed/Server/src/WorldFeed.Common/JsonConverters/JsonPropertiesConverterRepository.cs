namespace WorldFeed.Common.JsonConverters
{
    using System.Collections.Generic;
    using System.Linq;
    using Newtonsoft.Json;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.DTO.Events;
    using WorldFeed.Common.DTO.Webhooks;
    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.Properties;
    using WorldFeed.Common.Models.TwitterEntities;
    using WorldFeed.Common.Models.TwitterEntities.ExtendedEntities;
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Entities;
    using WorldFeed.Common.Public.Models.Entities.ExtendedEntities;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Events;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;
    using WorldFeed.Common.Public.Models.RateLimits;
    using WorldFeed.Common.Upload;

    /// <summary>
    /// Repository of converters used to transform json into a collection of T
    /// </summary>
    public class JsonPropertiesConverterRepository
    {
        public static JsonConverter[] Converters { get; private set; }

        static JsonPropertiesConverterRepository()
        {
            Initialize();
        }

        private static void Initialize()
        {
            var converters = new List<JsonConverter>
            {
                new JsonInterfaceToObjectConverter<ITweetDTO, TweetDTO>(),
                new JsonInterfaceToObjectConverter<ITweetWithSearchMetadataDTO, TweetWithSearchMetadataDTO>(),
                new JsonInterfaceToObjectConverter<ITwitterListDTO, TwitterListDTO>(),
                new JsonInterfaceToObjectConverter<IOEmbedTweetDTO, OEmbedTweetDTO>(),
                new JsonInterfaceToObjectConverter<IUserDTO, UserDTO>(),
                new JsonInterfaceToObjectConverter<IUploadedMediaInfo, UploadedMediaInfo>(),
                new JsonInterfaceToObjectConverter<IUploadProcessingError, UploadProcessingError>(),

                new JsonInterfaceToObjectConverter<IRelationshipDetailsDTO, RelationshipDetailsDTO>(),
                new JsonInterfaceToObjectConverter<IRelationshipStateDTO, RelationshipStateDTO>(),

                new JsonInterfaceToObjectConverter<IAccountSettingsDTO, AccountSettingsDTO>(),
                new JsonInterfaceToObjectConverter<ILocation, Location>(),
                new JsonInterfaceToObjectConverter<IPlace, Place>(),

                new JsonInterfaceToObjectConverter<IUrlEntity, UrlEntity>(),
                new JsonInterfaceToObjectConverter<IHashtagEntity, HashtagEntity>(),
                new JsonInterfaceToObjectConverter<IMediaEntity, MediaEntity>(),
                new JsonInterfaceToObjectConverter<IMediaEntitySize, MediaEntitySize>(),
                new JsonInterfaceToObjectConverter<IUserMentionEntity, UserMentionEntity>(),
                new JsonInterfaceToObjectConverter<IDescriptionEntity, DescriptionEntity>(),
                new JsonInterfaceToObjectConverter<IWebsiteEntity, WebsiteEntity>(),
                new JsonInterfaceToObjectConverter<ISymbolEntity, SymbolEntity>(),

                new JsonInterfaceToObjectConverter<IUserEntities, UserEntities>(),

                new JsonInterfaceToObjectConverter<ITweetEntities, TweetEntitiesDTO>(),
                new JsonInterfaceToObjectConverter<IObjectEntities, ObjectEntitiesDTO>(),
                new JsonInterfaceToObjectConverter<IVideoEntityVariant, VideoEntityVariant>(),

                new JsonInterfaceToObjectConverter<IRelationshipDetails, RelationshipDetails>(),
                new JsonInterfaceToObjectConverter<IRelationshipState, RelationshipState>(),

                new JsonInterfaceToObjectConverter<IGetTrendsAtResult, GetTrendsAtResult>(),
                new JsonInterfaceToObjectConverter<ITrend, Trend>(),
                new JsonInterfaceToObjectConverter<ITrendLocation, TrendLocation>(),
                new JsonInterfaceToObjectConverter<IWoeIdLocation, WoeIdLocation>(),


                new JsonInterfaceToObjectConverter<IEndpointRateLimit, EndpointRateLimit>(),
                new JsonInterfaceToObjectConverter<ICredentialsRateLimits, CredentialsRateLimits>(),
                new JsonInterfaceToObjectConverter<ISavedSearchDTO, SavedSearchDTO>(),
                new JsonInterfaceToObjectConverter<ITwitterExceptionInfo, TwitterExceptionInfo>(),

                new JsonInterfaceToObjectConverter<ISearchResultsDTO, SearchResultsDTO>(),
                new JsonInterfaceToObjectConverter<ITwitterConfiguration, TwitterConfiguration>(),
                new JsonInterfaceToObjectConverter<ICategorySuggestion, CategorySuggestion>(),
                new JsonInterfaceToObjectConverter<IUrlEntity, UrlEntity>(),

                // JsonCoordinatesConverter is used only for Properties (with an s) and not Property
                // because Twitter does not provide the coordinates the same way if it is a list or
                // if it is a single argument.
                new JsonCoordinatesConverter(),

            new JsonInterfaceToObjectConverter<IQuickReplyOption, QuickReplyOption>(),
            new JsonInterfaceToObjectConverter<IQuickReplyDTO, QuickReplyDTO>(),
            new JsonInterfaceToObjectConverter<IApp, App>(),
            new JsonInterfaceToObjectConverter<IEventInitiatedViaDTO, EventInitiatedViaDTO>(),
            new JsonInterfaceToObjectConverter<IMessageDataDTO, MessageDataDTO>(),
            new JsonInterfaceToObjectConverter<IQuickReplyResponse, QuickReplyResponse>(),
            new JsonInterfaceToObjectConverter<IMessageCreateTargetDTO, MessageCreateTargetDTO>(),
            new JsonInterfaceToObjectConverter<IMessageEventDTO, MessageEventDTO>(),
            new JsonInterfaceToObjectConverter<IMessageCreateDTO, MessageCreateDTO>(),
            new JsonInterfaceToObjectConverter<IMessageEventWithAppDTO, MessageEventWithAppDTO>(),
            new JsonInterfaceToObjectConverter<IGetMessageDTO, GetMessageDTO>(),
            new JsonInterfaceToObjectConverter<ICreateMessageDTO, CreateMessageDTO>(),
            new JsonInterfaceToObjectConverter<IAttachmentDTO, AttachmentDTO>(),
            new JsonInterfaceToObjectConverter<IMessageEntities, MessageEntitiesDTO>(),

            new JsonInterfaceToObjectConverter<IUploadInitModel, UploadInitModel>(),

            // Webhooks
            new JsonInterfaceToObjectConverter<IWebhookDTO, WebhookDTO>(),
            new JsonInterfaceToObjectConverter<IWebhookEnvironmentDTO, WebhookEnvironmentDTO>(),
            new JsonInterfaceToObjectConverter<IGetAccountActivityWebhookEnvironmentsResultDTO, GetAccountActivityWebhookEnvironmentsResultDTO>(),
            new JsonInterfaceToObjectConverter<IWebhookSubscriptionsCount, WebhookSubscriptionsCountDTO>(),
            new JsonInterfaceToObjectConverter<IWebhookSubscriptionDTO, WebhookSubscriptionDTO>(),
            new JsonInterfaceToObjectConverter<IWebhookEnvironmentSubscriptionsDTO, WebhookEnvironmentSubscriptionsDTO>(),


             // Enums (that have JSON serialization implemented)
                new JsonEnumStringConverter<EventType>(),
                new JsonEnumStringConverter<QuickReplyType>(),
                new JsonEnumStringConverter<AttachmentType>(),
            };

            Converters = converters.ToArray();
        }

        public static void TryOverride<TInterface, TTo>() where TTo : TInterface
        {
            var converter = Converters.OfType<IJsonInterfaceToObjectConverter>().JustOneOrDefault(x => x.InterfaceType == typeof(TInterface));

            if (converter != null)
            {
                var converters = Converters.ToList();
                converters.Remove((JsonConverter)converter);
                converters.Add(new JsonInterfaceToObjectConverter<TInterface, TTo>());
                Converters = converters.ToArray();
            }
        }
    }
}
