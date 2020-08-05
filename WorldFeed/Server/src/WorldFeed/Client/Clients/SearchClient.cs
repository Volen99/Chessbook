namespace WorldFeed.Client.Clients
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Iterators;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.Enums;
    using WorldFeed.Common.Public.Parameters.Search;
    using WorldFeed.Common.Web;

    public class SearchClient : ISearchClient
    {
        private readonly ITwitterClient client;

        public SearchClient(ITwitterClient client)
        {
            this.client = client;
        }

        public ISearchClientParametersValidator ParametersValidator => this.client.ParametersValidator;

        public Task<ITweet[]> SearchTweetsAsync(string query)
        {
            return SearchTweetsAsync(new SearchTweetsParameters(query));
        }

        public Task<ITweet[]> SearchTweetsAsync(IGeoCode geoCode)
        {
            return SearchTweetsAsync(new SearchTweetsParameters(geoCode));
        }

        public async Task<ITweet[]> SearchTweetsAsync(ISearchTweetsParameters parameters)
        {
            var iterator = GetSearchTweetsIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public Task<ISearchResults> SearchTweetsWithMetadataAsync(string query)
        {
            return SearchTweetsWithMetadataAsync(new SearchTweetsParameters(query));
        }

        public async Task<ISearchResults> SearchTweetsWithMetadataAsync(ISearchTweetsParameters parameters)
        {
            var pageIterator = this.client.Raw.Search.GetSearchTweetsIterator(parameters);
            var page = await pageIterator.NextPageAsync().ConfigureAwait(false);
            return this.client.Factories.CreateSearchResult(page?.Content?.Model);
        }

        public ITwitterIterator<ITweet, long?> GetSearchTweetsIterator(string query)
        {
            return GetSearchTweetsIterator(new SearchTweetsParameters(query));
        }

        public ITwitterIterator<ITweet, long?> GetSearchTweetsIterator(ISearchTweetsParameters parameters)
        {
            var pageIterator = this.client.Raw.Search.GetSearchTweetsIterator(parameters);
            return new TwitterIteratorProxy<ITwitterResult<ISearchResultsDTO>, ITweet, long?>(pageIterator,
                twitterResult => this.client.Factories.CreateTweets(twitterResult?.Model?.TweetDTOs));
        }

        public ITweet[] FilterTweets(ITweet[] tweets, OnlyGetTweetsThatAre? filter, bool tweetsMustContainGeoInformation)
        {
            IEnumerable<ITweet> matchingTweets = tweets;

            if (filter == OnlyGetTweetsThatAre.OriginalTweets)
            {
                matchingTweets = matchingTweets.Where(x => x.RetweetedTweet == null).ToArray();
            }

            if (filter == OnlyGetTweetsThatAre.Retweets)
            {
                matchingTweets = matchingTweets.Where(x => x.RetweetedTweet != null).ToArray();
            }

            if (matchingTweets != null && tweetsMustContainGeoInformation)
            {
                matchingTweets = matchingTweets.Where(x => x.Coordinates != null || x.Place != null);
            }

            return matchingTweets?.ToArray();
        }

        public Task<IUser[]> SearchUsersAsync(string query)
        {
            return SearchUsersAsync(new SearchUsersParameters(query));
        }

        public async Task<IUser[]> SearchUsersAsync(ISearchUsersParameters parameters)
        {
            var pageIterator = GetSearchUsersIterator(parameters);
            return (await pageIterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<IUser, int?> GetSearchUsersIterator(string query)
        {
            return GetSearchUsersIterator(new SearchUsersParameters(query));
        }

        public ITwitterIterator<IUser, int?> GetSearchUsersIterator(ISearchUsersParameters parameters)
        {
            var pageIterator = this.client.Raw.Search.GetSearchUsersIterator(parameters);
            return new TwitterIteratorProxy<IFilteredTwitterResult<UserDTO[]>, IUser, int?>(pageIterator,
                twitterResult => this.client.Factories.CreateUsers(twitterResult?.FilteredDTO));
        }

        public Task<ISavedSearch> CreateSavedSearchAsync(string query)
        {
            return CreateSavedSearchAsync(new CreateSavedSearchParameters(query));
        }

        public async Task<ISavedSearch> CreateSavedSearchAsync(ICreateSavedSearchParameters parameters)
        {
            var twitterResult = await this.client.Raw.Search.CreateSavedSearchAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateSavedSearch(twitterResult?.Model);
        }

        public Task<ISavedSearch> GetSavedSearchAsync(long savedSearchId)
        {
            return GetSavedSearchAsync(new GetSavedSearchParameters(savedSearchId));
        }

        public async Task<ISavedSearch> GetSavedSearchAsync(IGetSavedSearchParameters parameters)
        {
            var twitterResult = await this.client.Raw.Search.GetSavedSearchAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateSavedSearch(twitterResult?.Model);
        }

        public Task<ISavedSearch[]> ListSavedSearchesAsync()
        {
            return ListSavedSearchesAsync(new ListSavedSearchesParameters());
        }

        public async Task<ISavedSearch[]> ListSavedSearchesAsync(IListSavedSearchesParameters parameters)
        {
            var twitterResult = await this.client.Raw.Search.ListSavedSearchesAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model?.Select(this.client.Factories.CreateSavedSearch).ToArray();
        }

        public Task<ISavedSearch> DestroySavedSearchAsync(long savedSearchId)
        {
            return DestroySavedSearchAsync(new DestroySavedSearchParameters(savedSearchId));
        }

        public Task<ISavedSearch> DestroySavedSearchAsync(ISavedSearch savedSearch)
        {
            return DestroySavedSearchAsync(new DestroySavedSearchParameters(savedSearch));
        }

        public async Task<ISavedSearch> DestroySavedSearchAsync(IDestroySavedSearchParameters parameters)
        {
            var twitterResult = await this.client.Raw.Search.DestroySavedSearchAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateSavedSearch(twitterResult?.Model);
        }
    }
}