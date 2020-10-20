namespace Sharebook.Upload.API.JsonConverters
{
    using Newtonsoft.Json;

    using Sharebook.Common.Extensions;
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Wrappers;
    using Sharebook.Post.API.JsonConverters;

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
