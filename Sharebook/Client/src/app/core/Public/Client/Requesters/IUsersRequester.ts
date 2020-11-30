import {Inject, InjectionToken} from "@angular/core";

import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {IGetAuthenticatedUserParameters} from "../../Parameters/AccountClient/GetAuthenticatedUserParameters";
import {IUserDTO} from "../../Models/Interfaces/DTO/IUserDTO";
import {IGetUserParameters} from "../../Parameters/UsersClient/GetUserParameters";
import {IGetFriendIdsParameters} from "../../Parameters/UsersClient/GetFriendIdsParameters";
import {IGetUsersParameters} from "../../Parameters/UsersClient/GetUsersParameters";
import {ITwitterPageIterator} from "../../../Core/Iterators/TwitterPageIterator";
import {IIdsCursorQueryResultDTO} from "../../Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {IGetFollowerIdsParameters} from "../../Parameters/UsersClient/GetFollowerIdsParameters";
import {IGetRelationshipBetweenParameters} from "../../Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IRelationshipDetailsDTO} from "../../Models/Interfaces/DTO/IRelationshipDetailsDTO";
import {IBlockUserParameters} from "../../Parameters/AccountClient/BlockUserParameters";
import {IUnblockUserParameters} from "../../Parameters/AccountClient/UnblockUserParameters";
import {IReportUserForSpamParameters} from "../../Parameters/AccountClient/ReportUserForSpamParameters";
import {IGetBlockedUserIdsParameters} from "../../Parameters/AccountClient/GetBlockedUserIdsParameter";
import {IGetBlockedUsersParameters} from "../../Parameters/AccountClient/GetBlockedUsersParameter";
import {IUserCursorQueryResultDTO} from "../../Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {IFollowUserParameters} from "../../Parameters/AccountClient/FollowUserParameters";
import {IUpdateRelationshipParameters} from "../../Parameters/AccountClient/UpdateRelationshipParameters";
import {IUnfollowUserParameters} from "../../Parameters/AccountClient/UnfollowUserParameters";
import {IGetUserIdsRequestingFriendshipParameters} from "../../Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {IGetUserIdsYouRequestedToFollowParameters} from "../../Parameters/AccountClient/GetUserIdsYouRequestedToFollowParameters";
import {IGetRelationshipsWithParameters} from "../../Parameters/AccountClient/GetRelationshipsWithParameters";
import {IRelationshipStateDTO} from "../../Models/Interfaces/DTO/IRelationshipStateDTO";
import {IGetUserIdsWhoseRetweetsAreMutedParameters} from "../../Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {IGetMutedUserIdsParameters} from "../../Parameters/AccountClient/GetMutedUserIdsParameters";
import {IGetMutedUsersParameters} from "../../Parameters/AccountClient/GetMutedUsersParameters";
import {IMuteUserParameters} from "../../Parameters/AccountClient/MuteUserParameters";
import {IUnmuteUserParameters} from "../../Parameters/AccountClient/UnMuteUserParameters";
import {IGetProfileImageParameters} from "../../Parameters/UsersClient/GetProfileImageParameters";
import {Stream} from "stream";
import {UsersRequester} from "../../../../sharebook/Client/Requesters/UsersRequester";
import {UsersClientRequiredParametersValidator} from "../../../Core/Client/Validators/UsersClientRequiredParametersValidator";
import {TwitterClientEvents} from "../../../Core/Events/TweetinviGlobalEvents";
import {UserController} from "../../../../controllers/User/UserController";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import {Observable} from "rxjs";
import {AppInjector} from "../../../../sharebook/Injectinvi/app-injector";

/// <summary>
/// A client providing all the methods related with users.
/// The results from this client contain additional metadata.
/// </summary>
export interface IUsersRequester {
  /// <summary>
  /// Get the authenticated user based on the TwitterClient's credentials
  /// <para>Read more : https://dev.twitter.com/rest/reference/get/account/verify_credentials </para>
  /// </summary>
  /// <returns>TwitterResult containing the client's authenticated user</returns>
  getAuthenticatedUserAsync(parameters: IGetAuthenticatedUserParameters): Promise<ITwitterResult<IUserDTO>>;

  /// <summary>
  /// Get a user
  /// </summary>
  /// <returns>TwitterResult containing a user</returns>
  getUserAsync(parameters: IGetUserParameters): Promise<ITwitterResult<IUserDTO>>;

  /// <summary>
  /// Get multiple users
  /// </summary>
  /// <returns>TwitterResult containing a collection of users</returns>
  getUsersAsync(parameters: IGetUsersParameters): Promise<ITwitterResult<IUserDTO[]>>;

  /// <summary>
  /// Get friend ids from a specific user
  /// </summary>
  /// <returns>TwitterCursorResult to iterate over all the user's friends</returns>
  getFriendIdsIterator(parameters: IGetFriendIdsParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  /// <summary>
  /// Get friend ids from a specific user
  /// </summary>
  /// <returns>TwitterCursorResult to iterate over all the user's friends</returns>
  getFollowerIdsIterator(parameters: IGetFollowerIdsParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  /// <summary>
  /// Get relationship information between 2 users.
  /// </summary>
  /// <returns>Returns detailed information about the relationship between two arbitrary users</returns>
  getRelationshipBetweenAsync(parameters: IGetRelationshipBetweenParameters): Promise<ITwitterResult<IRelationshipDetailsDTO>>;

  /// <summary>
  /// Block a user from the client's account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-blocks-create </para>
  /// </summary>
  /// <returns>TwitterResult containing the blocked user</returns>
  blockUserAsync(parameters: IBlockUserParameters): Promise<ITwitterResult<IUserDTO>>;

  /// <summary>
  /// Unblock a user from the client's account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-blocks-destroy </para>
  /// </summary>
  /// <returns>TwitterResult containing the unblocked user</returns>
  unblockUserAsync(parameters: IUnblockUserParameters): Promise<ITwitterResult<IUserDTO>>;

  /// <summary>
  /// Report a user for spam
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-users-report_spam </para>
  /// </summary>
  /// <returns>TwitterResult containing the reported user</returns>
  reportUserForSpamAsync(parameters: IReportUserForSpamParameters): Promise<ITwitterResult<IUserDTO>>;

  /// <summary>
  /// Get the user ids blocked by the client's account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-blocks-ids </para>
  /// </summary>
  /// <returns>An iterator to list the blocked user ids</returns>
  getBlockedUserIdsIterator(parameters: IGetBlockedUserIdsParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  /// <summary>
  /// Get the users blocked by the client's account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-blocks-ids </para>
  /// </summary>
  /// <returns>An iterator to list the blocked users</returns>
  getBlockedUsersIterator(parameters: IGetBlockedUsersParameters): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>;

  // FOLLOWERS

  /// <summary>
  /// Follow a user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-create </para>
  /// </summary>
  /// <returns>TwitterResult containing the followed user</returns>
  followUserAsync(parameters: IFollowUserParameters): Promise<ITwitterResult<IUserDTO>>;

  /// <summary>
  /// Modify the relationship between the authenticated user (source) and another user (target).
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-update </para>
  /// </summary>
  /// <returns>TwitterResult containing the updated relationship details</returns>
  updateRelationshipAsync(parameters: IUpdateRelationshipParameters): Promise<ITwitterResult<IRelationshipDetailsDTO>>;

  /// <summary>
  /// Stops following a user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-destroy </para>
  /// </summary>
  /// <returns>TwitterResult containing the user who is no longer followed</returns>
  unfollowUserAsync(parameters: IUnfollowUserParameters): Promise<ITwitterResult<IUserDTO>>;

  // ONGOING REQUESTS

  /// <summary>
  /// Get the pending follower requests you have received.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-incoming </para>
  /// <para>Protected accounts : https://help.twitter.com/en/safety-and-security/public-and-protected-tweets</para>
  /// </summary>
  /// <returns>An iterator to list the users who requested to follow the client's account</returns>
  getUserIdsRequestingFriendshipIterator(parameters: IGetUserIdsRequestingFriendshipParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  /// <summary>
  /// Get the pending follower requests that you have requested.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-outgoing </para>
  /// <para>Protected accounts : https://help.twitter.com/en/safety-and-security/public-and-protected-tweets</para>
  /// </summary>
  /// <returns>An iterator to list the user ids the client's account requested to follow</returns>
  getUserIdsYouRequestedToFollowIterator(parameters: IGetUserIdsYouRequestedToFollowParameters);

  // FRIENDSHIPS

  /// <summary>
  /// Get the relationships of the client's user with multiple other users
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-lookup </para>
  /// </summary>
  /// <returns>TwitterResult containing the relationships between the authenticated user and multiple other users</returns>
  getRelationshipsWithAsync(parameters: IGetRelationshipsWithParameters): Promise<ITwitterResult<IRelationshipStateDTO[]>>;

  /// <summary>
  /// Get the user ids for whom the retweets are muted
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-no_retweets-ids </para>
  /// </summary>
  /// <returns>TwitterResult containing a list of user ids for whom the retweets are muted</returns>
  getUserIdsWhoseRetweetsAreMutedAsync(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters): Promise<ITwitterResult<number[]>>;

  /// <summary>
  /// Get the muted user ids.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-mutes-users-ids </para>
  /// </summary>
  /// <returns>An iterator to list the user ids muted by the client's account</returns>
  getMutedUserIdsIterator(parameters: IGetMutedUserIdsParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  /// <summary>
  /// Get the muted user ids.
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-mutes-users-list </para>
  /// </summary>
  /// <returns>An iterator to list the users muted by the client's account</returns>
  getMutedUsersIterator(parameters: IGetMutedUsersParameters): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>;

  /// <summary>
  /// Mute a user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-mutes-users-create </para>
  /// </summary>
  /// <returns>Twitter result containing the authenticated user</returns>
  muteUserAsync(parameters: IMuteUserParameters): Promise<ITwitterResult<IUserDTO>>;

  /// <summary>
  /// Remove the mute of a user
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-mutes-users-destroy </para>
  /// </summary>
  /// <returns>Twitter result containing the authenticated user</returns>
  unmuteUserAsync(parameters: IUnmuteUserParameters): Promise<ITwitterResult<IUserDTO>>;

  /// <summary>
  /// Get the profile image of a user
  /// </summary>
  /// <returns>A stream of the image file</returns>
  getProfileImageStream(parameters: IGetProfileImageParameters): Promise<any>;
}

export const IUsersRequesterToken = new InjectionToken<IUsersRequester>('IUsersRequester', {
  providedIn: 'root',
  factory: () => AppInjector.get(UsersRequester),
});
