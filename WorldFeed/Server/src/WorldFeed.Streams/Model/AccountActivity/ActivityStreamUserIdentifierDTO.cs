namespace WorldFeed.Streams.Model.AccountActivity
{
    using Newtonsoft.Json;

    public class ActivityStreamUserIdentifierDTO
    {
        [JsonProperty("user_id")]
        public long UserId { get; set; }
    }
}
