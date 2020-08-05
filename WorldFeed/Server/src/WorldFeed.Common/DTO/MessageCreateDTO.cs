namespace WorldFeed.Common.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class MessageCreateDTO : IMessageCreateDTO
    {
        // Twitter fields
        [JsonProperty("target")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IMessageCreateTargetDTO Target { get; set; }

        [JsonProperty("sender_id")]
        public long SenderId { get; set; }

        [JsonProperty("source_app_id")]
        public long? SourceAppId { get; set; }

        [JsonProperty("message_data")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IMessageDataDTO MessageData { get; set; }
    }
}
