using System.Collections.Generic;
using Newtonsoft.Json;

using WorldFeed.Common.JsonConverters;
using WorldFeed.Common.Public.Models.Interfaces;
using WorldFeed.Common.Public.Models.Interfaces.DTO;
using WorldFeed.Common.Public.Models.Interfaces.DTO.Events;

namespace WorldFeed.Common.DTO
{
    public class GetMessageDTO : IGetMessageDTO
    {
        [JsonProperty("event")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IMessageEventDTO MessageEvent { get; set; }

        [JsonProperty("apps")]
        public Dictionary<long, IApp> Apps { get; set; }
    }
}
