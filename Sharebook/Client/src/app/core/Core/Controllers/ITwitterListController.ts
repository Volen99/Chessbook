import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../Web/TwitterResult";
import {ICreateListParameters} from "../../Public/Parameters/ListsClient/CreateListParameters";
import {IGetListParameters} from "../../Public/Parameters/ListsClient/GetListParameters";
import {ITwitterListDTO} from "../../Public/Models/Interfaces/DTO/ITwitterListDTO";
import {IGetListsSubscribedByUserParameters} from "../../Public/Parameters/ListsClient/GetListsSubscribedByUserParameters";
import {IUpdateListParameters} from "../../Public/Parameters/ListsClient/UpdateListParameters";
import {IDestroyListParameters} from "../../Public/Parameters/ListsClient/DestroyListParameters";
import {IGetListsOwnedByUserParameters} from "../../Public/Parameters/ListsClient/GetListsOwnedByUserParameters";
import {ITwitterPageIterator} from "../Iterators/TwitterPageIterator";
import {IAddMemberToListParameters} from "../../Public/Parameters/ListsClient/Members/AddMemberToListParameters";
import {IAddMembersToListParameters} from "../../Public/Parameters/ListsClient/Members/AddMembersToListParameters";
import {IGetUserListMembershipsParameters} from "../../Public/Parameters/ListsClient/Members/GetUserListMembershipsParameters";
import {IGetMembersOfListParameters} from "../../Public/Parameters/ListsClient/Members/GetMembersOfListParameters";
import {ICheckIfUserIsMemberOfListParameters} from "../../Public/Parameters/ListsClient/Members/CheckIfUserIsMemberOfListParameters";
import {IRemoveMemberFromListParameters} from "../../Public/Parameters/ListsClient/Members/RemoveMemberFromListParameters";
import {IRemoveMembersFromListParameters} from "../../Public/Parameters/ListsClient/Members/RemoveMembersFromListParameters";
import {ISubscribeToListParameters} from "../../Public/Parameters/ListsClient/Subscribers/SubscribeToListParameters";
import {IUnsubscribeFromListParameters} from "../../Public/Parameters/ListsClient/Subscribers/UnsubscribeFromListParameters";
import {IGetListSubscribersParameters} from "../../Public/Parameters/ListsClient/Subscribers/GetListSubscribersParameters";
import {IGetUserListSubscriptionsParameters} from "../../Public/Parameters/ListsClient/Subscribers/GetUserListSubscriptionsParameters";
import {ICheckIfUserIsSubscriberOfListParameters} from "../../Public/Parameters/ListsClient/Subscribers/CheckIfUserIsSubscriberOfListParameters";
import {IGetTweetsFromListParameters} from "../../Public/Parameters/ListsClient/GetTweetsFromListParameters";
import {ITwitterListCursorQueryResultDTO} from "../../Public/Models/Interfaces/DTO/QueryDTO/ITwitterListCursorQueryResultDTO";
import {IUserCursorQueryResultDTO} from "../../Public/Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {ITweetDTO} from "../../Public/Models/Interfaces/DTO/ITweetDTO";
import {TwitterListController} from "../../../controllers/TwitterLists/TwitterListController";
import {TwitterListQueryExecutor} from "../../../controllers/TwitterLists/TwitterListQueryExecutor";
import {PageCursorIteratorFactories} from "../Iterators/PageCursorIteratorFactories";

export interface ITwitterListController {
  // LIST
  createListAsync(parameters: ICreateListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  getListAsync(parameters: IGetListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  getListsSubscribedByUserAsync(parameters: IGetListsSubscribedByUserParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO[]>>;

  updateListAsync(parameters: IUpdateListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  destroyListAsync(parameters: IDestroyListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  getListsOwnedByUserIterator(parameters: IGetListsOwnedByUserParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  // MEMBERS
  addMemberToListAsync(parameters: IAddMemberToListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  addMembersToListAsync(parameters: IAddMembersToListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  getUserListMembershipsIterator(parameters: IGetUserListMembershipsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  getMembersOfListIterator(parameters: IGetMembersOfListParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>;

  checkIfUserIsAListMemberAsync(parameters: ICheckIfUserIsMemberOfListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  removeMemberFromListAsync(parameters: IRemoveMemberFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  removeMembersFromListAsync(parameters: IRemoveMembersFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  // SUBSCRIBERS
  subscribeToListAsync(parameters: ISubscribeToListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  unsubscribeFromListAsync(parameters: IUnsubscribeFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  getListSubscribersIterator(parameters: IGetListSubscribersParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>;

  getUserListSubscriptionsIterator(parameters: IGetUserListSubscriptionsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  checkIfUserIsSubscriberOfListAsync(parameters: ICheckIfUserIsSubscriberOfListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  // GET TWEETS
  getTweetsFromListIterator(parameters: IGetTweetsFromListParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?
}

export const ITwitterListControllerToken = new InjectionToken<ITwitterListController>('ITwitterListController', {
  providedIn: 'root',
  factory: () => new TwitterListController(inject(TwitterListQueryExecutor), inject(PageCursorIteratorFactories)),
});
