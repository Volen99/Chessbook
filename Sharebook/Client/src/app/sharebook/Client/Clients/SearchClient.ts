import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {OnlyGetTweetsThatAre} from "../../../core/Public/Parameters/Enum/OnlyGetTweetsThatAre";
import {ISearchClient} from "../../../core/Public/Client/Clients/ISearchClient";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {ISearchClientParametersValidator} from "../../../core/Core/Client/Validators/SearchClientParametersValidator";
import {ITweet} from "../../../core/Public/Models/Interfaces/ITweet";
import {ISearchTweetsParameters, SearchTweetsParameters} from "../../../core/Public/Parameters/Search/SearchTweetsParameters";
import {IGeoCode} from "../../../core/Public/Models/Interfaces/IGeoCode";
import {ISearchResults} from "../../../core/Public/Models/Interfaces/ISearchResults";
import {ITwitterIterator} from "../../../core/Public/Iterators/ITwitterIterator";
import {TwitterIteratorProxy} from "../../../core/Core/Iterators/TwitterIteratorProxy";
import {ISearchResultsDTO} from "../../../core/Public/Models/Interfaces/DTO/ISearchResultsDTO";
import {
  DestroySavedSearchParameters,
  IDestroySavedSearchParameters
} from "../../../core/Public/Parameters/Search/DestroySavedSearchParameters";
import {ISavedSearch} from "../../../core/Public/Models/Interfaces/ISavedSearch";
import {
  IListSavedSearchesParameters,
  ListSavedSearchesParameters
} from "../../../core/Public/Parameters/Search/ListSavedSearchesParameters";
import {ISearchUsersParameters, SearchUsersParameters} from "../../../core/Public/Parameters/Search/SearchUsersParameters";
import {IUser} from "../../../core/Public/Models/Interfaces/IUser";
import {IFilteredTwitterResult} from "../../../core/Core/Web/FilteredTwitterResult";
import {UserDTO} from "../../../core/Core/DTO/UserDTO";
import {ICreateSavedSearchParameters} from "../../../core/Public/Parameters/Search/CreateSavedSearchParameters";
import {GetSavedSearchParameters, IGetSavedSearchParameters} from "../../../core/Public/Parameters/Search/GetSavedSearchParameters";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class SearchClient implements ISearchClient {
  private readonly _client: ITwitterClient;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient) {
    this._client = client;
  }

  get parametersValidator(): ISearchClientParametersValidator {
    return this._client.parametersValidator;
  }

  public async searchTweetsAsync(queryOrGeoCodeOrParameters: string | IGeoCode | ISearchTweetsParameters): Promise<ITweet[]> {
    let parameters: ISearchTweetsParameters;
    if (this.isISearchTweetsParameters(queryOrGeoCodeOrParameters)) {
      parameters = queryOrGeoCodeOrParameters;
    } else {
      parameters = new SearchTweetsParameters(queryOrGeoCodeOrParameters);
    }

    let iterator = this.getSearchTweetsIterator(parameters);
    return (await iterator.nextPageAsync()); // .ConfigureAwait(false)).ToArray();
  }

  public async searchTweetsWithMetadataAsync(queryOrParameters: string | ISearchTweetsParameters): Promise<ISearchResults> {
    let parameters: ISearchTweetsParameters;
    if (this.isISearchTweetsParameters(queryOrParameters)) {
      parameters = queryOrParameters;
    } else {
      parameters = new SearchTweetsParameters(queryOrParameters);
    }

    let pageIterator = this._client.raw.search.getSearchTweetsIterator(parameters);
    let page = await pageIterator.nextPageAsync();                                     // .ConfigureAwait(false);
    return this._client.factories.createSearchResult(page?.content?.model);
  }

  public getSearchTweetsIterator(queryOrParameters: string | ISearchTweetsParameters): ITwitterIterator<ITweet, number> {       // long?
    let parameters: ISearchTweetsParameters;
    if (this.isISearchTweetsParameters(queryOrParameters)) {
      parameters = queryOrParameters;
    } else {
      parameters = new SearchTweetsParameters(queryOrParameters);
    }

    let pageIterator = this._client.raw.search.getSearchTweetsIterator(parameters);
    return new TwitterIteratorProxy<ITwitterResult<ISearchResultsDTO>, ITweet, number>(pageIterator,  // number?
      twitterResult => this._client.factories.createTweets(twitterResult?.model?.tweetDTOs));
  }

  public filterTweets(tweets: ITweet[], filter?: OnlyGetTweetsThatAre, tweetsMustContainGeoInformation: boolean): ITweet[] {
    let matchingTweets: Array<ITweet> = tweets;

    if (filter === OnlyGetTweetsThatAre.OriginalTweets) {
      matchingTweets = matchingTweets.filter(x => x.retweetedTweet == null); // .ToArray();
    }

    if (filter === OnlyGetTweetsThatAre.Retweets) {
      matchingTweets = matchingTweets.filter(x => x.retweetedTweet != null); // .ToArray();
    }

    if (matchingTweets != null && tweetsMustContainGeoInformation) {
      matchingTweets = matchingTweets.filter(x => x.coordinates != null || x.place != null);
    }

    return matchingTweets; // ?.ToArray();
  }

  public async searchUsersAsync(queryOrParameters: string | ISearchUsersParameters): Promise<IUser[]> {
    let parameters: ISearchUsersParameters;
    if (this.isISearchTweetsParameters(queryOrParameters)) {
      parameters = queryOrParameters;
    } else {
      parameters = new SearchUsersParameters(queryOrParameters);
    }

    let pageIterator = this.getSearchUsersIterator(parameters);
    return (await pageIterator.nextPageAsync()); // .ConfigureAwait(false)).ToArray();
  }

  public getSearchUsersIterator(queryOrParameters: string | ISearchUsersParameters): ITwitterIterator<IUser, number> {      // number?
    let parameters: ISearchUsersParameters;
    if (this.isISearchTweetsParameters(queryOrParameters)) {
      parameters = queryOrParameters;
    } else {
      parameters = new SearchUsersParameters(queryOrParameters);
    }

    let pageIterator = this._client.raw.search.getSearchUsersIterator(parameters);
    return new TwitterIteratorProxy<IFilteredTwitterResult<UserDTO[]>, IUser, number>(pageIterator,    // number?
      twitterResult => this._client.factories.createUsers(twitterResult?.FilteredDTO));
  }

  public async createSavedSearchAsync(queryOrParameters: string | ICreateSavedSearchParameters): Promise<ISavedSearch> {
    let parameters: ICreateSavedSearchParameters;
    if (this.isICreateSavedSearchParameters(queryOrParameters)) {
      parameters = queryOrParameters;
    } else {
      parameters = new SearchUsersParameters(queryOrParameters);
    }

    let twitterResult = await this._client.raw.search.createSavedSearchAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createSavedSearch(twitterResult?.model);
  }

  public async getSavedSearchAsync(savedSearchIdOrParameters: number | IGetSavedSearchParameters): Promise<ISavedSearch> {
    let parameters: IGetSavedSearchParameters;
    if (this.isIGetSavedSearchParameters(savedSearchIdOrParameters)) {
      parameters = savedSearchIdOrParameters;
    } else {
      parameters = new GetSavedSearchParameters(savedSearchIdOrParameters);
    }

    let twitterResult = await this._client.raw.search.getSavedSearchAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createSavedSearch(twitterResult?.model);
  }

  public async listSavedSearchesAsync(parameters?: IListSavedSearchesParameters): Promise<ISavedSearch[]> {
    let parametersCurrent: IListSavedSearchesParameters;
    if (parameters) {
      parametersCurrent = parameters;
    } else {
      parametersCurrent = new ListSavedSearchesParameters();
    }

    let twitterResult = await this._client.raw.search.listSavedSearchesAsync(parametersCurrent); // .ConfigureAwait(false);
    return twitterResult?.model?.map(this._client.factories.createSavedSearch); // .ToArray();
  }

  public async destroySavedSearchAsync(savedSearchIdOrSearchOrParameters: number | ISavedSearch | IDestroySavedSearchParameters): Promise<ISavedSearch> {
    let parameters: IDestroySavedSearchParameters;
    if (this.isIDestroySavedSearchParameters(savedSearchIdOrSearchOrParameters)) {
      parameters = savedSearchIdOrSearchOrParameters;
    } else {
      parameters = new DestroySavedSearchParameters(savedSearchIdOrSearchOrParameters);
    }

    let twitterResult = await this._client.raw.search.destroySavedSearchAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createSavedSearch(twitterResult?.model);
  }

  private isISearchTweetsParameters(queryOrGeoCodeOrParameters: any): queryOrGeoCodeOrParameters is ISearchTweetsParameters {
    return (queryOrGeoCodeOrParameters as ISearchTweetsParameters).filters !== undefined;
  }

  private isICreateSavedSearchParameters(queryOrParameters: any): queryOrParameters is ICreateSavedSearchParameters {
    return (queryOrParameters as ICreateSavedSearchParameters).query !== undefined;
  }

  private isIGetSavedSearchParameters(savedSearchIdOrParameters: any): savedSearchIdOrParameters is IGetSavedSearchParameters {
    return (savedSearchIdOrParameters as IGetSavedSearchParameters).savedSearchId !== undefined;
  }

  private isIDestroySavedSearchParameters(savedSearchIdOrSearchOrParameters: any): savedSearchIdOrSearchOrParameters is IDestroySavedSearchParameters {
    return (savedSearchIdOrSearchOrParameters as IDestroySavedSearchParameters).savedSearchId !== undefined;
  }
}
