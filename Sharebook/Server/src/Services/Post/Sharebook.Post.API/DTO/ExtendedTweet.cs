namespace Sharebook.Post.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Entities;
    using Sharebook.Common.Public.Models.Interfaces.DTO;

    public class ExtendedTweet : IExtendedTweet
    {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("full_text")]
        public string FullText { get; set; }

        [JsonProperty("display_text_range")]
        public int[] DisplayTextRange { get; set; }

        [JsonProperty("entities")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetEntities LegacyEntities { get; set; }

        [JsonProperty("extended_entities")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetEntities ExtendedEntities { get; set; }
    }
}
