namespace Sharebook.Message.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Message.DTO.Events;

    public class MessageEventWithAppDTO : IMessageEventWithAppDTO
    {
        [JsonProperty("event")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IMessageEventDTO MessageEvent { get; set; }

        [JsonProperty("app")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IApp App { get; set; }
    }
}
