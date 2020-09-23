namespace WorldFeed.Search.Client.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Web;
    using WorldFeed.Search.Application.Parameters;

    public interface ISearchRequester
    {
        /// <summary>
        /// Search for tweets
        /// </summary>
        /// <para> Read more : https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets </para>
        /// <returns>Iterator over the search results</returns>
        ITwitterPageIterator<ITwitterResult<ISearchResultsDTO>, long?> GetSearchTweetsIterator(ISearchTweetsParameters parameters);

        /// <summary>
        /// Search for users
        /// </summary>
        /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-search </para>
        /// <returns>Iterator over the search results</returns>
        ITwitterPageIterator<IFilteredTwitterResult<UserDTO[]>, int?> GetSearchUsersIterator(ISearchUsersParameters parameters);

        /// <summary>
        /// Create a saved search
        /// </summary>
        /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-saved_searches-create </para>
        /// <returns>Twitter result containing the created saved search</returns>
        Task<ITwitterResult<SavedSearchDTO>> CreateSavedSearchAsync(ICreateSavedSearchParameters parameters);

        /// <summary>
        /// Get an existing saved search
        /// </summary>
        /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-saved_searches-show-id </para>
        /// <returns>Twitter result containing the requested saved search</returns>
        Task<ITwitterResult<SavedSearchDTO>> GetSavedSearchAsync(IGetSavedSearchParameters parameters);

        /// <summary>
        /// List account's saved searches
        /// </summary>
        /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-saved_searches-list </para>
        /// <returns>Twitter result containing the account's saved searches</returns>
        Task<ITwitterResult<SavedSearchDTO[]>> ListSavedSearchesAsync(IListSavedSearchesParameters parameters);

        /// <summary>
        /// Destroys a saved search
        /// </summary>
        /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-saved_searches-destroy-id </para>
        /// <returns>Twitter result containing the deleted search</returns>
        Task<ITwitterResult<SavedSearchDTO>> DestroySavedSearchAsync(IDestroySavedSearchParameters parameters);
    }
}
