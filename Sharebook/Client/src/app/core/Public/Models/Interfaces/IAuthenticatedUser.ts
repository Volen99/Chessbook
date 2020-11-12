import {inject, Inject, InjectionToken} from "@angular/core";

import {IReadOnlyTwitterCredentials} from "../../../Core/Models/Authentication/ReadOnlyTwitterCredentials";
import {IUserIdentifier} from "./IUserIdentifier";
import {ITwitterListIdentifier} from "./ITwitterListIdentifier";
import {IAccountSettings} from "./IAccountSettings";
import {IUser} from "./IUser";
import {ITweet} from "./ITweet";
import {IPublishTweetParameters} from "../../Parameters/TweetsClient/PublishTweetParameters";
import {IMessage} from "./IMessage";
import {IPublishMessageParameters} from "../../Parameters/MessageClient/PublishMessageParameters";
import {IUpdateRelationshipParameters} from "../../Parameters/AccountClient/UpdateRelationshipParameters";
import {ISavedSearch} from "./ISavedSearch";
import {ITwitterList} from "./ITwitterList";
import {IUpdateAccountSettingsParameters} from "../../Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {AuthenticatedUser} from "../../../Core/Models/AuthenticatedUser";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import {UserDTO} from "../../../Core/DTO/UserDTO";

// User associated with a Token, this "privileged" user has access private information like messages, timeline...
// @ts-ignore // coz of the override in AuthenticatedUser.ts line 107
export interface IAuthenticatedUser extends IUser {
  // Authenticated user email. This value will be null if the application has not been verified and authorized by Twitter.
  email: string;

  // Credentials used to authenticate this user.
  credentials: IReadOnlyTwitterCredentials;

  // #region Tweets

  // Send a Tweet
  publishTweetAsync(text: string): Promise<ITweet>;

  // Send a Tweet
  publishTweetAsync(parameters: IPublishTweetParameters): Promise<ITweet>;

  // #endregion

  // Get list of recent messages
  getLatestMessagesAsync(): Promise<IMessage[]>;

  // Publish a message.
  publishMessageAsync(publishMessageParameters: IPublishMessageParameters): Promise<IMessage>;

  // #region Timeline

  getHomeTimelineAsync(): Promise<ITweet[]>;

  getMentionsTimelineAsync(): Promise<ITweet[]>;

  // #endregion

  // Relationship

  // Modify the friendship between the authenticated user (source) and another user (target).
  updateRelationshipAsync(parameters: IUpdateRelationshipParameters): Promise<void>;

  // Friends - Followers

  // Get the user ids who requested to follow you.
  getUserIdsRequestingFriendshipAsync(): Promise<number[]>;

  // Get the users who requested to follow you.
  getUsersRequestingFriendshipAsync(): Promise<IUser[]>;

  // Get the user ids you've requested to follow.
  getUserIdsYouRequestedToFollowAsync(): Promise<number[]>;

  // Get the users you've requested to follow.
  getUsersYouRequestedToFollowAsync(): Promise<IUser[]>;

  // Follow a specific user.
  followUserAsync(user: IUserIdentifier): Promise<any>;    // plz check c# code, and below methods too, as you change "void" to "any"
  // Follow a specific user.
  followUserAsync(userId: number): Promise<any>;

  // Follow a specific user.
  followUserAsync(screenName: string): Promise<any>;

  // Unfollow a specific user.
  unfollowUserAsync(user: IUserIdentifier): Promise<any>;

  // Unfollow a specific user.
  unfollowUserAsync(userId: number): Promise<any>;

  // Unfollow a specific user.
  unfollowUserAsync(username: string): Promise<any>;

  // Saved Searches

  // Get the authenticated user saved searches.
  listSavedSearchesAsync(): Promise<Array<ISavedSearch>>;

  // Block

  // Block a specific user.
  blockUserAsync(user: IUserIdentifier): Promise<any>;

  // Block a specific user.
  blockUserAsync(userId: number): Promise<any>;

  // Block a specific user.
  blockUserAsync(username: string): Promise<any>;

  // Unblock

  // Unblock a specific user.
  unblockUserAsync(user: IUserIdentifier): Promise<any>;

  // Unblock a specific user.
  unblockUserAsync(userId: number): Promise<any>;

  // Unblock a specific user.
  unblockUserAsync(username: string): Promise<any>;

  // Get the ids of the user you blocked.
  getBlockedUserIdsAsync(): Promise<number[]>;

  // Retrieve the users blocked by the current user.
  getBlockedUsersAsync(): Promise<IUser[]>;

  // Spam

  // Report a specific user for being a spammer.
  reportUserForSpamAsync(user: IUserIdentifier): Promise<any>;

  // Report a specific user for being a spammer.
  reportUserForSpamAsync(userId: number): Promise<any>;

  // Report a specific user for being a spammer.
  reportUserForSpamAsync(userName: string): Promise<any>;

  // Mute

  // Get a list of the users you've muted.
  getMutedUserIdsAsync(): Promise<number[]>;

  // Get a list of the users you've muted.
  getMutedUsersAsync(): Promise<IUser[]>;

  // Mute a specific user.
  muteUserAsync(user: IUserIdentifier): Promise<any>;

  // Mute a specific user.
  muteUserAsync(userId: number): Promise<any>;

  // Mute a specific user.
  muteUserAsync(username: string): Promise<any>;

  // Unmute a specific user.
  unmuteUserAsync(user: IUserIdentifier): Promise<any>;

  // Unmute a specific user.
  unmuteUserAsync(userId: number): Promise<any>;

  // Unmute a specific user.
  unmuteUserAsync(username: string): Promise<any>;

  // Subscribe the authenticated user to a list.
  subscribeToListAsync(list: ITwitterListIdentifier): Promise<ITwitterList>;

  // Subscribe the authenticated user to a list.
  subscribeToListAsync(listId: number): Promise<ITwitterList>;

  // Unsubscribe the authenticated user to a list.
  unsubscribeFromListAsync(list: ITwitterListIdentifier): Promise<ITwitterList>;

  // Unsubscribe the authenticated user to a list.
  unsubscribeFromListAsync(listId: number): Promise<ITwitterList>;

  // Modify the authenticated account settings.
  updateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters): Promise<IAccountSettings>;
}

export const IAuthenticatedUserToken = new InjectionToken<IAuthenticatedUser>('IAuthenticatedUser', {
  providedIn: 'root',
  factory: () => new AuthenticatedUser(inject(UserDTO), inject(TwitterClient)),
});
