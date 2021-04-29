using Newtonsoft.Json;

namespace Chessbook.Core.JsonConverters.Logic
{
    public interface IJsonConvertWrapper
    {
        string SerializeObject(object o);

        string SerializeObject(object o, JsonConverter[] converters);

        T DeserializeObject<T>(string json);

        T DeserializeObject<T>(string json, JsonConverter[] converters);
    }
}
