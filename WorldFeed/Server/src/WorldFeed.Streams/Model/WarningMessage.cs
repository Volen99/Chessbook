namespace WorldFeed.Streams.Model
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Streaming.Events;

    public class WarningMessage : IWarningMessage
    {
        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
