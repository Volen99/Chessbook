namespace WorldFeed.Common.Models.Properties
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces;

    public class QuickReplyOption : IQuickReplyOption
    {
        [JsonProperty("label")]
        public string Label { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("metadata")]
        public string Metadata { get; set; }
    }
}
