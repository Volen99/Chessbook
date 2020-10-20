namespace Sharebook.Post.API.JsonConverters
{
    using System.Collections.Generic;
    using System.Linq;
    using Newtonsoft.Json;

    using Sharebook.Common.Extensions;
    using Sharebook.Common.JsonConverters;
    using Sharebook.Post.Domain.AggregatesModel.PostAggregate.Entities;
    using Sharebook.Post.Domain.AggregatesModel.PostAggregate.Entities.ExtendedEntities;
    using Sharebook.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities.ExtendedEntities;
    using Sharebook.Post.DTO;

    public class JsonPropertiesConverterRepository
    {
        static JsonPropertiesConverterRepository()
        {
            Initialize();
        }

        public static JsonConverter[] Converters { get; private set; }

        private static void Initialize()
        {
            var converters = new List<JsonConverter>
            {
                new JsonInterfaceToObjectConverter<IPostDTO, PostDTO>(),
                new JsonInterfaceToObjectConverter<ITweetWithSearchMetadataDTO, TweetWithSearchMetadataDTO>(),
                new JsonInterfaceToObjectConverter<IOEmbedTweetDTO, OEmbedTweetDTO>(),

                new JsonInterfaceToObjectConverter<ITweetEntities, TweetEntitiesDTO>(),
                new JsonInterfaceToObjectConverter<IObjectEntities, ObjectEntitiesDTO>(),
                new JsonInterfaceToObjectConverter<IVideoEntityVariant, VideoEntityVariant>(),


                // JsonCoordinatesConverter is used only for Properties (with an s) and not Property
                // because Twitter does not provide the coordinates the same way if it is a list or
                // if it is a single argument.
                new JsonCoordinatesConverter(),

                // Enums (that have JSON serialization implemented)
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
