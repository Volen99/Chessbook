namespace Sharebook.Search.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Interfaces.DTO;

    public class SearchResultsDTO : ISearchResultsDTO
    {
        [JsonProperty("statuses")]
        public TweetWithSearchMetadataDTO[] TweetDTOs { get; set; }

        [JsonProperty("search_metadata")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ISearchMetadata SearchMetadata { get; set; }
    }
}
