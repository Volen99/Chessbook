using Sharebook.Storage.API.Data.Models.TwitterEntities;

namespace Sharebook.Storage.API.Data.Models
{

    public class ExtendedPost
    {
        //[JsonProperty("text")]
        public string Text { get; set; }

        //[JsonProperty("full_text")]
        public string FullText { get; set; }

        //[JsonProperty("display_text_range")]
        public int[] DisplayTextRange { get; set; }

        //[JsonProperty("entities")]
        //[JsonConverter(typeof(JsonPropertyConverterRepository))]
        public TweetEntities LegacyEntities { get; set; }

        //[JsonProperty("extended_entities")]
       // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public TweetEntities ExtendedEntities { get; set; }
    }
}
