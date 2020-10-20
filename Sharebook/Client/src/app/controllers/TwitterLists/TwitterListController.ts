import {ITwitterListController} from "../../core/Core/Controllers/ITwitterListController";
import { TwitterRequest } from 'src/app/core/Public/TwitterRequest';
import { ITwitterResult } from 'src/app/core/Core/Web/TwitterResult';
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {IPageCursorIteratorFactories} from "../../core/Core/Iterators/PageCursorIteratorFactories";
import {ITwitterListQueryExecutor} from "./TwitterListQueryExecutor";
import {ICreateListParameters} from "../../core/Public/Parameters/ListsClient/CreateListParameters";
import {IGetListParameters} from "../../core/Public/Parameters/ListsClient/GetListParameters";
import {IGetListsSubscribedByUserParameters} from "../../core/Public/Parameters/ListsClient/GetListsSubscribedByUserParameters";
import {ITwitterListDTO} from "../../core/Public/Models/Interfaces/DTO/ITwitterListDTO";
import {IUpdateListParameters} from "../../core/Public/Parameters/ListsClient/UpdateListParameters";
import {IDestroyListParameters} from "../../core/Public/Parameters/ListsClient/DestroyListParameters";
import {
  GetListsOwnedByAccountByUserParameters,
  IGetListsOwnedByUserParameters
} from "../../core/Public/Parameters/ListsClient/GetListsOwnedByUserParameters";
import {ITwitterPageIterator} from "../../core/Core/Iterators/TwitterPageIterator";
import {ITwitterListCursorQueryResultDTO} from "../../core/Public/Models/Interfaces/DTO/QueryDTO/ITwitterListCursorQueryResultDTO";
import {IAddMemberToListParameters} from "../../core/Public/Parameters/ListsClient/Members/AddMemberToListParameters";
import {IAddMembersToListParameters} from "../../core/Public/Parameters/ListsClient/Members/AddMembersToListParameters";
import {
  GetUserListMembershipsParameters,
  IGetUserListMembershipsParameters
} from "../../core/Public/Parameters/ListsClient/Members/GetUserListMembershipsParameters";
import {
  GetMembersOfListParameters,
  IGetMembersOfListParameters
} from "../../core/Public/Parameters/ListsClient/Members/GetMembersOfListParameters";
import {ICheckIfUserIsMemberOfListParameters} from "../../core/Public/Parameters/ListsClient/Members/CheckIfUserIsMemberOfListParameters";
import {IRemoveMemberFromListParameters} from "../../core/Public/Parameters/ListsClient/Members/RemoveMemberFromListParameters";
import {IRemoveMembersFromListParameters} from "../../core/Public/Parameters/ListsClient/Members/RemoveMembersFromListParameters";
import {ISubscribeToListParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/SubscribeToListParameters";
import {IUnsubscribeFromListParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/UnsubscribeFromListParameters";
import {
  GetListSubscribersParameters,
  IGetListSubscribersParameters
} from "../../core/Public/Parameters/ListsClient/Subscribers/GetListSubscribersParameters";
import {
  GetUserListSubscriptionsParameters,
  IGetUserListSubscriptionsParameters
} from "../../core/Public/Parameters/ListsClient/Subscribers/GetUserListSubscriptionsParameters";
import {ICheckIfUserIsSubscriberOfListParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/CheckIfUserIsSubscriberOfListParameters";
import {
  GetTweetsFromListParameters,
  IGetTweetsFromListParameters
} from "../../core/Public/Parameters/ListsClient/GetTweetsFromListParameters";
import {ITweetDTO} from "../../core/Public/Models/Interfaces/DTO/ITweetDTO";

export class TwitterListController implements ITwitterListController {
  private readonly _twitterListQueryExecutor: ITwitterListQueryExecutor;
  private readonly _pageCursorIteratorFactories: IPageCursorIteratorFactories;

  constructor(twitterListQueryExecutor: ITwitterListQueryExecutor, pageCursorIteratorFactories: IPageCursorIteratorFactories) {
    this._twitterListQueryExecutor = twitterListQueryExecutor;
    this._pageCursorIteratorFactories = pageCursorIteratorFactories;
  }

  public createListAsync(parameters: ICreateListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    return this._twitterListQueryExecutor.createListAsync(parameters, request);
  }

  public getListAsync(parameters: IGetListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    return this._twitterListQueryExecutor.getListAsync(parameters, request);
  }

        public  getListsSubscribedByUserAsync(parameters: IGetListsSubscribedByUserParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO[]>>
        {
            return this._twitterListQueryExecutor.getListsSubscribedByUserAsync(parameters, request);
        }

        public  updateListAsync(parameters: IUpdateListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>
        {
            return this._twitterListQueryExecutor.updateListAsync(parameters, request);
        }

         ITwitterListController.destroyListAsync(parameters: IDestroyListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>
        {
            return this._twitterListQueryExecutor.destroyListAsync(parameters, request);
        }

  public getListsOwnedByUserIterator(parameters: IGetListsOwnedByUserParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    return this._pageCursorIteratorFactories.createCursor(parameters, cursor => {
      let cursoredParameters = new GetListsOwnedByAccountByUserParameters(parameters);
      cursoredParameters.cursor = cursor;

      return this._twitterListQueryExecutor.getListsOwnedByUserAsync(cursoredParameters, new TwitterRequest(request));
    });
  }

        public addMemberToListAsync(parameters: IAddMemberToListParameters, request: ITwitterRequest):  Promise<ITwitterResult<ITwitterListDTO>>
{
            return this._twitterListQueryExecutor.addMemberToListAsync(parameters, request);
        }

        public addMembersToListAsync(parameters: IAddMembersToListParameters, request: ITwitterRequest):  Promise<ITwitterResult<ITwitterListDTO>>
        {
            return this._twitterListQueryExecutor.addMembersToListAsync(parameters, request);
        }

  public getUserListMembershipsIterator(parameters: IGetUserListMembershipsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    return this._pageCursorIteratorFactories.createCursor(parameters, cursor => {
      let cursoredParameters = new GetUserListMembershipsParameters(parameters);
      cursoredParameters.cursor = cursor;

      return this._twitterListQueryExecutor.getUserListMembershipsAsync(cursoredParameters, new TwitterRequest(request));
    });
  }

  public getMembersOfListIterator(parameters: IGetMembersOfListParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> {
    return this._pageCursorIteratorFactories.createCursor(parameters, cursor => {
      let cursoredParameters = new GetMembersOfListParameters(parameters);
      cursoredParameters.cursor = cursor;

      return this._twitterListQueryExecutor.getMembersOfListAsync(cursoredParameters, new TwitterRequest(request));
    });
  }

  public checkIfUserIsAListMemberAsync(parameters: ICheckIfUserIsMemberOfListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    return this._twitterListQueryExecutor.checkIfUserIsAListMemberAsync(parameters, request);
  }

  public removeMemberFromListAsync(parameters: IRemoveMemberFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    return this._twitterListQueryExecutor.removeMemberFromListAsync(parameters, request);
  }

  public removeMembersFromListAsync(parameters: IRemoveMembersFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    return this._twitterListQueryExecutor.removeMembersFromListAsync(parameters, request);
  }

  public subscribeToListAsync(parameters: ISubscribeToListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    return this._twitterListQueryExecutor.subscribeToListAsync(parameters, request);
  }

  public unsubscribeFromListAsync(parameters: IUnsubscribeFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    return this._twitterListQueryExecutor.unsubscribeFromListAsync(parameters, request);
  }

  public getListSubscribersIterator(parameters: IGetListSubscribersParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> {
    return this._pageCursorIteratorFactories.createCursor(parameters, cursor => {
      let cursoredParameters = new GetListSubscribersParameters(parameters);
      cursoredParameters.cursor = cursor;

      return this._twitterListQueryExecutor.getListSubscribersAsync(cursoredParameters, new TwitterRequest(request));
    });
  }

  public getUserListSubscriptionsIterator(parameters: IGetUserListSubscriptionsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    return this._pageCursorIteratorFactories.createCursor(parameters, cursor => {
      let cursoredParameters = new GetUserListSubscriptionsParameters(parameters);
      cursoredParameters.cursor = cursor;

      return this._twitterListQueryExecutor.getUserListSubscriptionsAsync(cursoredParameters, new TwitterRequest(request));
    });
  }

  public checkIfUserIsSubscriberOfListAsync(parameters: ICheckIfUserIsSubscriberOfListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    return this._twitterListQueryExecutor.checkIfUserIsSubscriberOfListAsync(parameters, request);
  }

        public getTweetsFromListIterator(parameters: IGetTweetsFromListParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> { // long?
            return this._pageCursorIteratorFactories.create(parameters, cursor => {
                let cursoredParameters = new GetTweetsFromListParameters(parameters);
                cursoredParameters.maxId = cursor;

                return this._twitterListQueryExecutor.getTweetsFromListAsync(cursoredParameters, new TwitterRequest(request));
            });
        }
    }
}
