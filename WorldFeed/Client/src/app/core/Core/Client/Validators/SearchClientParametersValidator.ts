import {ISearchTweetsParameters} from "../../../Public/Parameters/Search/SearchTweetsParameters";
import {ISearchUsersParameters} from "../../../Public/Parameters/Search/SearchUsersParameters";
import {ICreateSavedSearchParameters} from "../../../Public/Parameters/Search/CreateSavedSearchParameters";
import {IGetSavedSearchParameters} from "../../../Public/Parameters/Search/GetSavedSearchParameters";
import {IListSavedSearchesParameters} from "../../../Public/Parameters/Search/ListSavedSearchesParameters";
import {IDestroySavedSearchParameters} from "../../../Public/Parameters/Search/DestroySavedSearchParameters";
import {ITwitterClient} from "../../../Public/ITwitterClient";
import {ISearchClientRequiredParametersValidator} from './SearchClientRequiredParametersValidator';
import {SearchParameters} from "./parameters-types";
import {TweetSearchFilters} from "../../../Public/Parameters/Enum/TweetSearchFilters";
import ArgumentException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException';
import {TwitterArgumentLimitException} from "../../../Public/Exceptions/TwitterArgumentLimitException";
import {IGeoCode} from "../../../Public/Models/Interfaces/IGeoCode";

export interface ISearchClientParametersValidator {
  validate(parameters: ISearchTweetsParameters): void;

  validate(parameters: ISearchUsersParameters): void;

  validate(parameters: ICreateSavedSearchParameters): void;

  validate(parameters: IGetSavedSearchParameters): void;

  validate(parameters: IListSavedSearchesParameters): void;

  validate(parameters: IDestroySavedSearchParameters): void;
}

export class SearchClientParametersValidator implements ISearchClientParametersValidator {
  private readonly _client: ITwitterClient;
  private readonly _searchClientRequiredParametersValidator: ISearchClientRequiredParametersValidator;

  constructor(client: ITwitterClient, searchClientRequiredParametersValidator: ISearchClientRequiredParametersValidator) {
    this._client = client;
    this._searchClientRequiredParametersValidator = searchClientRequiredParametersValidator;
  }

  public validate(parameters: SearchParameters): void {
    this._searchClientRequiredParametersValidator.validate(parameters);

    if (this.isISearchTweetsParameters(parameters)) {
      let isSearchQuerySet = !!parameters.query;
      let isSearchQueryValid = this.isSearchQueryValid(parameters.query);
      let isGeoCodeSet = this.isGeoCodeValid(parameters.geoCode);
      let isEntitiesTypeSet = parameters.filters !== TweetSearchFilters.None;

      let isSearchValid = (isSearchQuerySet && isSearchQueryValid) || isGeoCodeSet || isEntitiesTypeSet;
      if (!isSearchValid) {
        throw new ArgumentException("At least one of the required parameters needs to be valid (query, geocode or filter).");
      }

      let maxPageSize = this._client.config.limits.SEARCH_TWEETS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this._client.config.limits.SEARCH_TWEETS_MAX_PAGE_SIZE), "page size");
      }
    } else if (this.isISearchUsersParameters(parameters)) {
      let maxPageSize = this._client.config.limits.SEARCH_USERS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this._client.config.limits.SEARCH_USERS_MAX_PAGE_SIZE), "page size");
      }
    }
  }

  private isSearchQueryValid(searchQuery: string): boolean {
    // We might want to restrict the size to 1000 characters as indicated in the documentation
    return !!searchQuery;
  }

  private isGeoCodeValid(geoCode: IGeoCode): boolean {
    return geoCode != null;
  }

  private isISearchTweetsParameters(parameters: SearchParameters): parameters is ISearchTweetsParameters {
    return (parameters as ISearchTweetsParameters).filters !== undefined;
  }

  private isISearchUsersParameters(parameters: SearchParameters): parameters is ISearchUsersParameters {
    return (parameters as ISearchUsersParameters).query !== undefined;
  }
}
