namespace Sharebook.Search.Client.Tools
{
    using System.Linq;

    using Sharebook.Common.Helpers;
    using Sharebook.Search.DTO;
    using Sharebook.Search.Models;
    using Sharebook.Search.Models.Properties;

    public class TwitterClientFactories : ITwitterClientFactories
    {
        private readonly ITwitterClient client;
        private readonly IJsonObjectConverter jsonObjectConverter;

        public TwitterClientFactories(ITwitterClient client, IJsonObjectConverter jsonObjectConverter)
        {
            this.client = client;
            this.jsonObjectConverter = jsonObjectConverter;
        }

        public ISavedSearch CreateSavedSearch(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<ISavedSearchDTO>(json);
            return CreateSavedSearch(dto);
        }

        public ISavedSearch CreateSavedSearch(ISavedSearchDTO savedSearchDTO)
        {
            return savedSearchDTO == null ? null : new SavedSearch(savedSearchDTO);
        }

        public ISearchResults CreateSearchResult(ISearchResultsDTO searchResultsDTO)
        {
            var tweets = searchResultsDTO?.TweetDTOs?.Select(CreateTweetWithSearchMetadata);
            return new SearchResults(tweets, searchResultsDTO?.SearchMetadata);
        }

        public ISearchResults CreateSearchResult(string json)
        {
            var searchResultDto = this.jsonObjectConverter.Deserialize<SearchResultsDTO>(json);
            return CreateSearchResult(searchResultDto);
        }
    }
}