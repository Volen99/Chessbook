using Newtonsoft.Json;

namespace Chessbook.Core.JsonConverters
{
    /// <summary>
    /// This interface allows to (de)serialize any object or interface from the Tweetinvi API
    /// </summary>
    public interface IJsonObjectConverter
    {
        string Serialize(object o, JsonConverter[] converters = null);
        T Deserialize<T>(string json, JsonConverter[] converters = null);
    }
}
