namespace WorldFeed.Controllers.Search
{
    using System.Threading.Tasks;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.Search;
    using WorldFeed.Common.Web;

    public interface ISearchQueryExecutor
    {
        Task<ITwitterResult<ISearchResultsDTO>> SearchTweetsAsync(ISearchTweetsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<UserDTO[]>> SearchUsersAsync(ISearchUsersParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<SavedSearchDTO>> CreateSavedSearchAsync(ICreateSavedSearchParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<SavedSearchDTO>> GetSavedSearchAsync(IGetSavedSearchParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<SavedSearchDTO[]>> ListSavedSearchesAsync(IListSavedSearchesParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<SavedSearchDTO>> DestroySavedSearchAsync(IDestroySavedSearchParameters parameters, ITwitterRequest request);
    }

    public class SearchQueryExecutor : ISearchQueryExecutor
    {
        private readonly ISearchQueryGenerator searchQueryGenerator;
        private readonly ITwitterAccessor twitterAccessor;

        public SearchQueryExecutor(ISearchQueryGenerator searchQueryGenerator, ITwitterAccessor twitterAccessor)
        {
            this.searchQueryGenerator = searchQueryGenerator;
            this.twitterAccessor = twitterAccessor;
        }

        public Task<ITwitterResult<ISearchResultsDTO>> SearchTweetsAsync(ISearchTweetsParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.searchQueryGenerator.GetSearchTweetsQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ISearchResultsDTO>(request);
        }

        public Task<ITwitterResult<UserDTO[]>> SearchUsersAsync(ISearchUsersParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.searchQueryGenerator.GetSearchUsersQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<UserDTO[]>(request);
        }

        public Task<ITwitterResult<SavedSearchDTO>> CreateSavedSearchAsync(ICreateSavedSearchParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.searchQueryGenerator.GetCreateSavedSearchQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<SavedSearchDTO>(request);
        }

        public Task<ITwitterResult<SavedSearchDTO>> GetSavedSearchAsync(IGetSavedSearchParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.searchQueryGenerator.GetSavedSearchQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<SavedSearchDTO>(request);
        }

        public Task<ITwitterResult<SavedSearchDTO[]>> ListSavedSearchesAsync(IListSavedSearchesParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.searchQueryGenerator.GetListSavedSearchQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<SavedSearchDTO[]>(request);
        }

        public Task<ITwitterResult<SavedSearchDTO>> DestroySavedSearchAsync(IDestroySavedSearchParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.searchQueryGenerator.GetDestroySavedSearchQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<SavedSearchDTO>(request);
        }
    }
}
