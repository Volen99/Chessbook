namespace WorldFeed.Streams.Model
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Streaming.Events;

    public class DisconnectMessage : IDisconnectMessage
    {
        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("stream_name")]
        public string StreamName { get; set; }

        [JsonProperty("reason")]
        public string Reason { get; set; }
    }
}
