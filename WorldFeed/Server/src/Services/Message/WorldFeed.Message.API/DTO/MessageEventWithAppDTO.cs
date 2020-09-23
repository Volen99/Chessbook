namespace WorldFeed.Message.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Message.DTO.Events;

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
