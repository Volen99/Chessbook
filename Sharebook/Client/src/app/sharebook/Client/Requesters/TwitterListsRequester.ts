import {Inject, Injectable} from "@angular/core";

import {BaseRequester} from "../BaseRequester";
import {ITwitterListsRequester} from "../../../core/Public/Client/Requesters/ITwitterListsRequester";
import {ITwitterResult, ITwitterResultFactory, ITwitterResultFactoryToken} from "../../../core/Core/Web/TwitterResult";
import {
  ITwitterListsClientRequiredParametersValidator,
  ITwitterListsClientRequiredParametersValidatorToken
} from "../../../core/Core/Client/Validators/TwitterListsClientRequiredParametersValidator";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {ITwitterListController, ITwitterListControllerToken} from "../../../core/Core/Controllers/ITwitterListController";
import {ITwitterClientFactories, ITwitterClientFactoriesToken} from "../../../core/Public/Client/Tools/ITwitterClientFactories";
import {ICreateListParameters} from "../../../core/Public/Parameters/ListsClient/CreateListParameters";
import {ITwitterListDTO} from "../../../core/Public/Models/Interfaces/DTO/ITwitterListDTO";
import {IGetListParameters} from "../../../core/Public/Parameters/ListsClient/GetListParameters";
import {IGetListsSubscribedByUserParameters} from "../../../core/Public/Parameters/ListsClient/GetListsSubscribedByUserParameters";
import {IUpdateListParameters} from "../../../core/Public/Parameters/ListsClient/UpdateListParameters";
import {IDestroyListParameters} from "../../../core/Public/Parameters/ListsClient/DestroyListParameters";
import {IGetListsOwnedByAccountParameters} from "../../../core/Public/Parameters/ListsClient/GetListsOwnedByAccountParameters";
import {ITwitterPageIterator} from "../../../core/Core/Iterators/TwitterPageIterator";
import {
  GetListsOwnedByAccountByUserParameters,
  IGetListsOwnedByUserParameters
} from "../../../core/Public/Parameters/ListsClient/GetListsOwnedByUserParameters";
import {IAddMemberToListParameters} from "../../../core/Public/Parameters/ListsClient/Members/AddMemberToListParameters";
import {IAddMembersToListParameters} from "../../../core/Public/Parameters/ListsClient/Members/AddMembersToListParameters";
import {IGetAccountListMembershipsParameters} from "../../../core/Public/Parameters/ListsClient/Members/GetAccountListMembershipsParameters";
import {
  GetUserListMembershipsParameters,
  IGetUserListMembershipsParameters
} from "../../../core/Public/Parameters/ListsClient/Members/GetUserListMembershipsParameters";
import {IGetMembersOfListParameters} from "../../../core/Public/Parameters/ListsClient/Members/GetMembersOfListParameters";
import {ICheckIfUserIsMemberOfListParameters} from "../../../core/Public/Parameters/ListsClient/Members/CheckIfUserIsMemberOfListParameters";
import {IRemoveMemberFromListParameters} from "../../../core/Public/Parameters/ListsClient/Members/RemoveMemberFromListParameters";
import {IRemoveMembersFromListParameters} from "../../../core/Public/Parameters/ListsClient/Members/RemoveMembersFromListParameters";
import {ISubscribeToListParameters} from "../../../core/Public/Parameters/ListsClient/Subscribers/SubscribeToListParameters";
import {IUnsubscribeFromListParameters} from "../../../core/Public/Parameters/ListsClient/Subscribers/UnsubscribeFromListParameters";
import {IGetListSubscribersParameters} from "../../../core/Public/Parameters/ListsClient/Subscribers/GetListSubscribersParameters";
import {IGetAccountListSubscriptionsParameters} from "../../../core/Public/Parameters/ListsClient/Subscribers/GetAccountListSubscriptionsParameters";
import {
  GetUserListSubscriptionsParameters,
  IGetUserListSubscriptionsParameters
} from "../../../core/Public/Parameters/ListsClient/Subscribers/GetUserListSubscriptionsParameters";
import {ICheckIfUserIsSubscriberOfListParameters} from "../../../core/Public/Parameters/ListsClient/Subscribers/CheckIfUserIsSubscriberOfListParameters";
import {IGetTweetsFromListParameters} from "../../../core/Public/Parameters/ListsClient/GetTweetsFromListParameters";
import {ITwitterListCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/ITwitterListCursorQueryResultDTO";
import {IUserCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {ITweetDTO} from "../../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import {ITwitterList} from "../../../core/Public/Models/Interfaces/ITwitterList";
import {ITwitterRequest} from "../../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterClientEvents, ITwitterClientEventsToken} from "../../../core/Core/Events/TweetinviGlobalEvents";
import {JsonQueryConverterRepository} from "../../../core/Core/JsonConverters/JsonQueryConverterRepository";

@Injectable({
  providedIn: 'root',
})
export class TwitterListsRequester extends BaseRequester implements ITwitterListsRequester {
  private readonly _twitterResultFactory: ITwitterResultFactory;
  private readonly _factories: ITwitterClientFactories;
  private readonly _twitterListController: ITwitterListController;
  private readonly _validator: ITwitterListsClientRequiredParametersValidator;

  constructor(
    @Inject(ITwitterClientToken) client: ITwitterClient,
    @Inject(ITwitterClientEventsToken) clientEvents: ITwitterClientEvents,
    @Inject(ITwitterResultFactoryToken) twitterResultFactory: ITwitterResultFactory,
    @Inject(ITwitterClientFactoriesToken) factories: ITwitterClientFactories,
    @Inject(ITwitterListControllerToken) twitterListController: ITwitterListController,
    @Inject(ITwitterListsClientRequiredParametersValidatorToken) validator: ITwitterListsClientRequiredParametersValidator) {
    super(client, clientEvents);

    this._twitterResultFactory = twitterResultFactory;
    this._factories = factories;
    this._twitterListController = twitterListController;
    this._validator = validator;
  }

  public createListAsync(parameters: ICreateListParameters): Promise<ITwitterResult<ITwitterListDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._twitterListController.createListAsync(parameters, request));
  }

  public getListAsync(parameters: IGetListParameters): Promise<ITwitterResult<ITwitterListDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._twitterListController.getListAsync(parameters, request));
  }

  public getListsSubscribedByUserAsync(parameters: IGetListsSubscribedByUserParameters): Promise<ITwitterResult<ITwitterListDTO[]>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._twitterListController.getListsSubscribedByUserAsync(parameters, request));
  }

  public updateListAsync(parameters: IUpdateListParameters): Promise<ITwitterResult<ITwitterListDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._twitterListController.updateListAsync(parameters, request));
  }

  public destroyListAsync(parameters: IDestroyListParameters): Promise<ITwitterResult<ITwitterListDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._twitterListController.destroyListAsync(parameters, request));
  }

  public getListsOwnedByAccountIterator(parameters: IGetListsOwnedByAccountParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request: ITwitterRequest = super.TwitterClient.createRequest();
    request.executionContext.converters = JsonQueryConverterRepository.Converters;
    return this._twitterListController.getListsOwnedByUserIterator(new GetListsOwnedByAccountByUserParameters(parameters), request);
  }

  public getListsOwnedByUserIterator(parameters: IGetListsOwnedByUserParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request: ITwitterRequest = super.TwitterClient.createRequest();
    request.executionContext.converters = JsonQueryConverterRepository.Converters;
    return this._twitterListController.getListsOwnedByUserIterator(parameters, request);
  }

  public addMemberToListAsync(parameters: IAddMemberToListParameters): Promise<ITwitterResult<ITwitterListDTO, ITwitterList>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(async request => {
      let twitterResult: ITwitterResult<ITwitterListDTO> = await this._twitterListController.addMemberToListAsync(parameters, request); // .ConfigureAwait(false);
      return this._twitterResultFactory.create(twitterResult, dto => this._factories.createTwitterList(dto));
    });
  }

  public addMembersToListAsync(parameters: IAddMembersToListParameters): Promise<ITwitterResult<ITwitterListDTO, ITwitterList>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(async request => {
      let twitterResult: ITwitterResult<ITwitterListDTO> = await this._twitterListController.addMembersToListAsync(parameters, request); // .ConfigureAwait(false);
      return this._twitterResultFactory.create(twitterResult, dto => this._factories.createTwitterList(dto));
    });
  }

  public getAccountListMembershipsIterator(parameters: IGetAccountListMembershipsParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request: ITwitterRequest = super.TwitterClient.createRequest();
    request.executionContext.converters = JsonQueryConverterRepository.Converters;
    return this._twitterListController.getUserListMembershipsIterator(new GetUserListMembershipsParameters(parameters), request);
  }

  public getUserListMembershipsIterator(parameters: IGetUserListMembershipsParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request: ITwitterRequest = super.TwitterClient.createRequest();
    request.executionContext.converters = JsonQueryConverterRepository.Converters;
    return this._twitterListController.getUserListMembershipsIterator(parameters, request);
  }

  public getMembersOfListIterator(parameters: IGetMembersOfListParameters): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request: ITwitterRequest = super.TwitterClient.createRequest();
    request.executionContext.converters = JsonQueryConverterRepository.Converters;
    return this._twitterListController.getMembersOfListIterator(parameters, request);
  }

  public checkIfUserIsAListMemberAsync(parameters: ICheckIfUserIsMemberOfListParameters): Promise<ITwitterResult<ITwitterListDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._twitterListController.checkIfUserIsAListMemberAsync(parameters, request));
  }

  public removeMemberFromListAsync(parameters: IRemoveMemberFromListParameters): Promise<ITwitterResult<ITwitterListDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._twitterListController.removeMemberFromListAsync(parameters, request));
  }

  public removeMembersFromListAsync(parameters: IRemoveMembersFromListParameters): Promise<ITwitterResult<ITwitterListDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._twitterListController.removeMembersFromListAsync(parameters, request));
  }

  public subscribeToListAsync(parameters: ISubscribeToListParameters): Promise<ITwitterResult<ITwitterListDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._twitterListController.subscribeToListAsync(parameters, request));
  }

  public unsubscribeFromListAsync(parameters: IUnsubscribeFromListParameters): Promise<ITwitterResult<ITwitterListDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._twitterListController.unsubscribeFromListAsync(parameters, request));
  }

  public getListSubscribersIterator(parameters: IGetListSubscribersParameters): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request: ITwitterRequest = super.TwitterClient.createRequest();
    request.executionContext.converters = JsonQueryConverterRepository.Converters;
    return this._twitterListController.getListSubscribersIterator(parameters, request);

  }

  public getAccountListSubscriptionsIterator(parameters: IGetAccountListSubscriptionsParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request: ITwitterRequest = super.TwitterClient.createRequest();
    request.executionContext.converters = JsonQueryConverterRepository.Converters;
    return this._twitterListController.getUserListSubscriptionsIterator(new GetUserListSubscriptionsParameters(parameters), request);
  }

  public getUserListSubscriptionsIterator(parameters: IGetUserListSubscriptionsParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request: ITwitterRequest = super.TwitterClient.createRequest();
    request.executionContext.converters = JsonQueryConverterRepository.Converters;
    return this._twitterListController.getUserListSubscriptionsIterator(parameters, request);
  }

  public checkIfUserIsSubscriberOfListAsync(parameters: ICheckIfUserIsSubscriberOfListParameters): Promise<ITwitterResult<ITwitterListDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._twitterListController.checkIfUserIsSubscriberOfListAsync(parameters, request));
  }

  public getTweetsFromListIterator(parameters: IGetTweetsFromListParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> {    // long?
    this._validator.validate(parameters);

    let request: ITwitterRequest = super.TwitterClient.createRequest();
    return this._twitterListController.getTweetsFromListIterator(parameters, request);
  }
}
