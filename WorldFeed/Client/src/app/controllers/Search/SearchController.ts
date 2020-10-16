import {ITwitterRequest} from "src/app/core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {IFilteredTwitterResult} from "../../core/Core/Web/FilteredTwitterResult";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';

export interface ISearchController {
  GetSearchTweetsIterator(parameters: ISearchTweetsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ISearchResultsDTO>, number>; // long?
  GetSearchUsersIterator(parameters: ISearchUsersParameters, request: ITwitterRequest): ITwitterPageIterator<IFilteredTwitterResult<UserDTO[]>, number>; // int?
  CreateSavedSearchAsync(parameters: ICreateSavedSearchParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO>>;

  GetSavedSearchAsync(parameters: IGetSavedSearchParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO>>;

  ListSavedSearchesAsync(parameters: IListSavedSearchesParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO[]>>;

  DestroySavedSearchAsync(parameters: IDestroySavedSearchParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO>>;
}

    export class SearchController implements ISearchController
    {
        private readonly _searchQueryExecutor: ISearchQueryExecutor;

        constructor(searchQueryExecutor: ISearchQueryExecutor)
        {
            this._searchQueryExecutor = searchQueryExecutor;
        }

        public GetSearchTweetsIterator(parameters: ISearchTweetsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ISearchResultsDTO>, number> // long?
    {
            let lastCursor: number = -1;

            long? getNextCursor(ITwitterResult<ISearchResultsDTO> page)
            {
                if (page?.Model?.SearchMetadata?.NextResults == null)
                {
                    return null;
                }

                return page.Model.TweetDTOs.Min(x => x.Id) - 1;
            }

            return new TwitterPageIterator<ITwitterResult<ISearchResultsDTO>, number>(   // long?
                parameters.MaxId,
                cursor =>
                {
                    var cursoredParameters = new SearchTweetsParameters(parameters)
                    {
                        MaxId = cursor
                    };

                    return _searchQueryExecutor.SearchTweetsAsync(cursoredParameters, new TwitterRequest(request));
                },
                getNextCursor,
                page =>
                {
                    var nextCursor = getNextCursor(page);
                    if (nextCursor == null)
                    {
                        return true;
                    }

                    if (lastCursor == nextCursor)
                    {
                        return true;
                    }

                    lastCursor = nextCursor.Value;
                    return false;
                });
        }

        public  GetSearchUsersIterator(parameters: ISearchUsersParameters, request: ITwitterRequest): ITwitterPageIterator<IFilteredTwitterResult<UserDTO[]>, number> // int?
        {
            var pageNumber = parameters.Page ?? 1;
            var previousResultIds = new HashSet<long>();
            return new TwitterPageIterator<IFilteredTwitterResult<UserDTO[]>, number>(    // int?
                parameters.Page,
                async cursor =>
                {
                    var cursoredParameters = new SearchUsersParameters(parameters)
                    {
                        Page = cursor
                    };

                    var page = await _searchQueryExecutor.SearchUsersAsync(cursoredParameters, new TwitterRequest(request)).ConfigureAwait(false);
                    return new FilteredTwitterResult<UserDTO[]>(page)
                    {
                        FilteredDTO = page.Model.Where(x => !previousResultIds.Contains(x.Id)).ToArray()
                    };
                },
                page =>
                {
                    if (page.Model.Length == 0)
                    {
                        return null;
                    }

                    return ++pageNumber;
                },
                page =>
                {
                    var requestUserIds = page.Model.Select(x => x.Id).ToArray();
                    var newItemIds = requestUserIds.Except(previousResultIds).ToArray();

                    foreach (var newItemId in newItemIds)
                    {
                        previousResultIds.Add(newItemId);
                    }

                    return newItemIds.Length == 0 || page.Model.Length == 0;
                });
        }

        public CreateSavedSearchAsync(parameters: ICreateSavedSearchParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO>>
{
            return _searchQueryExecutor.CreateSavedSearchAsync(parameters, request);
        }

        public GetSavedSearchAsync(parameters: IGetSavedSearchParameters, request: ITwitterRequest): Task<ITwitterResult<SavedSearchDTO>>
    {
            return _searchQueryExecutor.GetSavedSearchAsync(parameters, request);
        }

        public ListSavedSearchesAsync(parameters: IListSavedSearchesParameters, request: ITwitterRequest):  Task<ITwitterResult<SavedSearchDTO[]>>
        {
            return _searchQueryExecutor.ListSavedSearchesAsync(parameters, request);
        }

        public DestroySavedSearchAsync(parameters: IDestroySavedSearchParameters, request: ITwitterRequest):  Task<ITwitterResult<SavedSearchDTO>>
        {
            return _searchQueryExecutor.DestroySavedSearchAsync(parameters, request);
        }
    }
