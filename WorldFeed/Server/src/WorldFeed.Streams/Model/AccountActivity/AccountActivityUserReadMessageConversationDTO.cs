namespace WorldFeed.Streams.Model.AccountActivity
{
    using Newtonsoft.Json;

    public class AccountActivityUserReadMessageConversationDTO : BaseAccountActivityMessageEventDTO
    {
        [JsonProperty("direct_message_mark_read_events")]
        public ActivityStreamDirectMessageConversationEventDTO[] MessageConversationReadEvents { get; set; }
    }
}
