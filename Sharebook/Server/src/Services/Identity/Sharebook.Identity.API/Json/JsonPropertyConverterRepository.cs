namespace Sharebook.Identity.API.Json
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Sharebook.Common.Helpers;
    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Models.RateLimits;
    using Sharebook.Identity.API.DTO;

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

        private static void InitializeTweetinviInterfacesConverters()
        {
            //var userDTOConverter = new JsonInterfaceToObjectConverter<IUserDTO, UserDTO>();
            var userIdentifierConverter = new JsonInterfaceToObjectConverter<IUserIdentifier, UserIdentifierDTO>();
            //var accountSettingsConverter = new JsonInterfaceToObjectConverter<IAccountSettingsDTO, AccountSettingsDTO>();

          //  JsonConverters.Add(typeof(IUserDTO), userDTOConverter);
            JsonConverters.Add(typeof(IUserIdentifier), userIdentifierConverter);
            //JsonConverters.Add(typeof(IAccountSettingsDTO), accountSettingsConverter);

           // JsonConverters.Add(typeof(IEndpointRateLimit), endpointRateLimitConverter);
           // JsonConverters.Add(typeof(ICredentialsRateLimits), credentialsRateLimitsConverter);
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
