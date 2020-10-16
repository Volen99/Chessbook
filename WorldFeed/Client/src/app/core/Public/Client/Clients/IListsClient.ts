import {ITwitterListIdentifier} from "../../Models/Interfaces/ITwitterListIdentifier";
import {PrivacyMode} from "../../Models/Enum/PrivacyMode";
import {IUserIdentifier} from '../../Models/Interfaces/IUserIdentifier';
import IEnumerable from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable';
import {ITwitterIterator} from '../../Iterators/ITwitterIterator';
import {ITwitterList} from "../../Models/Interfaces/ITwitterList";
import {Promise} from 'src/app/c#-objects/TypeScript.NET-Core/packages/Promises/source/Promise';
import {ICreateListParameters} from "../../Parameters/ListsClient/CreateListParameters";
import {IGetListParameters} from "../../Parameters/ListsClient/GetListParameters";
import {IGetListsSubscribedByAccountParameters} from "../../Parameters/ListsClient/GetListsSubscribedByAccountParameters";
import {IGetListsSubscribedByUserParameters} from "../../Parameters/ListsClient/GetListsSubscribedByUserParameters";
import {IUpdateListParameters} from "../../Parameters/ListsClient/UpdateListParameters";
import {IDestroyListParameters} from "../../Parameters/ListsClient/DestroyListParameters";
import {IGetListsOwnedByAccountParameters} from "../../Parameters/ListsClient/GetListsOwnedByAccountParameters";
import {IGetListsOwnedByUserParameters} from "../../Parameters/ListsClient/GetListsOwnedByUserParameters";
import {IAddMemberToListParameters} from "../../Parameters/ListsClient/Members/AddMemberToListParameters";
import {ITwitterListsClientParametersValidator} from "../../../Core/Client/Validators/TwitterListsClientParametersValidator";
import {IUser} from "../../Models/Interfaces/IUser";
import {IGetListSubscribersParameters} from "../../Parameters/ListsClient/Subscribers/GetListSubscribersParameters";
import {IGetAccountListSubscriptionsParameters} from "../../Parameters/ListsClient/Subscribers/GetAccountListSubscriptionsParameters";
import {IGetUserListSubscriptionsParameters} from "../../Parameters/ListsClient/Subscribers/GetUserListSubscriptionsParameters";
import {ICheckIfUserIsSubscriberOfListParameters} from "../../Parameters/ListsClient/Subscribers/CheckIfUserIsSubscriberOfListParameters";
import {ITweet} from "../../Models/Interfaces/ITweet";
import {IGetTweetsFromListParameters} from "../../Parameters/ListsClient/GetTweetsFromListParameters";
import {IGetAccountListMembershipsParameters} from "../../Parameters/ListsClient/Members/GetAccountListMembershipsParameters";
import {IGetUserListMembershipsParameters} from "../../Parameters/ListsClient/Members/GetUserListMembershipsParameters";
import {IGetMembersOfListParameters} from "../../Parameters/ListsClient/Members/GetMembersOfListParameters";
import {ICheckIfUserIsMemberOfListParameters} from "../../Parameters/ListsClient/Members/CheckIfUserIsMemberOfListParameters";
import {IRemoveMemberFromListParameters} from "../../Parameters/ListsClient/Members/RemoveMemberFromListParameters";
import {IRemoveMembersFromListParameters} from "../../Parameters/ListsClient/Members/RemoveMembersFromListParameters";
import {ISubscribeToListParameters} from "../../Parameters/ListsClient/Subscribers/SubscribeToListParameters";
import {IUnsubscribeFromListParameters} from "../../Parameters/ListsClient/Subscribers/UnsubscribeFromListParameters";
import {IAddMembersToListParameters} from "../../Parameters/ListsClient/Members/AddMembersToListParameters";

export interface IListsClient {
  // Validate all the List client parameters
  parametersValidator: ITwitterListsClientParametersValidator;

  createListAsync(name: string): Promise<ITwitterList>;

  createListAsync(name: string, privacyMode: PrivacyMode): Promise<ITwitterList>;

  /// <summary>
  /// Create a list on Twitter
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-create </para>
  /// <returns>Created list</returns>
  createListAsync(parameters: ICreateListParameters): Promise<ITwitterList>;

  getListAsync(listId: number): Promise<ITwitterList>;

  getListAsync(slug: string, user: IUserIdentifier): Promise<ITwitterList>;

  getListAsync(listId: ITwitterListIdentifier): Promise<ITwitterList>;

  /// <summary>
  /// Get a specific list from Twitter
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-show </para>
  /// <returns>List requested</returns>
  getListAsync(parameters: IGetListParameters): Promise<ITwitterList>;

  /// <inheritdoc cref="IListsClient.GetListsSubscribedByAccountAsync(IGetListsSubscribedByAccountParameters)"/>
  getListsSubscribedByAccountAsync(): Promise<ITwitterList[]>;

  /// <summary>
  /// Get lists subscribed by the current account
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-list </para>
  /// <returns>Account user's lists</returns>
  getListsSubscribedByAccountAsync(parameters: IGetListsSubscribedByAccountParameters): Promise<ITwitterList[]>

  getListsSubscribedByUserAsync(userId: number): Promise<ITwitterList[]>;

  getListsSubscribedByUserAsync(username: string): Promise<ITwitterList[]>;

  getListsSubscribedByUserAsync(user: IUserIdentifier): Promise<ITwitterList[]>;

  /// <summary>
  /// Get lists subscribed by a specific user
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-list </para>
  /// <returns>User's lists</returns>
  getListsSubscribedByUserAsync(parameters: IGetListsSubscribedByUserParameters): Promise<ITwitterList[]>;

  /// <summary>
  /// Update information of a Twitter list
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-update </para>
  /// <returns>Updated list</returns>
  updateListAsync(parameters: IUpdateListParameters): Promise<ITwitterList>;

  destroyListAsync(listId: number);

  destroyListAsync(slug: string, user: IUserIdentifier);

  destroyListAsync(listId: ITwitterListIdentifier);

  /// <summary>
  /// Destroy a list from Twitter
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-destroy </para>
  destroyListAsync(parameters: IDestroyListParameters): Promise<ITwitterList>;

  getListsOwnedByAccountAsync(): Promise<ITwitterList[]>;

  /// <summary>
  /// Get the lists owned by the account
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships </para>
  /// <returns>Lists owned by the account</returns>
  getListsOwnedByAccountAsync(parameters: IGetListsOwnedByAccountParameters): Promise<ITwitterList[]>;

  /// <inheritdoc cref="GetListsOwnedByAccountIterator(IGetListsOwnedByAccountParameters)"/>
  getListsOwnedByAccountIterator(): ITwitterIterator<ITwitterList>;

  /// <summary>
  /// Get the lists owned by the account
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships </para>
  /// <returns>An iterator over the lists owned by the account</returns>
  getListsOwnedByAccountIterator(parameters: IGetListsOwnedByAccountParameters): ITwitterIterator<ITwitterList>

  getListsOwnedByUserAsync(userId: number);

  getListsOwnedByUserAsync(username: string);

  getListsOwnedByUserAsync(user: IUserIdentifier);

  /// <summary>
  /// Get the lists owned by a user
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships </para>
  /// <returns>Lists owned by a user</returns>
  getListsOwnedByUserAsync(parameters: IGetListsOwnedByUserParameters): Promise<ITwitterList[]>;

  getListsOwnedByUserIterator(userId: number): ITwitterIterator<ITwitterList>;

  getListsOwnedByUserIterator(username: string): ITwitterIterator<ITwitterList>;

  getListsOwnedByUserIterator(user: IUser): ITwitterIterator<ITwitterList>;

  /// <summary>
  /// Get the lists owned by a user
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships </para>
  /// <returns>An iterator over the lists owned by the user</returns>
  getListsOwnedByUserIterator(parameters: IGetListsOwnedByUserParameters): ITwitterIterator<ITwitterList>

  // ***********
  // MEMBERSHIP
  // ***********

  addMemberToListAsync(listId: number, userId: number): Promise<ITwitterList>;

  addMemberToListAsync(list: ITwitterListIdentifier, userId: number): Promise<ITwitterList>;

  addMemberToListAsync(list: ITwitterListIdentifier, username: string): Promise<ITwitterList>;

  addMemberToListAsync(list: ITwitterListIdentifier, user: IUserIdentifier): Promise<ITwitterList>;

  /// <summary>
  /// Add a member to a twitter list
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-create </para>
  addMemberToListAsync(parameters: IAddMemberToListParameters): Promise<ITwitterList>;

  addMembersToListAsync(listId: number, userIds: IEnumerable<number>): Promise<ITwitterList>;

  addMembersToListAsync(listId: number, usernames: IEnumerable<string>): Promise<ITwitterList>;

  addMembersToListAsync(listId: number, users: IEnumerable<IUserIdentifier>): Promise<ITwitterList>;

  addMembersToListAsync(list: ITwitterListIdentifier, userIds: IEnumerable<number>): Promise<ITwitterList>;

  addMembersToListAsync(list: ITwitterListIdentifier, usernames: IEnumerable<string>): Promise<ITwitterList>;

  addMembersToListAsync(list: ITwitterListIdentifier, users: IEnumerable<IUserIdentifier>): Promise<ITwitterList>;

  /// <summary>
  /// Add multiple members to a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-create_all </para>
  /// </summary>
  addMembersToListAsync(parameters: IAddMembersToListParameters): Promise<ITwitterList>;

  getAccountListMembershipsAsync(): Promise<ITwitterList[]>;

  /// <summary>
  /// Get the lists the account is member of
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships </para>
  /// </summary>
  /// <returns>Lists the account is member of</returns>
  getAccountListMembershipsAsync(parameters: IGetAccountListMembershipsParameters): Promise<ITwitterList[]>;

  getAccountListMembershipsIterator(): ITwitterIterator<ITwitterList>;

  /// <summary>
  /// Get an iterator to retrieve all the lists the account is member of
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships </para>
  /// </summary>
  /// <returns>An iterator to retrieve all the lists the account is member of</returns>
  getAccountListMembershipsIterator(parameters: IGetAccountListMembershipsParameters): ITwitterIterator<ITwitterList>;

  getUserListMembershipsAsync(userId: number): Promise<ITwitterList[]>;

  getUserListMembershipsAsync(username: string): Promise<ITwitterList[]>;

  getUserListMembershipsAsync(user: IUserIdentifier): Promise<ITwitterList[]>;

  /// <summary>
  /// Get an iterator to retrieve all the lists a user is member of
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships </para>
  /// </summary>
  /// <returns>Lists a user is member of</returns>
  getUserListMembershipsAsync(parameters: IGetUserListMembershipsParameters): Promise<ITwitterList[]>;

  getUserListMembershipsIterator(userId: number): ITwitterIterator<ITwitterList>;

  getUserListMembershipsIterator(username: string);

  getUserListMembershipsIterator(user: IUserIdentifier);

  /// <summary>
  /// Get an iterator to retrieve all the lists a user is member of
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships </para>
  /// </summary>
  /// <returns>An iterator to retrieve all the lists a user is member of</returns>
  getUserListMembershipsIterator(parameters: IGetUserListMembershipsParameters): ITwitterIterator<ITwitterList>

  getMembersOfListAsync(listId: number): Promise<IUser[]>;

  getMembersOfListAsync(list: ITwitterListIdentifier): Promise<IUser[]>;

  /// <summary>
  /// Get the members of the specified list.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members </para>
  /// </summary>
  /// <returns>Members of the list</returns>
  getMembersOfListAsync(parameters: IGetMembersOfListParameters): Promise<IUser[]>;

  getMembersOfListIterator(listId: number): ITwitterIterator<IUser>;

  getMembersOfListIterator(list: ITwitterListIdentifier): ITwitterIterator<IUser>;

  /// <summary>
  /// Get the members of the specified list.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members </para>
  /// </summary>
  /// <returns>An iterator to list the users members of the list</returns>
  getMembersOfListIterator(parameters: IGetMembersOfListParameters): ITwitterIterator<IUser>;

  checkIfUserIsMemberOfListAsync(listId: number, userId: number): Promise<boolean>;

  checkIfUserIsMemberOfListAsync(listId: number, username: string): Promise<boolean>;

  checkIfUserIsMemberOfListAsync(listId: number, user: IUserIdentifier): Promise<boolean>;

  checkIfUserIsMemberOfListAsync(list: ITwitterListIdentifier, userId: number): Promise<boolean>;

  checkIfUserIsMemberOfListAsync(list: ITwitterListIdentifier, username: string): Promise<boolean>;

  checkIfUserIsMemberOfListAsync(list: ITwitterListIdentifier, user: IUserIdentifier): Promise<boolean>;

  /// <summary>
  /// Check if a user is a member of a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members-show </para>
  /// </summary>
  /// <returns>Returns whether the user is a member of a list</returns>
  checkIfUserIsMemberOfListAsync(parameters: ICheckIfUserIsMemberOfListParameters): Promise<boolean>;

  removeMemberFromListAsync(listId: number, userId: number): Promise<ITwitterList>;

  removeMemberFromListAsync(listId: number, username: string): Promise<ITwitterList>;

  removeMemberFromListAsync(listId: number, user: IUserIdentifier): Promise<ITwitterList>;

  removeMemberFromListAsync(list: ITwitterListIdentifier, userId: number): Promise<ITwitterList>;

  removeMemberFromListAsync(list: ITwitterListIdentifier, username: string): Promise<ITwitterList>;

  removeMemberFromListAsync(list: ITwitterListIdentifier, user: IUserIdentifier): Promise<ITwitterList>;

  /// <summary>
  /// Remove a member from a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-destroy </para>
  /// </summary>
  removeMemberFromListAsync(parameters: IRemoveMemberFromListParameters): Promise<ITwitterList>;

  removeMembersFromListAsync(listId: number, userIds: IEnumerable<number>): Promise<ITwitterList>;

  removeMembersFromListAsync(listId: number, usernames: IEnumerable<string>): Promise<ITwitterList>;

  removeMembersFromListAsync(listId: number, users: IEnumerable<IUserIdentifier>): Promise<ITwitterList>;

  removeMembersFromListAsync(list: ITwitterListIdentifier, userIds: IEnumerable<number>): Promise<ITwitterList>;

  removeMembersFromListAsync(list: ITwitterListIdentifier, usernames: IEnumerable<string>): Promise<ITwitterList>;

  removeMembersFromListAsync(list: ITwitterListIdentifier, users: IEnumerable<IUserIdentifier>): Promise<ITwitterList>;

  /// <summary>
  /// Remove multiple members from a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-destroy_all </para>
  /// </summary>
  removeMembersFromListAsync(parameters: IRemoveMembersFromListParameters): Promise<ITwitterList>

  // ***********
  // SUBSCRIBERS
  // ***********

  subscribeToListAsync(listId: number): Promise<ITwitterList>;

  subscribeToListAsync(list: ITwitterListIdentifier): Promise<ITwitterList>;

  /// <summary>
  /// Subscribe the authenticated account to the specified list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-subscribers-create </para>
  /// </summary>
  /// <returns>The latest version of the list</returns>
  subscribeToListAsync(parameters: ISubscribeToListParameters): Promise<ITwitterList>;

  unsubscribeFromListAsync(listId: number): Promise<ITwitterList>

  unsubscribeFromListAsync(list: ITwitterListIdentifier): Promise<ITwitterList>;

  /// <summary>
  /// Unsubscribe the authenticated account from the specified list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-subscribers-destroy </para>
  /// </summary>
  /// <returns>The latest version of the list</returns>
  unsubscribeFromListAsync(parameters: IUnsubscribeFromListParameters): Promise<ITwitterList>

  getListSubscribersAsync(listId: number): Promise<IUser[]>;

  getListSubscribersAsync(list: ITwitterListIdentifier): Promise<IUser[]>;

  /// <summary>
  /// Returns the users subscribed to a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers </para>
  /// </summary>
  /// <returns>Subscribers of the list</returns>
  getListSubscribersAsync(parameters: IGetListSubscribersParameters): Promise<IUser[]>

  getListSubscribersIterator(listId: number): ITwitterIterator<IUser>

  getListSubscribersIterator(list: ITwitterListIdentifier): ITwitterIterator<IUser>

  /// <summary>
  /// Returns the users subscribed to a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers </para>
  /// </summary>
  /// <returns>An iterator to get through the subscribers of the list</returns>
  getListSubscribersIterator(parameters: IGetListSubscribersParameters): ITwitterIterator<IUser>

  getAccountListSubscriptionsAsync(): Promise<ITwitterList[]>;

  /// <summary>
  /// Returns the lists the account subscribed to
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions </para>
  /// </summary>
  /// <returns>Lists the authenticated user is subscribed to</returns>
  getAccountListSubscriptionsAsync(parameters: IGetAccountListSubscriptionsParameters);

  getAccountListSubscriptionsIterator(): ITwitterIterator<ITwitterList>;

  /// <summary>
  /// Returns the lists the account subscribed to
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions </para>
  /// </summary>
  /// <returns>An iterator the get though the lists the account subscribed to</returns>
  getAccountListSubscriptionsIterator(parameters: IGetAccountListSubscriptionsParameters): ITwitterIterator<ITwitterList>

  getUserListSubscriptionsAsync(userId: number): Promise<ITwitterList[]>;

  getUserListSubscriptionsAsync(username: string): Promise<ITwitterList[]>;

  getUserListSubscriptionsAsync(user: IUserIdentifier): Promise<ITwitterList[]>;

  /// <summary>
  /// Returns the lists a user subscribed to
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions </para>
  /// </summary>
  /// <returns>Lists a user subscribed to</returns>
  getUserListSubscriptionsAsync(parameters: IGetUserListSubscriptionsParameters): Promise<ITwitterList[]>;

  getUserListSubscriptionsIterator(userId: number): ITwitterIterator<ITwitterList>

  getUserListSubscriptionsIterator(username: string): ITwitterIterator<ITwitterList>

  getUserListSubscriptionsIterator(user: IUserIdentifier): ITwitterIterator<ITwitterList>

  /// <summary>
  /// Returns the lists a user subscribed to
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions </para>
  /// </summary>
  /// <returns>An iterator the get though the lists a user subscribed to</returns>
  getUserListSubscriptionsIterator(parameters: IGetUserListSubscriptionsParameters): ITwitterIterator<ITwitterList>

  checkIfUserIsSubscriberOfListAsync(listId: number, userId: number): Promise<boolean>;

  checkIfUserIsSubscriberOfListAsync(listId: number, username: string): Promise<boolean>;

  checkIfUserIsSubscriberOfListAsync(listId: number, user: IUserIdentifier): Promise<boolean>;

  checkIfUserIsSubscriberOfListAsync(list: ITwitterListIdentifier, userId: number): Promise<boolean>;

  checkIfUserIsSubscriberOfListAsync(list: ITwitterListIdentifier, username: string): Promise<boolean>;

  checkIfUserIsSubscriberOfListAsync(list: ITwitterListIdentifier, user: IUserIdentifier): Promise<boolean>;

  /// <summary>
  /// Check if a user is a subscriber of a list
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers-show </para>
  /// </summary>
  /// <returns>Whether the user is a subscriber of the list</returns>
  checkIfUserIsSubscriberOfListAsync(parameters: ICheckIfUserIsSubscriberOfListParameters): Promise<boolean>;

  // ***********
  // TWEETS
  // ***********

  getTweetsFromListAsync(listId: number): Promise<ITweet[]>;

  getTweetsFromListAsync(list: ITwitterListIdentifier): Promise<ITweet[]>;

  /// <summary>
  /// Returns the tweets authored by the members of the list.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-statuses </para>
  /// </summary>
  /// <returns>Tweets of a list</returns>
  getTweetsFromListAsync(parameters: IGetTweetsFromListParameters): Promise<ITweet[]>;

  getTweetsFromListIterator(listId: number): ITwitterIterator<ITweet, number>;               // long?
  getTweetsFromListIterator(list: ITwitterListIdentifier): ITwitterIterator<ITweet, number>;  // long?

  /// <summary>
  /// Returns the tweets authored by the members of the list.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-statuses </para>
  /// </summary>
  /// <returns>An iterator to get through the tweets of a list</returns>
  getTweetsFromListIterator(parameters: IGetTweetsFromListParameters): ITwitterIterator<ITweet, number>; // long?
}
