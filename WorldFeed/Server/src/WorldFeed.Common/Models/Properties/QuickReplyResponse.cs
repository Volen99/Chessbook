namespace WorldFeed.Common.Models.Properties
{
    using Newtonsoft.Json;

    using global::WorldFeed.Common.JsonConverters;
    using global::WorldFeed.Common.Public.Models.Enums;
    using global::WorldFeed.Common.Public.Models.Interfaces;

    public class QuickReplyResponse : IQuickReplyResponse
    {
        [JsonProperty("type")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public QuickReplyType Type { get; set; }

        [JsonProperty("metadata")]
        public string Metadata { get; set; }
    }
}
