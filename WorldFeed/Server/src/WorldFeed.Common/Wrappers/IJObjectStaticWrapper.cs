using Newtonsoft.Json.Linq;

namespace WorldFeed.Common.Wrappers
{
    public interface IJObjectStaticWrapper
    {
        JObject GetJobjectFromJson(string json);
        T ToObject<T>(JObject jObject);
        T ToObject<T>(JToken jToken) where T : class;
        string GetNodeRootName(JToken jToken);
    }
}