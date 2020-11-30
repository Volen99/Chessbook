namespace Sharebook.Identity.API.Json
{
    using Newtonsoft.Json;
    using System.Collections.Generic;
    using System.Linq;

    using Sharebook.Common.Exceptions;
    using Sharebook.Common.Extensions;
    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Models;
    using Sharebook.Common.Models.Properties;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Common.Public.Models.RateLimits;
    using Sharebook.Identity.API.DTO;

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
                //new JsonInterfaceToObjectConverter<IAccountSettingsDTO, AccountSettingsDTO>(),

                new JsonInterfaceToObjectConverter<IEndpointRateLimit, EndpointRateLimit>(),
               // new JsonInterfaceToObjectConverter<ICredentialsRateLimits, CredentialsRateLimits>(),
                new JsonInterfaceToObjectConverter<ITwitterExceptionInfo, TwitterExceptionInfo>(),

               // new JsonInterfaceToObjectConverter<ITwitterConfiguration, TwitterConfiguration>(),

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
