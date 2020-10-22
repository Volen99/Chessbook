import {ITweet} from "../../Models/Interfaces/ITweet";
import {IGeoCode} from "../../Models/Interfaces/IGeoCode";
import {ISearchTweetsParameters} from "../../Parameters/Search/SearchTweetsParameters";
import {ISearchResults} from "../../Models/Interfaces/ISearchResults";
import {ITwitterIterator} from "../../Iterators/ITwitterIterator";
import {OnlyGetTweetsThatAre} from "../../Parameters/Enum/OnlyGetTweetsThatAre";
import {IUser} from "../../Models/Interfaces/IUser";
import {ISearchUsersParameters} from "../../Parameters/Search/SearchUsersParameters";
import {ISavedSearch} from "../../Models/Interfaces/ISavedSearch";
import {ICreateSavedSearchParameters} from "../../Parameters/Search/CreateSavedSearchParameters";
import {IGetSavedSearchParameters} from "../../Parameters/Search/GetSavedSearchParameters";
import {IListSavedSearchesParameters} from "../../Parameters/Search/ListSavedSearchesParameters";
import {IDestroySavedSearchParameters} from "../../Parameters/Search/DestroySavedSearchParameters";
import {ISearchClientParametersValidator} from "../../../Core/Client/Validators/SearchClientParametersValidator";
import {InjectionToken} from "@angular/core";

export interface ISearchClient {
  // Validate all the Search client parameters
  parametersValidator: ISearchClientParametersValidator;

  searchTweetsAsync(query: string): Promise<ITweet[]>;

  searchTweetsAsync(geoCode: IGeoCode): Promise<ITweet[]>;

  /// <summary>
  /// Search for tweets
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets </para>
  /// <returns>Tweets matching the search</returns>
  searchTweetsAsync(parameters: ISearchTweetsParameters): Promise<ITweet[]>;

  searchTweetsWithMetadataAsync(query: string): Promise<ISearchResults>;

  /// <summary>
  /// Search for tweets
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets </para>
  /// <returns>Tweets matching the search with search metadata</returns>
  searchTweetsWithMetadataAsync(parameters: ISearchTweetsParameters): Promise<ISearchResults>;

  getSearchTweetsIterator(query: string): ITwitterIterator<ITweet, number>;

  /// <summary>
  /// Search for tweets
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets </para>
  /// <returns>Iterator over the search results</returns>
  getSearchTweetsIterator(parameters: ISearchTweetsParameters): ITwitterIterator<ITweet, number>; // long?

  /// <summary>
  /// Simple set of filters for tweets
  /// </summary>
  /// <param name="tweets">Tweets you want to filter</param>
  /// <param name="filter">What type of tweets you wish to get</param>
  /// <param name="tweetsMustContainGeoInformation">Whether or not the tweet should contain geo information</param>
  /// <returns>Filtered set of tweets</returns>
  filterTweets(tweets: ITweet[], filter?: OnlyGetTweetsThatAre, tweetsMustContainGeoInformation: boolean): ITweet[];

  searchUsersAsync(query: string): Promise<IUser[]>;

  /// <summary>
  /// Search for tweets
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-search </para>
  /// <returns>Users matching the search</returns>
  searchUsersAsync(parameters: ISearchUsersParameters): Promise<IUser[]>;

  getSearchUsersIterator(query: string): ITwitterIterator<IUser, number>; // int?

  /// <summary>
  /// Search for users
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-search </para>
  /// <returns>Iterator over the search results</returns>
  getSearchUsersIterator(parameters: ISearchUsersParameters): ITwitterIterator<IUser, number>;  // int?

  createSavedSearchAsync(query: string): Promise<ISavedSearch>;

  /// <summary>
  /// Create a saved search
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-saved_searches-create </para>
  /// <returns>Created saved search</returns>
  createSavedSearchAsync(parameters: ICreateSavedSearchParameters): Promise<ISavedSearch>;

  getSavedSearchAsync(savedSearchId: number): Promise<ISavedSearch>;

  /// <summary>
  /// Get an existing saved search
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-saved_searches-show-id </para>
  /// <returns>Requested saved search</returns>
  getSavedSearchAsync(parameters: IGetSavedSearchParameters): Promise<ISavedSearch>;

  listSavedSearchesAsync(): Promise<ISavedSearch[]>;

  /// <summary>
  /// List account's saved searches
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-saved_searches-list </para>
  /// <returns>Account's saved searches</returns>
  listSavedSearchesAsync(parameters: IListSavedSearchesParameters): Promise<ISavedSearch[]>;

  destroySavedSearchAsync(savedSearchId: number): Promise<ISavedSearch>;

  destroySavedSearchAsync(savedSearch: ISavedSearch): Promise<ISavedSearch>;

  /// <summary>
  /// Destroys a saved search
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-saved_searches-destroy-id </para>
  /// <returns>Deleted search</returns>
  destroySavedSearchAsync(parameters: IDestroySavedSearchParameters): Promise<ISavedSearch>;
}


export const ISearchClientToken = new InjectionToken<ISearchClient>('ISearchClient', {
  providedIn: 'root',
  factory: () => new,
});
