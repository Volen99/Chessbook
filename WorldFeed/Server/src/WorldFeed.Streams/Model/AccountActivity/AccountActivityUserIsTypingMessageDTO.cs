namespace WorldFeed.Streams.Model.AccountActivity
{
    using Newtonsoft.Json;

    public class AccountActivityUserIsTypingMessageDTO : BaseAccountActivityMessageEventDTO
    {
        [JsonProperty("direct_message_indicate_typing_events")]
        public ActivityStreamDirectMessageConversationEventDTO[] TypingEvents { get; set; }
    }
}
