namespace WorldFeed.Common.DTO.Events
{
    using System;
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Events;

    public class MessageEventDTO : IMessageEventDTO
    {
        [JsonProperty("type")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public EventType Type { get; set; }

        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("created_timestamp")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("initiated_via")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IEventInitiatedViaDTO InitiatedVia { get; set; }

        [JsonProperty("message_create")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IMessageCreateDTO MessageCreate { get; set; }
    }
}
