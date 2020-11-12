import {Inject, Injectable} from "@angular/core";

import {BaseRequester} from "../BaseRequester";
import {ISearchRequester} from "../../../core/Public/Client/Requesters/ISearchRequester";
import {ITwitterResult} from 'src/app/core/Core/Web/TwitterResult';
import {ISearchController, ISearchControllerToken} from "../../../controllers/Search/SearchController";
import {
  ISearchClientRequiredParametersValidator,
  ISearchClientRequiredParametersValidatorToken
} from "../../../core/Core/Client/Validators/SearchClientRequiredParametersValidator";
import {ITwitterClientEvents, ITwitterClientEventsToken} from "../../../core/Core/Events/TweetinviGlobalEvents";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
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

@Injectable({
  providedIn: 'root',
})
export class SearchRequester extends BaseRequester implements ISearchRequester {
  private readonly _searchController: ISearchController;
  private readonly _validator: ISearchClientRequiredParametersValidator;

  constructor(@Inject(ISearchControllerToken) searchController: ISearchController,
              @Inject(ISearchClientRequiredParametersValidatorToken) validator: ISearchClientRequiredParametersValidator,
              @Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(ITwitterClientEventsToken) twitterClientEvents: ITwitterClientEvents) {
    super(client, twitterClientEvents);

    this._searchController = searchController;
    this._validator = validator;
  }

  public getSearchTweetsIterator(parameters: ISearchTweetsParameters): ITwitterPageIterator<ITwitterResult<ISearchResultsDTO>, number> { // long?
    this._validator.validate(parameters);

    let request = super.TwitterClient.createRequest();
    return this._searchController.getSearchTweetsIterator(parameters, request);
  }

  public getSearchUsersIterator(parameters: ISearchUsersParameters): ITwitterPageIterator<IFilteredTwitterResult<UserDTO[]>, number> {   // int?
    this._validator.validate(parameters);

    let request = super.TwitterClient.createRequest();
    return this._searchController.getSearchUsersIterator(parameters, request);
  }

  public createSavedSearchAsync(parameters: ICreateSavedSearchParameters): Promise<ITwitterResult<SavedSearchDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._searchController.createSavedSearchAsync(parameters, request));
  }

  public getSavedSearchAsync(parameters: IGetSavedSearchParameters): Promise<ITwitterResult<SavedSearchDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._searchController.getSavedSearchAsync(parameters, request));
  }

  public listSavedSearchesAsync(parameters: IListSavedSearchesParameters): Promise<ITwitterResult<SavedSearchDTO[]>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._searchController.listSavedSearchesAsync(parameters, request));
  }

  public destroySavedSearchAsync(parameters: IDestroySavedSearchParameters): Promise<ITwitterResult<SavedSearchDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._searchController.destroySavedSearchAsync(parameters, request));
  }
}
