namespace Sharebook.Message.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Message.DTO.Events;

    public class CreateMessageDTO : ICreateMessageDTO
    {
        [JsonProperty("event")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IMessageEventDTO MessageEvent { get; set; }
    }
}
