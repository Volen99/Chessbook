namespace WorldFeed.Streams.Model.AccountActivity
{
    using Newtonsoft.Json;

    using WorldFeed.Common.DTO.Events;

    public class AccountActivityMessageCreatedEventDTO : BaseAccountActivityMessageEventDTO
    {
        [JsonProperty("direct_message_events")]
        public MessageEventDTO[] MessageEvents { get; set; }
    }
}
