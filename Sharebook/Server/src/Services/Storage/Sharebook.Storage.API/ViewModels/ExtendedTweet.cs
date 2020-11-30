namespace Sharebook.Storage.API.ViewModels
{
    using Newtonsoft.Json;

    using Sharebook.Storage.API.Data.Models.TwitterEntities;

    public class ExtendedTweet
    {
        [JsonProperty("text")]
        public string Text { get; set; }

        public string FullText { get; set; }

        public int[] DisplayTextRange { get; set; }

        [JsonProperty("entities")]
        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public TweetEntities LegacyEntities { get; set; }

        [JsonProperty("extended_entities")]
        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public TweetEntities ExtendedEntities { get; set; }
    }
}
