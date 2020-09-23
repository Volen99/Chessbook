namespace WorldFeed.Upload.API.JsonConverters
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Newtonsoft.Json;

    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Upload.DTO;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.Entities;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.TwitterEntities;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.Entities.ExtendedEntities;
    using WorldFeed.Upload.Domain.AggregatesModel.TweetAggregate.Properties;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.TwitterEntities.ExtendedEntities;


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
            InitializeEntitiesConverters();
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
            var allowContributorRequestConverter = new JsonAllowContributorRequestConverter();

            JsonConverters.Add(typeof(PrivacyMode), privacyModeConverter);
            JsonConverters.Add(typeof(ICoordinates), coordinatesConverter);
            JsonConverters.Add(typeof(Language), languageConverter);
            JsonConverters.Add(typeof(Language?), languageConverter);
            JsonConverters.Add(typeof(AllowContributorRequestMode), allowContributorRequestConverter);
        }

        private static void InitializeTweetinviInterfacesConverters()
        {
            var placeConverter = new JsonInterfaceToObjectConverter<IPlace, Place>();

            var uploadedImageDetailsConverter = new JsonInterfaceToObjectConverter<IUploadedImageDetails, UploadedImageDetailsDTO>();
            var uploadedVideoDetailsConverter = new JsonInterfaceToObjectConverter<IUploadedVideoDetails, UploadedVideoDetailsDTO>();
            var uploadProcessingInfoConverter = new JsonInterfaceToObjectConverter<IUploadProcessingInfo, UploadProcessingInfo>();
            var uploadProcessingErrorConverter = new JsonInterfaceToObjectConverter<IUploadProcessingError, UploadProcessingError>();


            JsonConverters.Add(typeof(IUploadedImageDetails), uploadedImageDetailsConverter);
            JsonConverters.Add(typeof(IUploadedVideoDetails), uploadedVideoDetailsConverter);
            JsonConverters.Add(typeof(IUploadProcessingInfo), uploadProcessingInfoConverter);
            JsonConverters.Add(typeof(IUploadProcessingError), uploadProcessingErrorConverter);

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

            JsonConverters.Add(typeof(IHashtagEntity), hashtagEntityConverter);
            JsonConverters.Add(typeof(IUrlEntity), urlEntityConverter);
            JsonConverters.Add(typeof(IMediaEntity), mediaEntityConverter);
            JsonConverters.Add(typeof(IMediaEntitySize), mediaEntitySizeConverter);
            JsonConverters.Add(typeof(IDescriptionEntity), descriptionEntityConverter);
            JsonConverters.Add(typeof(IWebsiteEntity), websiteEntityConverter);

            JsonConverters.Add(typeof(IUserEntities), userEntitiesConverter);

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
