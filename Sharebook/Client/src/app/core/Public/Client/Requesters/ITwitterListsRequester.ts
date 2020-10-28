import {Inject, InjectionToken} from "@angular/core";

import {ITwitterResult, TwitterResultFactory} from "../../../Core/Web/TwitterResult";
import {ICreateListParameters} from "../../Parameters/ListsClient/CreateListParameters";
import {ITwitterListDTO} from "../../Models/Interfaces/DTO/ITwitterListDTO";
import {IGetListParameters} from "../../Parameters/ListsClient/GetListParameters";
import {IGetListsSubscribedByUserParameters} from "../../Parameters/ListsClient/GetListsSubscribedByUserParameters";
import {IUpdateListParameters} from "../../Parameters/ListsClient/UpdateListParameters";
import {IDestroyListParameters} from "../../Parameters/ListsClient/DestroyListParameters";
import {IGetListsOwnedByAccountParameters} from "../../Parameters/ListsClient/GetListsOwnedByAccountParameters";
import {ITwitterPageIterator} from "../../../Core/Iterators/TwitterPageIterator";
import {ITwitterListCursorQueryResultDTO} from "../../Models/Interfaces/DTO/QueryDTO/ITwitterListCursorQueryResultDTO";
import {IGetListsOwnedByUserParameters} from "../../Parameters/ListsClient/GetListsOwnedByUserParameters";
import {IAddMemberToListParameters} from "../../Parameters/ListsClient/Members/AddMemberToListParameters";
import {ITwitterList} from "../../Models/Interfaces/ITwitterList";
import {IAddMembersToListParameters} from "../../Parameters/ListsClient/Members/AddMembersToListParameters";
import {IGetAccountListMembershipsParameters} from "../../Parameters/ListsClient/Members/GetAccountListMembershipsParameters";
import {IGetUserListMembershipsParameters} from "../../Parameters/ListsClient/Members/GetUserListMembershipsParameters";
import {IGetMembersOfListParameters} from "../../Parameters/ListsClient/Members/GetMembersOfListParameters";
import {IUserCursorQueryResultDTO} from "../../Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {ICheckIfUserIsMemberOfListParameters} from "../../Parameters/ListsClient/Members/CheckIfUserIsMemberOfListParameters";
import {IRemoveMemberFromListParameters} from "../../Parameters/ListsClient/Members/RemoveMemberFromListParameters";
import {IRemoveMembersFromListParameters} from "../../Parameters/ListsClient/Members/RemoveMembersFromListParameters";
import {ISubscribeToListParameters} from "../../Parameters/ListsClient/Subscribers/SubscribeToListParameters";
import {IUnsubscribeFromListParameters} from "../../Parameters/ListsClient/Subscribers/UnsubscribeFromListParameters";
import {IGetListSubscribersParameters} from "../../Parameters/ListsClient/Subscribers/GetListSubscribersParameters";
import {IGetAccountListSubscriptionsParameters} from "../../Parameters/ListsClient/Subscribers/GetAccountListSubscriptionsParameters";
import {IGetUserListSubscriptionsParameters} from "../../Parameters/ListsClient/Subscribers/GetUserListSubscriptionsParameters";
import {ICheckIfUserIsSubscriberOfListParameters} from "../../Parameters/ListsClient/Subscribers/CheckIfUserIsSubscriberOfListParameters";
import {IGetTweetsFromListParameters} from "../../Parameters/ListsClient/GetTweetsFromListParameters";
import {ITweetDTO} from "../../Models/Interfaces/DTO/ITweetDTO";
import {TwitterListsRequester} from "../../../../sharebook/Client/Requesters/TwitterListsRequester";
import {
  TwitterListsClientRequiredParametersValidator
} from "../../../Core/Client/Validators/TwitterListsClientRequiredParametersValidator";
import {TwitterClientEvents} from "../../../Core/Events/TweetinviGlobalEvents";
import {TwitterListController} from "../../../../controllers/TwitterLists/TwitterListController";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import {TwitterClientFactories} from "../../../../sharebook/Client/Tools/TwitterClientFactories";

export interface ITwitterListsRequester {
  /// <summary>
  /// Create a list on Twitter
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-create </para>
  /// <returns>TwitterResult containing the created list</returns>
  createListAsync(parameters: ICreateListParameters): Promise<ITwitterResult<ITwitterListDTO>>;

  /// <summary>
  /// Get a specific list from Twitter
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-show </para>
  /// <returns>TwitterResult containing the list</returns>
  getListAsync(parameters: IGetListParameters): Promise<ITwitterResult<ITwitterListDTO>>;

  /// <summary>
  /// Get a user's lists
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-list </para>
  /// <returns>TwitterResult containing the user's lists</returns>
  getListsSubscribedByUserAsync(parameters: IGetListsSubscribedByUserParameters): Promise<ITwitterResult<ITwitterListDTO[]>>;

  /// <summary>
  /// Update information of a Twitter list
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-update </para>
  /// <returns>TwitterResult containing the updated list</returns>
  updateListAsync(parameters: IUpdateListParameters): Promise<ITwitterResult<ITwitterListDTO>>;

  /// <summary>
  /// Destroy a list from Twitter
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-destroy </para>
  /// <returns>TwitterResult containing the destroyed list</returns>
  destroyListAsync(parameters: IDestroyListParameters): Promise<ITwitterResult<ITwitterListDTO>>;

  /// <summary>
  /// Get the lists owned by the authenticated user
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships </para>
  /// <returns>An iterator over the lists owned by the authenticated user</returns>
  getListsOwnedByAccountIterator(parameters: IGetListsOwnedByAccountParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  /// <summary>
  /// Get the lists owned by a user or an account
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships </para>
  /// <returns>An iterator over the lists owned by the user</returns>
  getListsOwnedByUserIterator(parameters: IGetListsOwnedByUserParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  // MEMBERS

  /// <summary>
  /// Add a member to a twitter list
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-create </para>
  /// <returns>TwitterResult containing the list</returns>
  addMemberToListAsync(parameters: IAddMemberToListParameters): Promise<ITwitterResult<ITwitterListDTO, ITwitterList>>;

  /// <summary>
  /// Add multiple members to a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-create_all </para>
  /// </summary>
  /// <returns>TwitterResult containing the list</returns>
  addMembersToListAsync(parameters: IAddMembersToListParameters): Promise<ITwitterResult<ITwitterListDTO, ITwitterList>>;

  /// <summary>
  /// Get the lists the authenticated user is a member of
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships </para>
  /// <returns>An iterator over the lists a user is a member of</returns>
  getAccountListMembershipsIterator(parameters: IGetAccountListMembershipsParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  /// <summary>
  /// Get the lists a user is a member of
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships </para>
  /// <returns>An iterator over the lists a user is a member of</returns>
  getUserListMembershipsIterator(parameters: IGetUserListMembershipsParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  /// <summary>
  /// Get the members of the specified list.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members </para>
  /// </summary>
  /// <returns>An iterator to list the users members of the list</returns>
  getMembersOfListIterator(parameters: IGetMembersOfListParameters): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>;

  /// <summary>
  /// Check if a user is a member of a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members-show </para>
  /// </summary>
  /// <returns>TwitterResult containing the list </returns>
  checkIfUserIsAListMemberAsync(parameters: ICheckIfUserIsMemberOfListParameters): Promise<ITwitterResult<ITwitterListDTO>>;

  /// <summary>
  /// Remove a member from a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-destroy </para>
  /// </summary>
  /// <returns>TwitterResult containing the list </returns>
  removeMemberFromListAsync(parameters: IRemoveMemberFromListParameters): Promise<ITwitterResult<ITwitterListDTO>>;

  /// <summary>
  /// Remove multiple members from a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-destroy_all </para>
  /// </summary>
  /// <returns>TwitterResult containing the list</returns>
  removeMembersFromListAsync(parameters: IRemoveMembersFromListParameters): Promise<ITwitterResult<ITwitterListDTO>>;

  // SUBSCRIBER

  /// <summary>
  /// Subscribe the authenticated account to the specified list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-subscribers-create </para>
  /// </summary>
  /// <returns>Twitter result containing the latest version of the list</returns>
  subscribeToListAsync(parameters: ISubscribeToListParameters): Promise<ITwitterResult<ITwitterListDTO>>;

  /// <summary>
  /// Unsubscribe the authenticated account from the specified list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-subscribers-destroy </para>
  /// </summary>
  /// <returns>Twitter result containing the latest version of the list</returns>
  unsubscribeFromListAsync(parameters: IUnsubscribeFromListParameters): Promise<ITwitterResult<ITwitterListDTO>>;

  /// <summary>
  /// Returns the users subscribed to a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers </para>
  /// </summary>
  /// <returns>An iterator to get through the subscribers of the list</returns>
  getListSubscribersIterator(parameters: IGetListSubscribersParameters): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>;

  /// <summary>
  /// Returns the lists the authenticated user is subscribed to
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions </para>
  /// </summary>
  /// <returns>An iterator the get through the lists the authenticated user is subscribed to</returns>
  getAccountListSubscriptionsIterator(parameters: IGetAccountListSubscriptionsParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  /// <summary>
  /// Returns the lists a user subscribed to
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions </para>
  /// </summary>
  /// <returns>An iterator the get through the lists a user subscribed to</returns>
  getUserListSubscriptionsIterator(parameters: IGetUserListSubscriptionsParameters): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  /// <summary>
  /// Check if a user is a subscriber of a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers-show </para>
  /// </summary>
  /// <exception cref="Tweetinvi.Exceptions.TwitterException">If the user is not subscribed</exception>
  /// <returns>TwitterResult with the latest version of the list.</returns>
  checkIfUserIsSubscriberOfListAsync(parameters: ICheckIfUserIsSubscriberOfListParameters): Promise<ITwitterResult<ITwitterListDTO>>;

  // GET TWEETS

  /// <summary>
  /// Returns the tweets authored by the members of the list.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-statuses </para>
  /// </summary>
  /// <returns>An iterator to get through the tweets of a list</returns>
  getTweetsFromListIterator(parameters: IGetTweetsFromListParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?
}


export const ITwitterListsRequesterToken = new InjectionToken<ITwitterListsRequester>('ITwitterListsRequester', {
  providedIn: 'root',
  factory: () => new TwitterListsRequester(Inject(TwitterClient), Inject(TwitterClientEvents), Inject(TwitterResultFactory),
    Inject(TwitterClientFactories), Inject(TwitterListController), Inject(TwitterListsClientRequiredParametersValidator)),
});
