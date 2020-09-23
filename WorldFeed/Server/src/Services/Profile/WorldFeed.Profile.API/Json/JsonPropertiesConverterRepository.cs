namespace WorldFeed.Profile.Json
{
    using Newtonsoft.Json;
    using System.Collections.Generic;
    using System.Linq;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Profile.DTO;
    using WorldFeed.Profile.Models;

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
                new JsonInterfaceToObjectConverter<IUserDTO, UserDTO>(),

                new JsonInterfaceToObjectConverter<IRelationshipDetailsDTO, RelationshipDetailsDTO>(),
                new JsonInterfaceToObjectConverter<IRelationshipStateDTO, RelationshipStateDTO>(),

                new JsonInterfaceToObjectConverter<IRelationshipDetails, RelationshipDetails>(),
                new JsonInterfaceToObjectConverter<IRelationshipState, RelationshipState>(),


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
