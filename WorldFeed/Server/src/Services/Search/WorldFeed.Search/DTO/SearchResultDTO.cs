namespace WorldFeed.Search.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class SearchResultsDTO : ISearchResultsDTO
    {
        [JsonProperty("statuses")]
        public TweetWithSearchMetadataDTO[] TweetDTOs { get; set; }

        [JsonProperty("search_metadata")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ISearchMetadata SearchMetadata { get; set; }
    }
}
