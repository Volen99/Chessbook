namespace WorldFeed.Common.Models.Properties
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;

    public class QuickReplyResponse : IQuickReplyResponse
    {
        [JsonProperty("type")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public QuickReplyType Type { get; set; }

        [JsonProperty("metadata")]
        public string Metadata { get; set; }
    }
}
