import {BaseRequester} from "../BaseRequester";
import {ISearchRequester} from "../../../core/Public/Client/Requesters/ISearchRequester";
import {ITwitterResult} from 'src/app/core/Core/Web/TwitterResult';
import {ISearchController} from "../../../controllers/Search/SearchController";
import {ISearchClientRequiredParametersValidator} from "../../../core/Core/Client/Validators/SearchClientRequiredParametersValidator";
import {ITwitterClientEvents} from "../../../core/Core/Events/TweetinviGlobalEvents";
import {ITwitterClient} from "../../../core/Public/ITwitterClient";
import {ISearchTweetsParameters} from "../../../core/Public/Parameters/Search/SearchTweetsParameters";
import {ITwitterPageIterator} from "../../../core/Core/Iterators/TwitterPageIterator";
import {ISearchResultsDTO} from "../../../core/Public/Models/Interfaces/DTO/ISearchResultsDTO";
import {ISearchUsersParameters} from "../../../core/Public/Parameters/Search/SearchUsersParameters";
import {IFilteredTwitterResult} from "../../../core/Core/Web/FilteredTwitterResult";
import {UserDTO} from "../../../core/Core/DTO/UserDTO";
import {ICreateSavedSearchParameters} from "../../../core/Public/Parameters/Search/CreateSavedSearchParameters";
import {SavedSearchDTO} from "../../../core/Core/DTO/SavedSearchDTO";
import {IGetSavedSearchParameters} from "../../../core/Public/Parameters/Search/GetSavedSearchParameters";
import {IListSavedSearchesParameters} from "../../../core/Public/Parameters/Search/ListSavedSearchesParameters";
import {IDestroySavedSearchParameters} from "../../../core/Public/Parameters/Search/DestroySavedSearchParameters";

export class SearchRequester extends BaseRequester implements ISearchRequester {
  private readonly _searchController: ISearchController;
  private readonly _validator: ISearchClientRequiredParametersValidator;

  constructor(searchController: ISearchController, validator: ISearchClientRequiredParametersValidator,
              client: ITwitterClient, twitterClientEvents: ITwitterClientEvents) {
    super(client, twitterClientEvents);
    this._searchController = searchController;
    this._validator = validator;
  }

  public getSearchTweetsIterator(parameters: ISearchTweetsParameters): ITwitterPageIterator<ITwitterResult<ISearchResultsDTO>, number> // long?
  {
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    return this._searchController.GetSearchTweetsIterator(parameters, request);
  }

  public getSearchUsersIterator(parameters: ISearchUsersParameters): ITwitterPageIterator<IFilteredTwitterResult<UserDTO[]>, number>  // int?
  {
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    return this._searchController.GetSearchUsersIterator(parameters, request);
  }

  public createSavedSearchAsync(parameters: ICreateSavedSearchParameters): Promise<ITwitterResult<SavedSearchDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._searchController.CreateSavedSearchAsync(parameters, request));
  }

  public getSavedSearchAsync(parameters: IGetSavedSearchParameters): Promise<ITwitterResult<SavedSearchDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._searchController.GetSavedSearchAsync(parameters, request));
  }

  public listSavedSearchesAsync(parameters: IListSavedSearchesParameters): Promise<ITwitterResult<SavedSearchDTO[]>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._searchController.ListSavedSearchesAsync(parameters, request));
  }

  public destroySavedSearchAsync(parameters: IDestroySavedSearchParameters): Promise<ITwitterResult<SavedSearchDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._searchController.DestroySavedSearchAsync(parameters, request));
  }
}
