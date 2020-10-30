import {Inject, InjectionToken} from "@angular/core";

import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import {ISearchTweetsParameters} from "../../core/Public/Parameters/Search/SearchTweetsParameters";
import {ISearchUsersParameters} from "../../core/Public/Parameters/Search/SearchUsersParameters";
import {ICreateSavedSearchParameters} from "../../core/Public/Parameters/Search/CreateSavedSearchParameters";
import {IGetSavedSearchParameters} from "../../core/Public/Parameters/Search/GetSavedSearchParameters";
import {IListSavedSearchesParameters} from "../../core/Public/Parameters/Search/ListSavedSearchesParameters";
import {IDestroySavedSearchParameters} from "../../core/Public/Parameters/Search/DestroySavedSearchParameters";
import {ISearchResultsDTO} from "../../core/Public/Models/Interfaces/DTO/ISearchResultsDTO";
import {UserDTO} from "../../core/Core/DTO/UserDTO";
import {SavedSearchDTO} from "../../core/Core/DTO/SavedSearchDTO";
import {ISearchQueryGenerator, SearchQueryGenerator} from "./SearchQueryGenerator";
import {TwitterAccessor} from "../../Tweetinvi.Credentials/TwitterAccessor";

export interface ISearchQueryExecutor {
  searchTweetsAsync(parameters: ISearchTweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ISearchResultsDTO>>;

  searchUsersAsync(parameters: ISearchUsersParameters, request: ITwitterRequest): Promise<ITwitterResult<UserDTO[]>>;

  createSavedSearchAsync(parameters: ICreateSavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>>;

  getSavedSearchAsync(parameters: IGetSavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>>;

  listSavedSearchesAsync(parameters: IListSavedSearchesParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO[]>>;

  destroySavedSearchAsync(parameters: IDestroySavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>>;
}

export const ISearchQueryExecutorToken = new InjectionToken<ISearchQueryExecutor>('ISearchQueryExecutor', {
  providedIn: 'root',
  factory: () => new SearchQueryExecutor(Inject(SearchQueryGenerator), Inject(TwitterAccessor)),
});

export class SearchQueryExecutor implements ISearchQueryExecutor {
  private readonly _searchQueryGenerator: ISearchQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(searchQueryGenerator: ISearchQueryGenerator, twitterAccessor: ITwitterAccessor) {
    this._searchQueryGenerator = searchQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public searchTweetsAsync(parameters: ISearchTweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ISearchResultsDTO>> {
    request.query.url = this._searchQueryGenerator.getSearchTweetsQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ISearchResultsDTO>(request);
  }

  public searchUsersAsync(parameters: ISearchUsersParameters, request: ITwitterRequest): Promise<ITwitterResult<UserDTO[]>> {
    request.query.url = this._searchQueryGenerator.getSearchUsersQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<UserDTO[]>(request);
  }

  public createSavedSearchAsync(parameters: ICreateSavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>> {
    request.query.url = this._searchQueryGenerator.getCreateSavedSearchQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<SavedSearchDTO>(request);
  }

  public getSavedSearchAsync(parameters: IGetSavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>> {
    request.query.url = this._searchQueryGenerator.getSavedSearchQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<SavedSearchDTO>(request);
  }

  public listSavedSearchesAsync(parameters: IListSavedSearchesParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO[]>> {
    request.query.url = this._searchQueryGenerator.getListSavedSearchQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<SavedSearchDTO[]>(request);
  }

  public destroySavedSearchAsync(parameters: IDestroySavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>> {
    request.query.url = this._searchQueryGenerator.getDestroySavedSearchQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<SavedSearchDTO>(request);
  }
}
