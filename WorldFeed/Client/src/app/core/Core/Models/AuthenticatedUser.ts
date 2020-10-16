import {IUserIdentifier} from "../../Public/Models/Interfaces/IUserIdentifier";
import InvalidOperationException from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/InvalidOperationException";
import {ITwitterListIdentifier} from "../../Public/Models/Interfaces/ITwitterListIdentifier";
import {IUserDTO} from "../../Public/Models/Interfaces/DTO/IUserDTO";
import {ITwitterClient} from "../../Public/ITwitterClient";
import {User} from "./User";
import {IReadOnlyTwitterCredentials} from "./Authentication/ReadOnlyTwitterCredentials";
import {IAuthenticatedUser} from "../../Public/Models/Interfaces/IAuthenticatedUser";
import {ITweet} from "../../Public/Models/Interfaces/ITweet";
import {ISavedSearch} from "../../Public/Models/Interfaces/ISavedSearch";
import {GetUsersRequestingFriendshipParameters} from "../../Public/Parameters/AccountClient/GetUsersRequestingFriendshipParameters";
import {IUser} from "../../Public/Models/Interfaces/IUser";
import {GetUserIdsRequestingFriendshipParameters} from "../../Public/Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {IUpdateRelationshipParameters} from "../../Public/Parameters/AccountClient/UpdateRelationshipParameters";
import {GetUsersYouRequestedToFollowParameters} from "../../Public/Parameters/AccountClient/GetUsersYouRequestedToFollowParameters";
import {IMessage} from "../../Public/Models/Interfaces/IMessage";
import {IPublishMessageParameters} from "../../Public/Parameters/MessageClient/PublishMessageParameters";
import {IPublishTweetParameters} from "../../Public/Parameters/TweetsClient/PublishTweetParameters";
import {IUpdateAccountSettingsParameters} from "../../Public/Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IAccountSettings} from "../../Public/Models/Interfaces/IAccountSettings";
import {ITwitterList} from "../../Public/Models/Interfaces/ITwitterList";
import Type from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// A token user is unique to a Token and provides action that will be executed from the connected user
// and that are not available from another user like (read my messages)
export class AuthenticatedUser extends User implements IAuthenticatedUser {
  constructor(userDTO: IUserDTO, client: ITwitterClient) {
    super(userDTO, client);
  }

  get email(): string {
    return super.userDTO.email;
  }

  get credentials(): IReadOnlyTwitterCredentials {
    return this.client.Credentials;
  }

  // Home Timeline
  public getHomeTimelineAsync(): Promise<ITweet[]> {
    return super.client.Timelines.getHomeTimelineAsync();
  }

  public getMentionsTimelineAsync(): Promise<ITweet[]> {
    return super.client.Timelines.getMentionsTimelineAsync();
  }

  // Friendships
  public updateRelationshipAsync(parameters: IUpdateRelationshipParameters): Promise<void> {
    return super.client.Users.updateRelationshipAsync(parameters);
  }

  // Friends - Followers
  public getUserIdsRequestingFriendshipAsync(): Promise<number[]> {
    return super.client.Users.getUserIdsRequestingFriendshipAsync(new GetUserIdsRequestingFriendshipParameters());
  }

  public getUsersRequestingFriendshipAsync(): Promise<IUser[]> {
    return super.client.Users.getUsersRequestingFriendshipAsync(new GetUsersRequestingFriendshipParameters());
  }

  public getUserIdsYouRequestedToFollowAsync(): Promise<number[]> {
    return super.client.Users.getUserIdsYouRequestedToFollowAsync();
  }

  public getUsersYouRequestedToFollowAsync(): Promise<IUser[]> {
    return super.client.Users.getUsersYouRequestedToFollowAsync(new GetUsersYouRequestedToFollowParameters());
  }


  // Follow

  public followUserAsync(userIdOrUsernameOrUser: | number | string | IUserIdentifier): Promise<IUser> /*<void>*/ {
    let typeCurrent;
    if (Type.isNumber(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as number;
    } else if (Type.isString(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as string;
    } else {
      typeCurrent = userIdOrUsernameOrUser as IUserIdentifier;
    }

    return super.client.Users.followUserAsync(typeCurrent);
  }

  public unfollowUserAsync(userIdOrUsernameOrUser: number | string | IUserIdentifier): Promise<IUser> {
    let typeCurrent;
    if (Type.isNumber(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as number;
    } else if (Type.isString(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as string;
    } else {
      typeCurrent = userIdOrUsernameOrUser as IUserIdentifier;
    }

    return super.client.Users.unfollowUserAsync(typeCurrent);
  }

  public listSavedSearchesAsync(): Promise<ISavedSearch[]> {
    return super.client.Search.listSavedSearchesAsync();
  }

  // Block

  public blockUserAsync(userIdOrUsernameOrUser?: number | string | IUserIdentifier): Promise<IUser> {
    if (!userIdOrUsernameOrUser) {
      throw new InvalidOperationException("You cannot block yourself... 🤣🤣🤣");
    }

    let typeCurrent;
    if (Type.isNumber(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as number;
    } else if (Type.isString(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as string;
    } else {
      typeCurrent = userIdOrUsernameOrUser as IUserIdentifier;
    }

    return super.client.Users.blockUserAsync(typeCurrent);
  }

  // Unblock

  public unblockUserAsync(userIdOrUsernameOrUser?: number | string | IUserIdentifier): Promise<IUser> {
    if (!userIdOrUsernameOrUser) {
      throw new InvalidOperationException("You cannot unblock yourself... 🤑🤑🤑");
    }

    let typeCurrent;
    if (Type.isNumber(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as number;
    } else if (Type.isString(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as string;
    } else {
      typeCurrent = userIdOrUsernameOrUser as IUserIdentifier;
    }

    return super.client.Users.unblockUserAsync(typeCurrent);
  }

  // Get Blocked Users
  public getBlockedUserIdsAsync(): Promise<number[]> {
    return super.client.Users.getBlockedUserIdsAsync();
  }

  public getBlockedUsersAsync(): Promise<IUser[]> {
    return super.client.Users.getBlockedUsersAsync();
  }

  // Spam

  public reportUserForSpamAsync(userIdOrUsernameOrUser?: number | string | IUserIdentifier): Promise<IUser> {
    if (!userIdOrUsernameOrUser) {
      throw new InvalidOperationException("You cannot report yourself for spam... 🥵🤬😡");
    }

    let typeCurrent;
    if (Type.isNumber(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as number;
    } else if (Type.isString(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as string;
    } else {
      typeCurrent = userIdOrUsernameOrUser as IUserIdentifier;
    }

    return super.client.Users.reportUserForSpamAsync(typeCurrent);
  }

  // Direct Messages
  public getLatestMessagesAsync(): Promise<IMessage[]> {
    return super.client.Messages.getMessagesAsync();
  }

  public publishMessageAsync(publishMessageParameters: IPublishMessageParameters): Promise<IMessage> {
    return super.client.Messages.publishMessageAsync(publishMessageParameters);
  }

  // Tweet

  public publishTweetAsync(textOrParameters: string | IPublishTweetParameters): Promise<ITweet> {
    let typeCurrent;
    if (Type.isString(textOrParameters)) {
      typeCurrent = textOrParameters as string;
    } else {
      typeCurrent = textOrParameters as IPublishTweetParameters;
    }

    return super.client.Tweets.publishTweetAsync(typeCurrent);
  }

  // Settings
  public updateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters): Promise<IAccountSettings> {
    return super.client.AccountSettings.updateAccountSettingsAsync(parameters);
  }

  // Twitter Lists

  public subscribeToListAsync(listOrList: number | ITwitterListIdentifier): Promise<ITwitterList> {
    let typeCurrent;
    if (Type.isNumber(listOrList)) {
      typeCurrent = listOrList as number;
    } else {
      typeCurrent = listOrList as ITwitterListIdentifier;
    }

    return super.client.Lists.subscribeToListAsync(typeCurrent);
  }

  public unsubscribeFromListAsync(listOrList: number | ITwitterListIdentifier): Promise<ITwitterList> {
    let typeCurrent;
    if (Type.isNumber(listOrList)) {
      typeCurrent = listOrList as number;
    } else {
      typeCurrent = listOrList as ITwitterListIdentifier;
    }

    return super.client.Lists.unsubscribeFromListAsync(listOrList);
  }

  // Mute
  public getMutedUserIdsAsync(): Promise<number[]> {
    return super.client.Users.getMutedUserIdsAsync();
  }

  public getMutedUsersAsync(): Promise<IUser[]> {
    return super.client.Users.getMutedUsersAsync();
  }

  public muteUserAsync(userIdOrUsernameOrUser: number | string | IUserIdentifier): Promise<IUser> {
    let typeCurrent;
    if (Type.isNumber(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as number;
    } else if (Type.isString(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as string;
    } else {
      typeCurrent = userIdOrUsernameOrUser as IUserIdentifier;
    }

    return super.client.Users.muteUserAsync(typeCurrent);
  }

  public unmuteUserAsync(userIdOrUsernameOrUser: number | string | IUserIdentifier): Promise<IUser> {
    let typeCurrent;
    if (Type.isNumber(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as number;
    } else if (Type.isString(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as string;
    } else {
      typeCurrent = userIdOrUsernameOrUser as IUserIdentifier;
    }

    return super.client.Users.unmuteUserAsync(user);
  }
}
