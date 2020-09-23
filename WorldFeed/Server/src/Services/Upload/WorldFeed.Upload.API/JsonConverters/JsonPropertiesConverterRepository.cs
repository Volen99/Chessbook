namespace WorldFeed.Upload.API.JsonConverters
{
    using System.Collections.Generic;
    using System.Linq;
    using Newtonsoft.Json;

    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.Properties;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.RateLimits;
    using WorldFeed.Upload.ChunkedUpload;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.Entities;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.Entities.ExtendedEntities;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.TwitterEntities;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.TwitterEntities.ExtendedEntities;
    using WorldFeed.Upload.DTO;

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
                new JsonInterfaceToObjectConverter<IUploadedMediaInfo, UploadedMediaInfo>(),
                new JsonInterfaceToObjectConverter<IUploadProcessingError, UploadProcessingError>(),

                new JsonInterfaceToObjectConverter<IUrlEntity, UrlEntity>(),
                new JsonInterfaceToObjectConverter<IHashtagEntity, HashtagEntity>(),
                new JsonInterfaceToObjectConverter<IMediaEntity, MediaEntity>(),
                new JsonInterfaceToObjectConverter<IMediaEntitySize, MediaEntitySize>(),
                new JsonInterfaceToObjectConverter<IUserMentionEntity, UserMentionEntity>(),
                new JsonInterfaceToObjectConverter<IDescriptionEntity, DescriptionEntity>(),
                new JsonInterfaceToObjectConverter<IWebsiteEntity, WebsiteEntity>(),
                new JsonInterfaceToObjectConverter<ISymbolEntity, SymbolEntity>(),

                new JsonInterfaceToObjectConverter<IUserEntities, UserEntities>(),

                new JsonInterfaceToObjectConverter<IVideoEntityVariant, VideoEntityVariant>(),


                new JsonInterfaceToObjectConverter<IEndpointRateLimit, EndpointRateLimit>(),
                new JsonInterfaceToObjectConverter<ITwitterExceptionInfo, TwitterExceptionInfo>(),

                new JsonInterfaceToObjectConverter<IUrlEntity, UrlEntity>(),

                // JsonCoordinatesConverter is used only for Properties (with an s) and not Property
                // because Twitter does not provide the coordinates the same way if it is a list or
                // if it is a single argument.
                new JsonCoordinatesConverter(),

                new JsonInterfaceToObjectConverter<IUploadInitModel, UploadInitModel>(),

             // Enums (that have JSON serialization implemented)
                new JsonEnumStringConverter<EventType>(),
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
