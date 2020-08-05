namespace WorldFeed.Common.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class QuickReplyDTO : IQuickReplyDTO
    {
        [JsonProperty("type")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public QuickReplyType Type { get; set; }

        [JsonProperty("options")]
        public IQuickReplyOption[] Options { get; set; }
    }
}
