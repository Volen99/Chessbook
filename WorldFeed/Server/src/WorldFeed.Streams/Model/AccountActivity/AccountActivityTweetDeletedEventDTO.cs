namespace WorldFeed.Streams.Model.AccountActivity
{
    using Newtonsoft.Json;

    public class AccountActivityTweetDeletedEventDTO
    {
        [JsonProperty("status")]
        public AccountActivityTweetDeletedEventStatusDTO Status { get; set; }

        [JsonProperty("timestamp_ms")]
        public long Timestamp { get; set; }
    }
}
