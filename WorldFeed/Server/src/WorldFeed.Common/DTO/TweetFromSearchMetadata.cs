namespace WorldFeed.Common.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class TweetFromSearchMetadata : ITweetFromSearchMetadata
    {
        [JsonProperty("result_type")]
        public string ResultType { get; private set; }

        [JsonProperty("iso_language_code")]
        public string IsoLanguageCode { get; private set; }
    }
}
