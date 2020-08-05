namespace WorldFeed.Streams.Model.AccountActivity
{
    using Newtonsoft.Json;

    public class ActivityStreamAppIdentifierDTO
    {
        [JsonProperty("app_id")]
        public long AppId { get; set; }
    }
}
