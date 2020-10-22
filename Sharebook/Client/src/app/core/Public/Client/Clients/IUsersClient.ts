import {IUserIdentifier} from '../../Models/Interfaces/IUserIdentifier';
import {IAuthenticatedUser} from "../../Models/Interfaces/IAuthenticatedUser";
import {IGetAuthenticatedUserParameters} from "../../Parameters/AccountClient/GetAuthenticatedUserParameters";
import {IUser} from "../../Models/Interfaces/IUser";
import {IGetUserParameters} from "../../Parameters/UsersClient/GetUserParameters";
import {IGetFriendIdsParameters} from "../../Parameters/UsersClient/GetFriendIdsParameters";
import {ITwitterIterator} from '../../Iterators/ITwitterIterator';
import {IGetFriendsParameters} from "../../Parameters/UsersClient/GetFriendsParameters";
import {IMultiLevelCursorIterator} from '../../Iterators/IMultiLevelCursorIterator';
import {IGetFollowerIdsParameters} from "../../Parameters/UsersClient/GetFollowerIdsParameters";
import {IGetFollowersParameters} from "../../Parameters/UsersClient/GetFollowersParameters";
import {IRelationshipDetails} from "../../Models/Interfaces/IRelationshipDetails";
import {IGetRelationshipBetweenParameters} from "../../Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IBlockUserParameters} from "../../Parameters/AccountClient/BlockUserParameters";
import {IUnblockUserParameters} from "../../Parameters/AccountClient/UnblockUserParameters";
import {IReportUserForSpamParameters} from "../../Parameters/AccountClient/ReportUserForSpamParameters";
import {IGetBlockedUserIdsParameters} from "../../Parameters/AccountClient/GetBlockedUserIdsParameter";
import {IGetBlockedUsersParameters} from "../../Parameters/AccountClient/GetBlockedUsersParameter";
import {IFollowUserParameters} from "../../Parameters/AccountClient/FollowUserParameters";
import {IUnfollowUserParameters} from "../../Parameters/AccountClient/UnfollowUserParameters";
import {IGetUserIdsRequestingFriendshipParameters} from "../../Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {IGetUsersRequestingFriendshipParameters} from "../../Parameters/AccountClient/GetUsersRequestingFriendshipParameters";
import {IGetUserIdsYouRequestedToFollowParameters} from "../../Parameters/AccountClient/GetUserIdsYouRequestedToFollowParameters";
import {IGetUsersYouRequestedToFollowParameters} from "../../Parameters/AccountClient/GetUsersYouRequestedToFollowParameters";
import {IUpdateRelationshipParameters} from "../../Parameters/AccountClient/UpdateRelationshipParameters";
import {IRelationshipState} from "../../Models/Interfaces/IRelationshipState";
import {IGetRelationshipsWithParameters} from "../../Parameters/AccountClient/GetRelationshipsWithParameters";
import {IGetUserIdsWhoseRetweetsAreMutedParameters} from "../../Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {IGetMutedUserIdsParameters} from "../../Parameters/AccountClient/GetMutedUserIdsParameters";
import {IGetMutedUsersParameters} from "../../Parameters/AccountClient/GetMutedUsersParameters";
import {IMuteUserParameters} from "../../Parameters/AccountClient/MuteUserParameters";
import {IUnmuteUserParameters} from "../../Parameters/AccountClient/UnMuteUserParameters";
import {IUserDTO} from "../../Models/Interfaces/DTO/IUserDTO";
import {IGetProfileImageParameters} from "../../Parameters/UsersClient/GetProfileImageParameters";
import {Stream} from "stream";
import {IGetUsersParameters} from "../../Parameters/UsersClient/GetUsersParameters";
import {IUserDictionary} from "../../Models/UserDictionary";
import {IUsersClientParametersValidator} from "../../../Core/Client/Validators/UsersClientParametersValidator";
import {InjectionToken} from "@angular/core";

export interface IUsersClient {
  // Validate all the Users client parameters
  parametersValidator: IUsersClientParametersValidator;

  // #region AuthenticatedUser

  getAuthenticatedUserAsync(): Promise<IAuthenticatedUser>;

  /// <summary>
  /// Get the authenticated user based on the client's credentials
  /// <para>Read more : https://dev.twitter.com/rest/reference/get/account/verify_credentials </para>
  /// </summary>
  /// <returns>The client's authenticated user</returns>
  getAuthenticatedUserAsync(parameters: IGetAuthenticatedUserParameters): Promise<IAuthenticatedUser>;

  //#endregion

  // #region Get User

  getUserAsync(userId: number): Promise<IUser>;

  getUserAsync(username: string): Promise<IUser>;

  getUserAsync(userIdentifier: IUserIdentifier): Promise<IUser>;

  /// <summary>
  /// Get a user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-show </para>
  /// </summary>
  /// <returns>Returns a user</returns>
  getUserAsync(parameters: IGetUserParameters): Promise<IUser>;

  // #endregion

  // #region GetUsers

  getUsersAsync(userIds: Array<number>): Promise<IUser[]>;

  getUsersAsync(usernames: Array<string>): Promise<IUser[]>;

  getUsersAsync(userIdentifiers: Array<IUserIdentifier>): Promise<IUser[]>;

  /// <summary>
  /// Get multiple users
  /// </summary>
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-lookup </para>
  /// <returns>Returns the list of users requested</returns>
  getUsersAsync(parameters: IGetUsersParameters): Promise<IUser[]>

  // #endregion

  // #region GetFriendIds / Friends

  getFriendIdsAsync(username: string): Promise<number[]>;

  getFriendIdsAsync(userId: number): Promise<number[]>;

  getFriendIdsAsync(user: IUserIdentifier): Promise<number[]>;

  /// Get friend ids from a specific user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-ids </para>
  /// <returns>List a user's friend ids</returns>
  getFriendIdsAsync(parameters: IGetFriendIdsParameters): Promise<number[]>;

  getFriendIdsIterator(username: string): ITwitterIterator<number>;

  getFriendIdsIterator(userId: number): ITwitterIterator<number>;

  getFriendIdsIterator(userIdentifier: IUserIdentifier): ITwitterIterator<number>;

  /// <summary>
  /// Get friend ids from a specific user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-ids </para>
  /// </summary>
  /// <returns>An iterator to list a user's friend ids</returns>
  getFriendIdsIterator(parameters: IGetFriendIdsParameters): ITwitterIterator<number>;

  getFriendsAsync(userId: number): Promise<IUser[]>;

  getFriendsAsync(username: string): Promise<IUser[]>;

  getFriendsAsync(user: IUserIdentifier): Promise<IUser[]>;

  /// <summary>
  /// Get friends from a specific user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-ids </para>
  /// </summary>
  /// <returns>List of a user's friends</returns>
  getFriendsAsync(parameters: IGetFriendsParameters): Promise<IUser[]>;

  /// <summary>
  /// Get friends from a specific user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-ids </para>
  /// </summary>
  /// <returns>An iterator to list a user's friends</returns>
  getFriendsIterator(parameters: IGetFriendsParameters): IMultiLevelCursorIterator<number, IUser>;

  // #endregion

  //  #region GetFollowerIds / Followers

  getFollowerIdsAsync(userId: number): Promise<number[]>;

  getFollowerIdsAsync(username: string): Promise<number[]>;

  getFollowerIdsAsync(user: IUserIdentifier): Promise<number[]>;

  /// <summary>
  /// Get the follower ids from a specific user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-followers-ids </para>
  /// </summary>
  /// <returns>List of a user's follower ids</returns>
  getFollowerIdsAsync(parameters: IGetFollowerIdsParameters): Promise<number[]>;

  getFollowerIdsIterator(userId: number): ITwitterIterator<number>;

  getFollowerIdsIterator(username: string): ITwitterIterator<number>;

  getFollowerIdsIterator(userIdentifier: IUserIdentifier): ITwitterIterator<number>;

  /// <summary>
  /// Get the follower ids from a specific user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-followers-ids </para>
  /// </summary>
  /// <returns>An iterator to list a user's follower ids'</returns>
  getFollowerIdsIterator(parameters: IGetFollowerIdsParameters): ITwitterIterator<number>;

  getFollowersAsync(userId: number): Promise<IUser[]>;

  getFollowersAsync(username: string): Promise<IUser[]>;

  getFollowersAsync(user: IUserIdentifier): Promise<IUser[]>;

  /// <summary>
  /// Get the followers from a specific user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-followers-ids </para>
  /// </summary>
  /// <returns>List of a user's followers</returns>
  getFollowersAsync(parameters: IGetFollowersParameters): Promise<IUser[]>

  /// <summary>
  /// Get the followers from a specific user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-followers-ids </para>
  /// </summary>
  /// <returns>An iterator to list a user's followers'</returns>
   getFollowersIterator(parameters: IGetFollowersParameters): IMultiLevelCursorIterator<number, IUser>;

  getFollowersIterator(parameters: IGetFollowersParameters);

  // #endregion

  // #region Relationship between users

  getRelationshipBetweenAsync(sourceUserId: number, targetUserId: number): Promise<IRelationshipDetails>;

  getRelationshipBetweenAsync(sourceUserId: number, targetUsername: string): Promise<IRelationshipDetails>;

  getRelationshipBetweenAsync(sourceUserId: number, targetUser: IUserIdentifier): Promise<IRelationshipDetails>;

  getRelationshipBetweenAsync(sourceUsername: string, targetUserId: number): Promise<IRelationshipDetails>;

  getRelationshipBetweenAsync(sourceUsername: string, targetUsername: string): Promise<IRelationshipDetails>;

  getRelationshipBetweenAsync(sourceUsername: string, targetUser: IUserIdentifier): Promise<IRelationshipDetails>;

  getRelationshipBetweenAsync(sourceUser: IUserIdentifier, targetUserId: number): Promise<IRelationshipDetails>;

  getRelationshipBetweenAsync(sourceUser: IUserIdentifier, targetUsername: string): Promise<IRelationshipDetails>;

  getRelationshipBetweenAsync(sourceUser: IUserIdentifier, targetUser: IUserIdentifier): Promise<IRelationshipDetails>;

  /// <summary>
  /// Get the relationship between a source user and the target
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-show </para>
  /// </summary>
  /// <returns>Returns relationship information seen from a source user</returns>
  getRelationshipBetweenAsync(parameters: IGetRelationshipBetweenParameters): Promise<IRelationshipDetails>

  // #endregion

  // #region Block / Unblock

  blockUserAsync(userId: number): Promise<IUser>;

  blockUserAsync(username: string): Promise<IUser>;

  blockUserAsync(user: IUserIdentifier): Promise<IUser>;

  /// <summary>
  /// Block a user from the client's account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-blocks-create </para>
  /// </summary>
  blockUserAsync(parameters: IBlockUserParameters): Promise<IUser>;

  unblockUserAsync(userId: number): Promise<IUser>;

  unblockUserAsync(username: string): Promise<IUser>;

  unblockUserAsync(user: IUserIdentifier): Promise<IUser>;

  /// <summary>
  /// Unblock a user from the client's account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-blocks-destroy </para>
  /// </summary>
  unblockUserAsync(parameters: IUnblockUserParameters): Promise<IUser>;

  reportUserForSpamAsync(userId: number): Promise<IUser>;

  reportUserForSpamAsync(username: string): Promise<IUser>;

  reportUserForSpamAsync(user: IUserIdentifier): Promise<IUser>;

  /// <summary>
  /// Report a user for spam
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-users-report_spam </para>
  /// </summary>
  reportUserForSpamAsync(parameters: IReportUserForSpamParameters): Promise<IUser>;

  getBlockedUserIdsAsync(): Promise<number[]>;

  /// <summary>
  /// Get the user ids blocked by the client's account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-blocks-ids </para>
  /// </summary>
  /// <returns>List of the blocked user ids</returns>
  getBlockedUserIdsAsync(parameters: IGetBlockedUserIdsParameters): Promise<number[]>

  getBlockedUserIdsIterator(): ITwitterIterator<number>;

  /// <summary>
  /// Get the user ids blocked by the client's account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-blocks-ids </para>
  /// </summary>
  /// <returns>An iterator to list the blocked users</returns>
  getBlockedUserIdsIterator(parameters: IGetBlockedUserIdsParameters): ITwitterIterator<number>;

  getBlockedUsersAsync(): Promise<IUser[]>;

  /// <summary>
  /// Get the users blocked by the client's account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-blocks-ids </para>
  /// </summary>
  /// <returns>List of blocked users</returns>
  getBlockedUsersAsync(parameters: IGetBlockedUsersParameters): Promise<IUser[]>;

  getBlockedUsersIterator(): ITwitterIterator<IUser>;

  /// <summary>
  /// Get the users blocked by the client's account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-blocks-ids </para>
  /// </summary>
  /// <returns>An iterator to list the blocked users</returns>
  getBlockedUsersIterator(parameters: IGetBlockedUsersParameters): ITwitterIterator<IUser>;

  // #endregion

  // #region Follow / Unfollow

  followUserAsync(userId: number): Promise<IUser>;

  followUserAsync(username: string): Promise<IUser>;

  followUserAsync(user: IUserIdentifier): Promise<IUser>;

  /// <summary>
  /// Follow a user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-create </para>
  /// </summary>
  followUserAsync(parameters: IFollowUserParameters): Promise<IUser>;

  unfollowUserAsync(userId: number): Promise<IUser>;

  unfollowUserAsync(username: string): Promise<IUser>;

  unfollowUserAsync(user: IUserIdentifier): Promise<IUser>;

  /// <summary>
  /// Stops following a user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-destroy </para>
  /// </summary>
  unfollowUserAsync(parameters: IUnfollowUserParameters): Promise<IUser>

  // #endregion

  // #region Follower Requests

  getUserIdsRequestingFriendshipAsync(): Promise<number[]>;

  /// <summary>
  /// Get the pending follower ids requests for protected accounts.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-incoming </para>
  /// <para>Protected accounts : https://help.twitter.com/en/safety-and-security/public-and-protected-tweets </para>
  /// </summary>
  /// <returns>List the user ids who requested to follow the client's account</returns>
  getUserIdsRequestingFriendshipAsync(parameters: IGetUserIdsRequestingFriendshipParameters): Promise<number[]>

  getUserIdsRequestingFriendshipIterator(): ITwitterIterator<number>

  /// <summary>
  /// Get the pending follower ids requests for protected accounts.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-incoming </para>
  /// <para>Protected accounts : https://help.twitter.com/en/safety-and-security/public-and-protected-tweets </para>
  /// </summary>
  /// <returns>An iterator to list the user ids who requested to follow the client's account</returns>
  getUserIdsRequestingFriendshipIterator(parameters: IGetUserIdsRequestingFriendshipParameters): ITwitterIterator<number>

  getUsersRequestingFriendshipAsync(): Promise<IUser[]>;

  /// <summary>
  /// Get the pending follower requests for protected accounts.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-incoming </para>
  /// <para>Protected accounts : https://help.twitter.com/en/safety-and-security/public-and-protected-tweets </para>
  /// </summary>
  getUsersRequestingFriendshipAsync(parameters: IGetUsersRequestingFriendshipParameters): Promise<IUser[]>

  getUsersRequestingFriendshipIterator(): IMultiLevelCursorIterator<number, IUser>;

  /// <summary>
  /// Get the pending follower requests for protected accounts.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-incoming </para>
  /// <para>Protected accounts : https://help.twitter.com/en/safety-and-security/public-and-protected-tweets </para>
  /// </summary>
  /// <returns>An iterator to list the users who requested to follow the client's account</returns>
  getUsersRequestingFriendshipIterator(parameters: IGetUsersRequestingFriendshipParameters): IMultiLevelCursorIterator<number, IUser>

  getUserIdsYouRequestedToFollowAsync(): Promise<number[]>;

  /// <summary>
  /// Get the pending follower ids requests that you have requested.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-outgoing </para>
  /// <para>Protected accounts : https://help.twitter.com/en/safety-and-security/public-and-protected-tweets</para>
  /// </summary>
  /// <returns>List the user ids the client's account requested to follow</returns>
  getUserIdsYouRequestedToFollowAsync(parameters: IGetUserIdsYouRequestedToFollowParameters): Promise<number[]>;

  getUserIdsYouRequestedToFollowIterator(): ITwitterIterator<number>;

  /// <summary>
  /// Get the pending follower ids requests that you have requested.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-outgoing </para>
  /// <para>Protected accounts : https://help.twitter.com/en/safety-and-security/public-and-protected-tweets</para>
  /// </summary>
  /// <returns>An iterator to list the user ids the client's account requested to follow</returns>
  getUserIdsYouRequestedToFollowIterator(parameters: IGetUserIdsYouRequestedToFollowParameters): ITwitterIterator<number>;

  getUsersYouRequestedToFollowAsync(): Promise<IUser[]>;

  /// <summary>
  /// Get the pending follower ids requests that you have requested.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-outgoing </para>
  /// <para>Protected accounts : https://help.twitter.com/en/safety-and-security/public-and-protected-tweets</para>
  /// </summary>
  /// <returns>List the users the client's account requested to follow</returns>
  getUsersYouRequestedToFollowAsync(parameters: IGetUsersYouRequestedToFollowParameters): Promise<IUser[]>;

  getUsersYouRequestedToFollowIterator(): IMultiLevelCursorIterator<number, IUser>;

  /// <summary>
  /// Get the pending follower ids requests that you have requested.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-outgoing </para>
  /// <para>Protected accounts : https://help.twitter.com/en/safety-and-security/public-and-protected-tweets</para>
  /// </summary>
  /// <returns>An iterator to list the users the client's account requested to follow</returns>
  getUsersYouRequestedToFollowIterator(parameters: IGetUsersYouRequestedToFollowParameters): IMultiLevelCursorIterator<number, IUser>;

  // #endregion

  // #region Relationship

  /// <summary>
  /// Modify the relationship between the authenticated user (source) and another user (target).
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-update </para>
  /// </summary>
  /// <returns>Returns whether the update operation was successful.</returns>
  updateRelationshipAsync(parameters: IUpdateRelationshipParameters): Promise<void>;

  getRelationshipsWithAsync(userIds: number[]): Promise<IUserDictionary<IRelationshipState>>;

  getRelationshipsWithAsync(usernames: string[]): Promise<IUserDictionary<IRelationshipState>>;

  getRelationshipsWithAsync(users: IUserIdentifier[]): Promise<IUserDictionary<IRelationshipState>>;

  getRelationshipsWithAsync(users: IUser[]): Promise<IUserDictionary<IRelationshipState>>;

  /// <summary>
  /// Get the relationships between the account's user and multiple users
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-lookup </para>
  /// </summary>
  /// <returns>Returns a dictionary of user and their relationship with the client's user</returns>
  getRelationshipsWithAsync(parameters: IGetRelationshipsWithParameters): Promise<IUserDictionary<IRelationshipState>>

  // #endregion

  // #region Muted

  getUserIdsWhoseRetweetsAreMutedAsync(): Promise<number[]>;

  /// <summary>
  /// Get the user ids for whom the retweets are muted
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-no_retweets-ids </para>
  /// </summary>
  /// <returns>Returns a list of user ids for whom the retweets are muted</returns>
  getUserIdsWhoseRetweetsAreMutedAsync(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters): Promise<number[]>;

  getMutedUserIdsAsync(): Promise<number[]>;

  /// <summary>
  /// Get the muted user ids.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-mutes-users-ids </para>
  /// </summary>
  /// <returns>List of the user ids muted by the client's account</returns>
  getMutedUserIdsAsync(parameters: IGetMutedUserIdsParameters): Promise<number[]>;

  getMutedUserIdsIterator(): ITwitterIterator<number>;

  /// <summary>
  /// Get the muted user ids.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-mutes-users-ids </para>
  /// </summary>
  /// <returns>An iterator to list the user ids muted by the client's account</returns>

  getMutedUserIdsIterator(parameters: IGetMutedUserIdsParameters): ITwitterIterator<number>;

  getMutedUsersAsync(): Promise<IUser[]>;

  /// <summary>
  /// Get the muted user ids.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-mutes-users-list </para>
  /// </summary>
  /// <returns>List of the users muted by the client's account</returns>
  getMutedUsersAsync(parameters: IGetMutedUsersParameters): Promise<IUser[]>;

  getMutedUsersIterator(): ITwitterIterator<IUser>;

  /// <summary>
  /// Get the muted user ids.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-mutes-users-list </para>
  /// </summary>
  /// <returns>An iterator to list the users muted by the client's account</returns>
  getMutedUsersIterator(parameters: IGetMutedUsersParameters): ITwitterIterator<IUser>;

  muteUserAsync(userId: number): Promise<IUser>;

  muteUserAsync(username: string): Promise<IUser>;

  muteUserAsync(user: IUserIdentifier): Promise<IUser>;

  /// <summary>
  /// Mute a user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-mutes-users-create </para>
  /// </summary>
  muteUserAsync(parameters: IMuteUserParameters): Promise<IUser>;

  unmuteUserAsync(userId: number): Promise<IUser>;

  unmuteUserAsync(username: string): Promise<IUser>;

  unmuteUserAsync(user: IUserIdentifier): Promise<IUser>;

  /// <summary>
  /// Remove the mute of a user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-mutes-users-destroy </para>
  /// </summary>
  unmuteUserAsync(parameters: IUnmuteUserParameters): Promise<IUser>;

  // #endregion

  // #region Profile Image

  getProfileImageStreamAsync(url: string): Promise<Stream>;

  getProfileImageStreamAsync(user: IUser): Promise<Stream>;

  getProfileImageStreamAsync(user: IUserDTO): Promise<Stream>;

  /// <summary>
  /// Get the profile image of a user
  /// </summary>
  /// <returns>A stream of the image file</returns>
  getProfileImageStreamAsync(parameters: IGetProfileImageParameters): Promise<Stream>;

  // #endregion
}

export const IUsersClientToken = new InjectionToken<IUsersClient>('IUsersClient', {
  providedIn: 'root',
  factory: () => new,
});
