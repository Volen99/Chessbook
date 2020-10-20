namespace Sharebook.Message.DTO.Events
{
    using System;
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Enums;
    using Sharebook.Common.Public.Models.Interfaces.DTO;

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
