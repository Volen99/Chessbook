namespace Sharebook.Message.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Interfaces.DTO;

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
