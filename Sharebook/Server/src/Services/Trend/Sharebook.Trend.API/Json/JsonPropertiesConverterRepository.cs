namespace Sharebook.Trend.json
{
    using Newtonsoft.Json;
    using System.Collections.Generic;
    using System.Linq;
    using Sharebook.Common.Exceptions;
    using Sharebook.Common.Extensions;
    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Models.Properties;
    using Sharebook.Trends.Domain.AggregateRoots.TrendAggregate;

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
                new JsonInterfaceToObjectConverter<IGetTrendsAtResult, GetTrendsAtResult>(),
                new JsonInterfaceToObjectConverter<ITrend, Trend>(),
                new JsonInterfaceToObjectConverter<ITrendLocation, TrendLocation>(),
                new JsonInterfaceToObjectConverter<IWoeIdLocation, WoeIdLocation>(),

                new JsonInterfaceToObjectConverter<ITwitterExceptionInfo, TwitterExceptionInfo>()


                // JsonCoordinatesConverter is used only for Properties (with an s) and not Property
                // because Twitter does not provide the coordinates the same way if it is a list or
                // if it is a single argument.
                new JsonCoordinatesConverter(),
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
