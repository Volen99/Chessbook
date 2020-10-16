import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {ISearchTweetsParameters} from "../../Parameters/Search/SearchTweetsParameters";
import {ITwitterPageIterator} from "../../../Core/Iterators/TwitterPageIterator";
import {ISearchResultsDTO} from "../../Models/Interfaces/DTO/ISearchResultsDTO";
import {ISearchUsersParameters} from "../../Parameters/Search/SearchUsersParameters";
import {UserDTO} from "../../../Core/DTO/UserDTO";
import {IFilteredTwitterResult} from "../../../Core/Web/FilteredTwitterResult";
import {ICreateSavedSearchParameters} from "../../Parameters/Search/CreateSavedSearchParameters";
import {SavedSearchDTO} from "../../../Core/DTO/SavedSearchDTO";
import {IGetSavedSearchParameters} from "../../Parameters/Search/GetSavedSearchParameters";
import {IListSavedSearchesParameters} from "../../Parameters/Search/ListSavedSearchesParameters";
import {IDestroySavedSearchParameters} from "../../Parameters/Search/DestroySavedSearchParameters";

export interface ISearchRequester {
  /// <summary>
  /// Search for tweets
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets </para>
  /// <returns>Iterator over the search results</returns>
  getSearchTweetsIterator(parameters: ISearchTweetsParameters): ITwitterPageIterator<ITwitterResult<ISearchResultsDTO>, number>; // long?

  /// <summary>
  /// Search for users
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-search </para>
  /// <returns>Iterator over the search results</returns>
  getSearchUsersIterator(parameters: ISearchUsersParameters): ITwitterPageIterator<IFilteredTwitterResult<UserDTO[]>, number>; // int?

  /// <summary>
  /// Create a saved search
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-saved_searches-create </para>
  /// <returns>Twitter result containing the created saved search</returns>
  createSavedSearchAsync(parameters: ICreateSavedSearchParameters): Promise<ITwitterResult<SavedSearchDTO>>;

  /// <summary>
  /// Get an existing saved search
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-saved_searches-show-id </para>
  /// <returns>Twitter result containing the requested saved search</returns>
  getSavedSearchAsync(parameters: IGetSavedSearchParameters): Promise<ITwitterResult<SavedSearchDTO>>;

  /// <summary>
  /// List account's saved searches
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-saved_searches-list </para>
  /// <returns>Twitter result containing the account's saved searches</returns>
  listSavedSearchesAsync(parameters: IListSavedSearchesParameters): Promise<ITwitterResult<SavedSearchDTO[]>>;

  /// <summary>
  /// Destroys a saved search
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-saved_searches-destroy-id </para>
  /// <returns>Twitter result containing the deleted search</returns>
  destroySavedSearchAsync(parameters: IDestroySavedSearchParameters): Promise<ITwitterResult<SavedSearchDTO>>;
}
