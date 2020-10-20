namespace Sharebook.Common.DTO
{
    using Newtonsoft.Json;
    using Sharebook.Common.Public.Models.Interfaces.DTO;

    public class EventInitiatedViaDTO : IEventInitiatedViaDTO
    {
        [JsonProperty("tweet_id")]
        public long TweetId { get; set; }

        [JsonProperty("welcome_message_id")]
        public long? WelcomeMessageId { get; set; }
    }
}
