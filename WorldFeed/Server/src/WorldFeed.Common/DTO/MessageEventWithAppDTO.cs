namespace WorldFeed.Common.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Events;

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
