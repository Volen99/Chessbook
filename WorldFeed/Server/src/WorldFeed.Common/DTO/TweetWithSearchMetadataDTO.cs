namespace WorldFeed.Common.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class TweetWithSearchMetadataDTO : TweetDTO, ITweetWithSearchMetadataDTO
    {
        [JsonProperty("metadata")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetFromSearchMetadata TweetFromSearchMetadata { get; set; }
    }
}
