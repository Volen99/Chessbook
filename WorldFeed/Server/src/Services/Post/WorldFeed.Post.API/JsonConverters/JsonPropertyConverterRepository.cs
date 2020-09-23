namespace WorldFeed.Post.API.JsonConverters
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Post.Domain.AggregatesModel.PostAggregate.Entities;
    using WorldFeed.Post.Domain.AggregatesModel.PostAggregate.Entities.ExtendedEntities;
    using WorldFeed.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities;
    using WorldFeed.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities.ExtendedEntities;
    using WorldFeed.Post.Domain.AggregatesModel.TweetAggregate.Properties;
    using WorldFeed.Post.DTO;

    /// <summary>
    /// Repository of converters used to transform json into a specific type T.
    /// It should be used as a Field attribute (e.g. [JsonConverter(typeof(JsonPropertyConverterRepository))])
    /// </summary>
    public class JsonPropertyConverterRepository : JsonConverter, IJsonPropertyConverterRepository
    {
        public static readonly Dictionary<Type, JsonConverter> JsonConverters;

        static JsonPropertyConverterRepository()
        {
            JsonConverters = new Dictionary<Type, JsonConverter>();

            IntializeClassicalTypesConverters();
            InitializeTweetinviObjectConverters();
            InitializeTweetinviInterfacesConverters();
        }

        private static void IntializeClassicalTypesConverters()
        {
            var nullableBoolConverter = new JsonTwitterNullableConverter<bool>();
            var nullableLongConverter = new JsonTwitterNullableConverter<long>();
            var nullableIntegerConverter = new JsonTwitterNullableConverter<int>();
            var nullableDoubleConverter = new JsonTwitterNullableConverter<double>();
            var dateTimeConverter = new JsonTwitterDateTimeConverter();

            JsonConverters.Add(typeof(bool), nullableBoolConverter);
            JsonConverters.Add(typeof(long), nullableLongConverter);
            JsonConverters.Add(typeof(long?), nullableLongConverter);
            JsonConverters.Add(typeof(int), nullableIntegerConverter);
            JsonConverters.Add(typeof(double), nullableDoubleConverter);
            JsonConverters.Add(typeof(DateTime), dateTimeConverter);
        }

        private static void InitializeTweetinviObjectConverters()
        {
            var privacyModeConverter = new JsonPrivacyModeConverter();
            var coordinatesConverter = new JsonInterfaceToObjectConverter<ICoordinates, CoordinatesDTO>();
            var languageConverter = new JsonLanguageConverter();
            var eventTypeConverter = new JsonEnumStringConverter<EventType>();

            JsonConverters.Add(typeof(PrivacyMode), privacyModeConverter);
            JsonConverters.Add(typeof(ICoordinates), coordinatesConverter);
            JsonConverters.Add(typeof(Language), languageConverter);
            JsonConverters.Add(typeof(Language?), languageConverter);
            JsonConverters.Add(typeof(EventType), eventTypeConverter);
        }

        private static void InitializeTweetinviInterfacesConverters()
        {
            var userDTOConverter = new JsonInterfaceToObjectConverter<IUserDTO, UserDTO>();
            var userIdentifierConverter = new JsonInterfaceToObjectConverter<IUserIdentifier, UserIdentifierDTO>();
            var tweetConverter = new JsonInterfaceToObjectConverter<IPostDTO, PostDTO>();
            var extendedTweetDTOConverter = new JsonInterfaceToObjectConverter<IExtendedTweet, ExtendedTweet>();
            var tweetIdentifierConverter = new JsonInterfaceToObjectConverter<ITweetIdentifier, TweetIdentifierDTO>();
            var oembedTweetConverter = new JsonInterfaceToObjectConverter<IOEmbedTweetDTO, OEmbedTweetDTO>();
            var geoConverter = new JsonInterfaceToObjectConverter<IGeo, Geo>();
            var placeConverter = new JsonInterfaceToObjectConverter<IPlace, Place>();

            JsonConverters.Add(typeof(IUserDTO), userDTOConverter);
            JsonConverters.Add(typeof(IUserIdentifier), userIdentifierConverter);
            JsonConverters.Add(typeof(IPostDTO), tweetConverter);
            JsonConverters.Add(typeof(IExtendedTweet), extendedTweetDTOConverter);
            JsonConverters.Add(typeof(ITweetIdentifier), tweetIdentifierConverter);
            JsonConverters.Add(typeof(IOEmbedTweetDTO), oembedTweetConverter);

            JsonConverters.Add(typeof(IGeo), geoConverter);
            JsonConverters.Add(typeof(IPlace), placeConverter);
        }

        private static void InitializeEntitiesConverters()
        {
            var hashtagEntityConverter = new JsonInterfaceToObjectConverter<IHashtagEntity, HashtagEntity>();
            var urlEntityConverter = new JsonInterfaceToObjectConverter<IUrlEntity, UrlEntity>();
            var mediaEntityConverter = new JsonInterfaceToObjectConverter<IMediaEntity, MediaEntity>();
            var mediaEntitySizeConverter = new JsonInterfaceToObjectConverter<IMediaEntitySize, MediaEntitySize>();
            var descriptionEntityConverter = new JsonInterfaceToObjectConverter<IDescriptionEntity, DescriptionEntity>();
            var websiteEntityConverter = new JsonInterfaceToObjectConverter<IWebsiteEntity, WebsiteEntity>();

            var userEntitiesConverter = new JsonInterfaceToObjectConverter<IUserEntities, UserEntities>();
            var tweetEntitiesConverter = new JsonInterfaceToObjectConverter<ITweetEntities, TweetEntitiesDTO>();
            var objectEntitiesConverter = new JsonInterfaceToObjectConverter<IObjectEntities, ObjectEntitiesDTO>();

            JsonConverters.Add(typeof(IHashtagEntity), hashtagEntityConverter);
            JsonConverters.Add(typeof(IUrlEntity), urlEntityConverter);
            JsonConverters.Add(typeof(IMediaEntity), mediaEntityConverter);
            JsonConverters.Add(typeof(IMediaEntitySize), mediaEntitySizeConverter);
            JsonConverters.Add(typeof(IDescriptionEntity), descriptionEntityConverter);
            JsonConverters.Add(typeof(IWebsiteEntity), websiteEntityConverter);

            JsonConverters.Add(typeof(IUserEntities), userEntitiesConverter);
            JsonConverters.Add(typeof(ITweetEntities), tweetEntitiesConverter);
            JsonConverters.Add(typeof(IObjectEntities), objectEntitiesConverter);

            // Extended Entities
            var videoEntityVariantConverter = new JsonInterfaceToObjectConverter<IVideoEntityVariant, VideoEntityVariant>();
            var videoInformationEntityConverter = new JsonInterfaceToObjectConverter<IVideoInformationEntity, VideoInformationEntity>();

            JsonConverters.Add(typeof(IVideoEntityVariant), videoEntityVariantConverter);
            JsonConverters.Add(typeof(IVideoInformationEntity), videoInformationEntityConverter);
        }

        private static readonly object _convertersLocker = new object();
        public static void TryOverride<TInterface, TTo>() where TTo : TInterface
        {
            lock (_convertersLocker)
            {
                var jsonInterfaceToObjectConverter = JsonConverters.Where(x => x.Value is IJsonInterfaceToObjectConverter);
                var matchingConverter = jsonInterfaceToObjectConverter.Where(x => ((IJsonInterfaceToObjectConverter)x.Value).InterfaceType == typeof(TInterface)).ToArray();

                if (matchingConverter.Length == 1)
                {
                    JsonConverters.Remove(typeof(TInterface));
                    JsonConverters.Add(typeof(TInterface), new JsonInterfaceToObjectConverter<TInterface, TTo>());
                }
            }
        }

        public JsonConverter GetObjectConverter(object objectToConvert)
        {
            return GetTypeConverter(objectToConvert.GetType());
        }

        public JsonConverter GetTypeConverter(Type objectType)
        {
            lock (_convertersLocker)
            {
                return JsonConverters[objectType];
            }
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            return GetTypeConverter(objectType).ReadJson(reader, objectType, existingValue, serializer);
        }

        public override bool CanConvert(Type objectType)
        {
            lock (_convertersLocker)
            {
                return JsonConverters.ContainsKey(objectType);
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            serializer.Serialize(writer, value);
        }
    }
}
