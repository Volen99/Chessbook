namespace WorldFeed.Post.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class TweetWithSearchMetadataDTO : PostDTO, ITweetWithSearchMetadataDTO
    {
        [JsonProperty("metadata")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetFromSearchMetadata TweetFromSearchMetadata { get; set; }
    }
}
