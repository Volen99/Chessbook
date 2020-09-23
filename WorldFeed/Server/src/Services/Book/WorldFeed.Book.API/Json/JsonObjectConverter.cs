namespace WorldFeed.Common.JsonConverters
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Wrappers;

    public class JsonObjectConverter : IJsonObjectConverter
    {
        private readonly IJsonConvertWrapper jsonConvertWrapper;

        public JsonObjectConverter(IJsonConvertWrapper jsonConvertWrapper)
        {
            this.jsonConvertWrapper = jsonConvertWrapper;
        }

        public string Serialize(object o, JsonConverter[] converters = null)
        {
            if (converters == null)
            {
                converters = JsonPropertiesConverterRepository.Converters;
            }

            return this.jsonConvertWrapper.SerializeObject(o, converters);
        }

        public T Deserialize<T>(string json, JsonConverter[] converters = null)
        {
            if (!json.IsMatchingJsonFormat())
            {
                return default;
            }

            if (converters == null)
            {
                converters = JsonPropertiesConverterRepository.Converters;
            }

            return this.jsonConvertWrapper.DeserializeObject<T>(json, converters);
        }
    }
}
