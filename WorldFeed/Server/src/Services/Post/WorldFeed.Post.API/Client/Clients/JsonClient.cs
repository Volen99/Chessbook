namespace WorldFeed.Post.API.Client.Clients
{
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Post.API.Json;

    public class JsonClient : IJsonClient
    {
        private readonly IPostJsonConverter tweetinviJsonConverter;

        public JsonClient(IPostJsonConverter tweetinviJsonConverter)
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
