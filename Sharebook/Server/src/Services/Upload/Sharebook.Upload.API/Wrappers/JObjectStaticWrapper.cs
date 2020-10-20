namespace Sharebook.Upload.API.Wrappers
{
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    using Sharebook.Common.Extensions;
    using Sharebook.Common.Wrappers;
    using Sharebook.Upload.API.JsonConverters;

    // Wrapper classes "cannot" be tested
    public class JObjectStaticWrapper : IJObjectStaticWrapper
    {
        private readonly JsonSerializer serializer;

        public JObjectStaticWrapper()
        {
            this.serializer = new JsonSerializer();

            foreach (var converter in JsonPropertiesConverterRepository.Converters)
            {
                this.serializer.Converters.Add(converter);
            }
        }

        public JObject GetJobjectFromJson(string json)
        {
            if (!StringExtensions.IsMatchingJsonFormat(json)) // TODO: might bug, as it was !StringExtension
            {
                return null;
            }

            return JObject.Parse(json);
        }

        public T ToObject<T>(JObject jObject)
        {
            return jObject.ToObject<T>(this.serializer);
        }

        public T ToObject<T>(JToken jToken) where T : class
        {
            if (jToken == null)
            {
                return null;
            }

            return jToken.ToObject<T>(this.serializer);
        }

        public string GetNodeRootName(JToken jToken)
        {
            var jProperty = jToken as JProperty;
            return jProperty != null ? jProperty.Name : null;
        }
    }
}
