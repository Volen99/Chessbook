namespace Sharebook.Post.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Interfaces.DTO;

    public class TweetWithSearchMetadataDTO : PostDTO, ITweetWithSearchMetadataDTO
    {
        [JsonProperty("metadata")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetFromSearchMetadata TweetFromSearchMetadata { get; set; }
    }
}
