import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';

export interface ISearchQueryExecutor {
  SearchTweetsAsync(parameters: ISearchTweetsParameters, request: ITwitterRequest): Task<ITwitterResult<ISearchResultsDTO>>;

  SearchUsersAsync(parameters: ISearchUsersParameters, request: ITwitterRequest): Task<ITwitterResult<UserDTO[]>>;

  CreateSavedSearchAsync(parameters: ICreateSavedSearchParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO>>;

  GetSavedSearchAsync(parameters: IGetSavedSearchParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO>>;

  ListSavedSearchesAsync(parameters: IListSavedSearchesParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO[]>>;

  DestroySavedSearchAsync(parameters: IDestroySavedSearchParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO>>;
}

export class SearchQueryExecutor implements ISearchQueryExecutor {
  private readonly _searchQueryGenerator: ISearchQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(searchQueryGenerator: ISearchQueryGenerator, twitterAccessor: ITwitterAccessor) {
    this._searchQueryGenerator = searchQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public SearchTweetsAsync(parameters: ISearchTweetsParameters, request: ITwitterRequest): Task<ITwitterResult<ISearchResultsDTO>> {
    request.query.url = this._searchQueryGenerator.GetSearchTweetsQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ISearchResultsDTO>(request);
  }

  public SearchUsersAsync(parameters: ISearchUsersParameters, request: ITwitterRequest): Task<ITwitterResult<UserDTO[]>> {
    request.query.url = this._searchQueryGenerator.GetSearchUsersQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<UserDTO[]>(request);
  }

  public CreateSavedSearchAsync(parameters: ICreateSavedSearchParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO>> {
    request.query.url = this._searchQueryGenerator.GetCreateSavedSearchQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<SavedSearchDTO>(request);
  }

  public GetSavedSearchAsync(parameters: IGetSavedSearchParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO>> {
    request.query.url = this._searchQueryGenerator.GetSavedSearchQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<SavedSearchDTO>(request);
  }

  public ListSavedSearchesAsync(parameters: IListSavedSearchesParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO[]>> {
    request.query.url = this._searchQueryGenerator.GetListSavedSearchQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<SavedSearchDTO[]>(request);
  }

  public DestroySavedSearchAsync(parameters: IDestroySavedSearchParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO>> {
    request.query.url = this._searchQueryGenerator.GetDestroySavedSearchQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<SavedSearchDTO>(request);
  }
}
