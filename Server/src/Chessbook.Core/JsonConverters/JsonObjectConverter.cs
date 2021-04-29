using Chessbook.Common.Extensions;
using Chessbook.Core.JsonConverters.Logic;
using Newtonsoft.Json;

namespace Chessbook.Core.JsonConverters
{
    public class JsonObjectConverter : IJsonObjectConverter
    {
        private readonly IJsonConvertWrapper _jsonConvertWrapper;

        public JsonObjectConverter(IJsonConvertWrapper jsonConvertWrapper)
        {
            _jsonConvertWrapper = jsonConvertWrapper;
        }

        public string Serialize(object o, JsonConverter[] converters = null)
        {
            if (converters == null)
            {
                converters = null; // JsonPropertiesConverterRepository.Converters;
            }

            return _jsonConvertWrapper.SerializeObject(o, converters);
        }

        public T Deserialize<T>(string json, JsonConverter[] converters = null)
        {
            //if (json.IsMatchingJsonFormat())
            //{
            //    return default;
            //}

            if (converters == null)
            {
                converters = null; // JsonPropertiesConverterRepository.Converters;
            }

            return _jsonConvertWrapper.DeserializeObject<T>(json, converters);
        }
    }
}
