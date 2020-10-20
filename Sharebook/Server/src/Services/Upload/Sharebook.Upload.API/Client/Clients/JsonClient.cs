namespace Sharebook.Upload.API.Client.Clients
{
    using Sharebook.Common.Public.Client.Clients;
    using Sharebook.Upload.API.Json;

    public class JsonClient : IJsonClient
    {
        private readonly IUploadJsonConverter tweetinviJsonConverter;

        public JsonClient(IUploadJsonConverter tweetinviJsonConverter)
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
