namespace WorldFeed.Streams.Model
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Streaming.Events;

    public class WarningMessageFallingBehind : WarningMessage, IWarningMessageFallingBehind
    {
        [JsonProperty("percent_full")]
        public int PercentFull { get; set; }
    }
}
