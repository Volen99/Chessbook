namespace Sharebook.Message.DTO
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Models.Interfaces.DTO.Events;

    public class GetMessageDTO : IGetMessageDTO
    {
        [JsonProperty("event")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IMessageEventDTO MessageEvent { get; set; }

        [JsonProperty("apps")]
        public Dictionary<long, IApp> Apps { get; set; }
    }
}
