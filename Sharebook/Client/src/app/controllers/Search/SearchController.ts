import {Inject, InjectionToken} from "@angular/core";

import {ITwitterRequest} from "src/app/core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {FilteredTwitterResult, IFilteredTwitterResult} from "../../core/Core/Web/FilteredTwitterResult";
import {ISearchTweetsParameters, SearchTweetsParameters} from "../../core/Public/Parameters/Search/SearchTweetsParameters";
import {ITwitterPageIterator, TwitterPageIterator} from "../../core/Core/Iterators/TwitterPageIterator";
import {ISearchUsersParameters, SearchUsersParameters} from "../../core/Public/Parameters/Search/SearchUsersParameters";
import {ICreateSavedSearchParameters} from "../../core/Public/Parameters/Search/CreateSavedSearchParameters";
import {ISearchResultsDTO} from "../../core/Public/Models/Interfaces/DTO/ISearchResultsDTO";
import {UserDTO} from "../../core/Core/DTO/UserDTO";
import {SavedSearchDTO} from "../../core/Core/DTO/SavedSearchDTO";
import {IGetSavedSearchParameters} from "../../core/Public/Parameters/Search/GetSavedSearchParameters";
import {IListSavedSearchesParameters} from "../../core/Public/Parameters/Search/ListSavedSearchesParameters";
import {IDestroySavedSearchParameters} from "../../core/Public/Parameters/Search/DestroySavedSearchParameters";
import {ISearchQueryExecutor, ISearchQueryExecutorToken, SearchQueryExecutor} from "./SearchQueryExecutor";
import {TwitterRequest} from "../../core/Public/TwitterRequest";
import HashSet from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/HashSet";

export interface ISearchController {
  getSearchTweetsIterator(parameters: ISearchTweetsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ISearchResultsDTO>, number>; // long?
  getSearchUsersIterator(parameters: ISearchUsersParameters, request: ITwitterRequest): ITwitterPageIterator<IFilteredTwitterResult<UserDTO[]>, number>; // int?
  createSavedSearchAsync(parameters: ICreateSavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>>;

  getSavedSearchAsync(parameters: IGetSavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>>;

  listSavedSearchesAsync(parameters: IListSavedSearchesParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO[]>>;

  destroySavedSearchAsync(parameters: IDestroySavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>>;
}

export const ISearchControllerToken = new InjectionToken<ISearchController>('ISearchController', {
  providedIn: 'root',
  factory: () => new SearchController(Inject(SearchQueryExecutor)),
});

export class SearchController implements ISearchController {
  private readonly _searchQueryExecutor: ISearchQueryExecutor;

  constructor(@Inject(ISearchQueryExecutorToken) searchQueryExecutor: ISearchQueryExecutor) {
    this._searchQueryExecutor = searchQueryExecutor;
  }

  public getSearchTweetsIterator(parameters: ISearchTweetsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ISearchResultsDTO>, number> // long?
  {
    let lastCursor: number = -1;

    function getNextCursor(page: ITwitterResult<ISearchResultsDTO>): number { // long?
      if (page?.model?.searchMetadata?.nextResults == null) {
        return null;
      }

      return page.model.tweetDTOs.reduce((ya, u) => Math.min(ya, u.id), Number.MAX_VALUE);   // Min(x => x.Id) - 1;
    }

    return new TwitterPageIterator<ITwitterResult<ISearchResultsDTO>, number>(parameters.maxId,     // long?
      cursor => {
        let cursoredParameters = new SearchTweetsParameters(parameters);
        cursoredParameters.maxId = cursor;

        return this._searchQueryExecutor.searchTweetsAsync(cursoredParameters, new TwitterRequest(request));
      },
      getNextCursor,
      page => {
        let nextCursor = getNextCursor(page);
        if (nextCursor == null) {
          return true;
        }

        if (lastCursor === nextCursor) {
          return true;
        }

        lastCursor = nextCursor;
        return false;
      });
  }

  public getSearchUsersIterator(parameters: ISearchUsersParameters, request: ITwitterRequest): ITwitterPageIterator<IFilteredTwitterResult<UserDTO[]>, number> {  // int?
    let pageNumber = parameters.page ?? 1;
    let previousResultIds = new HashSet<number>();
    return new TwitterPageIterator<IFilteredTwitterResult<UserDTO[]>, number>(parameters.page,  // int?
      async cursor => {
        let cursoredParameters = new SearchUsersParameters(parameters);
        cursoredParameters.page = cursor;

        let page = await this._searchQueryExecutor.searchUsersAsync(cursoredParameters, new TwitterRequest(request)); // .ConfigureAwait(false);
        let result = new FilteredTwitterResult<UserDTO[]>(page);
        result.FilteredDTO = page.model.filter(x => !previousResultIds.contains(x.id)); // .ToArray();

        return result;
      },
      page => {
        if (page.model.length === 0) {
          return null;
        }

        return ++pageNumber;
      },
      page => {
        let requestUserIds = page.model.map(x => x.id); // .ToArray();
        let newItemIds = requestUserIds.filter(i => !previousResultIds.contains(i));     // .Except(previousResultIds).ToArray();

        for (let newItemId of newItemIds) {
          previousResultIds.add(newItemId);
        }

        return newItemIds.length === 0 || page.model.length === 0;
      });
  }

  public createSavedSearchAsync(parameters: ICreateSavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>> {
    return this._searchQueryExecutor.createSavedSearchAsync(parameters, request);
  }

  public getSavedSearchAsync(parameters: IGetSavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>> {
    return this._searchQueryExecutor.getSavedSearchAsync(parameters, request);
  }

  public listSavedSearchesAsync(parameters: IListSavedSearchesParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO[]>> {
    return this._searchQueryExecutor.listSavedSearchesAsync(parameters, request);
  }

  public destroySavedSearchAsync(parameters: IDestroySavedSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SavedSearchDTO>> {
    return this._searchQueryExecutor.destroySavedSearchAsync(parameters, request);
  }
}
