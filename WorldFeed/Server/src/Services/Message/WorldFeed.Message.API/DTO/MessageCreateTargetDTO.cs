namespace WorldFeed.Message.DTO
{
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    using Newtonsoft.Json;

    public class MessageCreateTargetDTO : IMessageCreateTargetDTO
    {
        [JsonProperty("recipient_id")]
        public long RecipientId { get; set; }
    }
}
