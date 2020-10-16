namespace WorldFeed.Search.Client.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Client;
    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Web;
    using WorldFeed.Search.Application.Parameters;
    using WorldFeed.Search.Controllers;

    public class SearchRequester : BaseRequester, ISearchRequester
    {
        private readonly ISearchController searchController;
        private readonly ISearchClientRequiredParametersValidator validator;

        public SearchRequester(
        ISearchController searchController,
        ISearchClientRequiredParametersValidator validator,
        ITwitterClient client,
        ITwitterClientEvents twitterClientEvents)
        : base(client, twitterClientEvents)
        {
            this.searchController = searchController;
            this.validator = validator;
        }

        public ITwitterPageIterator<ITwitterResult<ISearchResultsDTO>, long?> GetSearchTweetsIterator(ISearchTweetsParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            return this.searchController.GetSearchTweetsIterator(parameters, request);
        }

        public ITwitterPageIterator<IFilteredTwitterResult<UserDTO[]>, int?> GetSearchUsersIterator(ISearchUsersParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            return this.searchController.GetSearchUsersIterator(parameters, request);
        }

        public Task<ITwitterResult<SavedSearchDTO>> CreateSavedSearchAsync(ICreateSavedSearchParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.searchController.CreateSavedSearchAsync(parameters, request));
        }

        public Task<ITwitterResult<SavedSearchDTO>> GetSavedSearchAsync(IGetSavedSearchParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.searchController.GetSavedSearchAsync(parameters, request));
        }

        public Task<ITwitterResult<SavedSearchDTO[]>> ListSavedSearchesAsync(IListSavedSearchesParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.searchController.ListSavedSearchesAsync(parameters, request));
        }

        public Task<ITwitterResult<SavedSearchDTO>> DestroySavedSearchAsync(IDestroySavedSearchParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.searchController.DestroySavedSearchAsync(parameters, request));
        }
    }
}