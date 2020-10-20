namespace Sharebook.Search.Client.Tools
{
    using Sharebook.Search.DTO;
    using Sharebook.Search.Models;

    public interface ITwitterClientFactories
    {
        // SAVED SEARCH

        /// <summary>
        /// Creates a saved search from json
        /// </summary>
        ISavedSearch CreateSavedSearch(string json);
        ISavedSearch CreateSavedSearch(ISavedSearchDTO savedSearchDTO);

        // SEARCH
        ISearchResults CreateSearchResult(ISearchResultsDTO searchResultsDTO);

        // SEARCH

        /// <summary>
        /// Creates search results from json
        /// </summary>
        ISearchResults CreateSearchResult(string json);
    }
}
