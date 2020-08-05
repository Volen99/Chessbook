namespace WorldFeed.Streams.Model
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Streaming.Events;

    public class WarningMessageTooManyFollowers : WarningMessage, IWarningMessageTooManyFollowers
    {
        [JsonProperty("user_id")]
        public long UserId { get; set; }

        [JsonProperty("timestamp_ms")]
        public string TimestampInMs { get; set; }
    }
}
