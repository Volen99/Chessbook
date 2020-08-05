namespace WorldFeed.Streams.Model.AccountActivity
{
    using Newtonsoft.Json;

    public class AccountActivityTweetDeletedEventStatusDTO
    {
        [JsonProperty("id")]
        public long TweetId { get; set; }

        [JsonProperty("user_id")]
        public long UserId { get; set; }
    }
}
