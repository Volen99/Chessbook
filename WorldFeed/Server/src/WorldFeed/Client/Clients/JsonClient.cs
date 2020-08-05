namespace WorldFeed.Client.Clients
{
    using WorldFeed.Common.Json;
    using WorldFeed.Common.Public.Client.Clients;

    public class JsonClient : IJsonClient
    {
        private readonly ITweetinviJsonConverter tweetinviJsonConverter;

        public JsonClient(ITweetinviJsonConverter tweetinviJsonConverter)
        {
            this.tweetinviJsonConverter = tweetinviJsonConverter;
        }

        public string Serialize<T>(T obj)
            where T : class
        {
            return this.tweetinviJsonConverter.ToJson(obj);
        }

        public string Serialize<TFrom, TTo>(TFrom obj) 
            where TFrom : class where TTo : class
        {
            return this.tweetinviJsonConverter.ToJson<TFrom, TTo>(obj);
        }

        public T Deserialize<T>(string json)
            where T : class
        {
            return this.tweetinviJsonConverter.ConvertJsonTo<T>(json);
        }
    }
}