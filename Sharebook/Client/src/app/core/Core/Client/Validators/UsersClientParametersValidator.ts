import {Inject, Injectable, InjectionToken} from "@angular/core";

import {IGetAuthenticatedUserParameters} from "../../../Public/Parameters/AccountClient/GetAuthenticatedUserParameters";
import {IGetUserParameters} from "../../../Public/Parameters/UsersClient/GetUserParameters";
import {IGetUsersParameters} from "../../../Public/Parameters/UsersClient/GetUsersParameters";
import {IGetFollowerIdsParameters} from "../../../Public/Parameters/UsersClient/GetFollowerIdsParameters";
import {IGetFollowersParameters} from "../../../Public/Parameters/UsersClient/GetFollowersParameters";
import {IGetFriendIdsParameters} from "../../../Public/Parameters/UsersClient/GetFriendIdsParameters";
import {IGetFriendsParameters} from "../../../Public/Parameters/UsersClient/GetFriendsParameters";
import {IGetProfileImageParameters} from "../../../Public/Parameters/UsersClient/GetProfileImageParameters";
import {IBlockUserParameters} from "../../../Public/Parameters/AccountClient/BlockUserParameters";
import {IUnblockUserParameters} from "../../../Public/Parameters/AccountClient/UnblockUserParameters";
import {IReportUserForSpamParameters} from "../../../Public/Parameters/AccountClient/ReportUserForSpamParameters";
import {IGetBlockedUserIdsParameters} from "../../../Public/Parameters/AccountClient/GetBlockedUserIdsParameter";
import {IGetBlockedUsersParameters} from "../../../Public/Parameters/AccountClient/GetBlockedUsersParameter";
import {IUnfollowUserParameters} from "../../../Public/Parameters/AccountClient/UnfollowUserParameters";
import {IFollowUserParameters} from "../../../Public/Parameters/AccountClient/FollowUserParameters";
import {IGetUserIdsRequestingFriendshipParameters} from "../../../Public/Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {IGetUsersRequestingFriendshipParameters} from "../../../Public/Parameters/AccountClient/GetUsersRequestingFriendshipParameters";
import {IGetUserIdsYouRequestedToFollowParameters} from "../../../Public/Parameters/AccountClient/GetUserIdsYouRequestedToFollowParameters";
import {IGetUsersYouRequestedToFollowParameters} from "../../../Public/Parameters/AccountClient/GetUsersYouRequestedToFollowParameters";
import {IUpdateRelationshipParameters} from "../../../Public/Parameters/AccountClient/UpdateRelationshipParameters";
import {IGetRelationshipsWithParameters} from "../../../Public/Parameters/AccountClient/GetRelationshipsWithParameters";
import {IGetRelationshipBetweenParameters} from "../../../Public/Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IGetUserIdsWhoseRetweetsAreMutedParameters} from "../../../Public/Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {IGetMutedUserIdsParameters} from "../../../Public/Parameters/AccountClient/GetMutedUserIdsParameters";
import {IGetMutedUsersParameters} from "../../../Public/Parameters/AccountClient/GetMutedUsersParameters";
import {IMuteUserParameters} from "../../../Public/Parameters/AccountClient/MuteUserParameters";
import {IUnmuteUserParameters} from "../../../Public/Parameters/AccountClient/UnMuteUserParameters";
import {ITwitterClient, ITwitterClientToken} from "../../../Public/ITwitterClient";
import {
  IUsersClientRequiredParametersValidator,
  IUsersClientRequiredParametersValidatorToken, UsersClientRequiredParametersValidator
} from './UsersClientRequiredParametersValidator';
import {TwitterLimits} from 'src/app/core/Public/Settings/TwitterLimits';
import {TwitterArgumentLimitException} from "../../../Public/Exceptions/TwitterArgumentLimitException";
import {UserParameters} from "./parameters-types";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

export interface IUsersClientParametersValidator {
  validate(parameters: IGetAuthenticatedUserParameters): void;

  validate(parameters: IGetUserParameters): void;

  validate(parameters: IGetUsersParameters);

  validate(parameters: IGetFollowerIdsParameters): void;

  validate(parameters: IGetFollowersParameters): void;

  validate(parameters: IGetFriendIdsParameters): void;

  validate(parameters: IGetFriendsParameters): void;

  validate(parameters: IGetProfileImageParameters): void;

  validate(parameters: IBlockUserParameters): void;

  validate(parameters: IUnblockUserParameters): void;

  validate(parameters: IReportUserForSpamParameters): void;

  validate(parameters: IGetBlockedUserIdsParameters): void;

  validate(parameters: IGetBlockedUsersParameters): void;

  validate(parameters: IFollowUserParameters): void;

  validate(parameters: IUnfollowUserParameters): void;

  validate(parameters: IGetUserIdsRequestingFriendshipParameters): void;

  validate(parameters: IGetUsersRequestingFriendshipParameters): void;

  validate(parameters: IGetUserIdsYouRequestedToFollowParameters): void;

  validate(parameters: IGetUsersYouRequestedToFollowParameters): void;

  // RELATIONSHIPS
  validate(parameters: IUpdateRelationshipParameters): void;

  validate(parameters: IGetRelationshipsWithParameters): void;

  validate(parameters: IGetRelationshipBetweenParameters): void;


  //  MUTE
  validate(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters);

  validate(parameters: IGetMutedUserIdsParameters);

  validate(parameters: IGetMutedUsersParameters);

  validate(parameters: IMuteUserParameters);

  validate(parameters: IUnmuteUserParameters);
}

export const IUsersClientParametersValidatorToken = new InjectionToken<IUsersClientParametersValidator>('IUsersClientParametersValidator', {
  providedIn: 'root',
  factory: () => new UsersClientParametersValidator(Inject(TwitterClient), Inject(UsersClientRequiredParametersValidator)),
});

@Injectable()
export class UsersClientParametersValidator implements IUsersClientParametersValidator {
  private readonly _usersClientRequiredParametersValidator: IUsersClientRequiredParametersValidator;
  private readonly _client: ITwitterClient;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(IUsersClientRequiredParametersValidatorToken) usersClientRequiredParametersValidator: IUsersClientRequiredParametersValidator) {
    this._client = client;
    this._usersClientRequiredParametersValidator = usersClientRequiredParametersValidator;
  }

  private get Limits(): TwitterLimits {
    return this._client.config.limits;
  }

  public validate(parameters: UserParameters): void {
    this._usersClientRequiredParametersValidator.validate(parameters);

    if (this.isIGetUsersParameters(parameters)) {
      let maxSize = this.Limits.USERS_GET_USERS_MAX_SIZE;
      if (parameters.Users.length > maxSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.Users)}`, maxSize, nameof(this.Limits.USERS_GET_USERS_MAX_SIZE), "users");
      }
    } else if (this.isIGetFollowerIdsParameters(parameters)) {
      let maxPageSize = this.Limits.USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE), "page size");
      }
    } else if (this.isIGetFollowersParameters(parameters)) {
      this.validate(parameters as IGetFollowerIdsParameters);     // TODO: Beware!! Recursion!

      let maxUserPerPage = this.Limits.USERS_GET_USERS_MAX_SIZE;
      if (parameters.GetUsersPageSize > maxUserPerPage) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.GetUsersPageSize)}`, maxUserPerPage, nameof(this.Limits.USERS_GET_USERS_MAX_SIZE), "user ids");
      }
    } else if (this.isIGetFriendIdsParameters(parameters)) {
      let maxPageSize = this.Limits.USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE), "page size");
      }
    } else if (this.isIGetFriendsParameters(parameters)) {
      this.validate(parameters as IGetFriendIdsParameters);     // TODO: Beware!! Recursion!

      let maxUserPerPage = this.Limits.USERS_GET_USERS_MAX_SIZE;
      if (parameters.GetUsersPageSize > maxUserPerPage) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.GetUsersPageSize)}`, maxUserPerPage, nameof(this.Limits.USERS_GET_USERS_MAX_SIZE), "user ids");
      }
    } else if (this.isIGetBlockedUserIdsParameters(parameters)) {
      let maxPageSize = this.Limits.ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE), "page size");
      }
    } else if (this.isIGetBlockedUsersParameters(parameters)) {
      let maxPageSize = this.Limits.ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE), "page size");
      }
    } else if (this.isIGetUserIdsRequestingFriendshipParameters(parameters)) {
      let maxPageSize = this.Limits.ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE), "page size");
      }
    } else if (this.isIGetUsersRequestingFriendshipParameters(parameters)) {
      this.validate(parameters as IGetUserIdsRequestingFriendshipParameters);     // TODO: Beware!! Recursion!

      let maxSize = this.Limits.USERS_GET_USERS_MAX_SIZE;
      if (parameters.getUsersPageSize > maxSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.getUsersPageSize)}`, maxSize, nameof(this.Limits.USERS_GET_USERS_MAX_SIZE), "users");
      }
    } else if (this.isIGetUserIdsYouRequestedToFollowParameters(parameters)) {
      let maxPageSize = this.Limits.ACCOUNT_GET_REQUESTED_USER_IDS_TO_FOLLOW_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.ACCOUNT_GET_REQUESTED_USER_IDS_TO_FOLLOW_MAX_PAGE_SIZE), "page size");
      }
    } else if (this.isIGetUsersYouRequestedToFollowParameters(parameters)) {
      this.validate(parameters as IGetUserIdsYouRequestedToFollowParameters);     // TODO: Beware!! Recursion!

      let maxSize = this.Limits.USERS_GET_USERS_MAX_SIZE;
      if (parameters.getUsersPageSize > maxSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.getUsersPageSize)}`, maxSize, nameof(this.Limits.USERS_GET_USERS_MAX_SIZE), "users");
      }
    } else if (this.isIGetRelationshipsWithParameters(parameters)) {
      let maxUsers = this.Limits.ACCOUNT_GET_RELATIONSHIPS_WITH_MAX_SIZE;
      if (parameters.users.length > maxUsers) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.users)}`, maxUsers, nameof(this.Limits.ACCOUNT_GET_RELATIONSHIPS_WITH_MAX_SIZE), "users");
      }
    } else if (this.isIGetMutedUserIdsParameters(parameters)) {
      let maxPageSize = this.Limits.ACCOUNT_GET_MUTED_USER_IDS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.ACCOUNT_GET_MUTED_USER_IDS_MAX_PAGE_SIZE), "users");
      }
    } else if (this.isIGetMutedUsersParameters(parameters)) {
      let maxPageSize = this.Limits.ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE), "users");
      }
    }
  }

  private isIGetUsersParameters(parameters: UserParameters): parameters is IGetUsersParameters {
    return (parameters as IGetUsersParameters).Users !== undefined;
  }

  private isIGetFollowerIdsParameters(parameters: UserParameters): parameters is IGetFollowerIdsParameters {
    return (parameters as IGetFollowerIdsParameters).User !== undefined;
  }

  private isIGetFollowersParameters(parameters: UserParameters): parameters is IGetFollowersParameters {
    return (parameters as IGetFollowersParameters).User !== undefined;
  }

  private isIGetFriendIdsParameters(parameters: UserParameters): parameters is IGetFriendIdsParameters {
    return (parameters as IGetFriendIdsParameters).User !== undefined;
  }

  private isIGetFriendsParameters(parameters: UserParameters): parameters is IGetFriendsParameters {
    return (parameters as IGetFriendsParameters).User !== undefined;
  }

  private isIGetBlockedUserIdsParameters(parameters: UserParameters): parameters is IGetBlockedUserIdsParameters {
    return (parameters as IGetBlockedUserIdsParameters).cursor !== undefined;
  }

  private isIGetBlockedUsersParameters(parameters: UserParameters): parameters is IGetBlockedUsersParameters {
    return (parameters as IGetBlockedUsersParameters).cursor !== undefined;
  }

  private isIGetUserIdsRequestingFriendshipParameters(parameters: UserParameters): parameters is IGetUserIdsRequestingFriendshipParameters {
    return (parameters as IGetUserIdsRequestingFriendshipParameters).cursor !== undefined;
  }

  private isIGetUsersRequestingFriendshipParameters(parameters: UserParameters): parameters is IGetUsersRequestingFriendshipParameters {
    return (parameters as IGetUsersRequestingFriendshipParameters).cursor !== undefined;
  }

  private isIGetUserIdsYouRequestedToFollowParameters(parameters: UserParameters): parameters is IGetUserIdsYouRequestedToFollowParameters {
    return (parameters as IGetUserIdsYouRequestedToFollowParameters).cursor !== undefined;
  }

  private isIGetUsersYouRequestedToFollowParameters(parameters: UserParameters): parameters is IGetUsersYouRequestedToFollowParameters {
    return (parameters as IGetUsersYouRequestedToFollowParameters).cursor !== undefined;
  }

  private isIGetRelationshipsWithParameters(parameters: UserParameters): parameters is IGetRelationshipsWithParameters {
    return (parameters as IGetRelationshipsWithParameters).users !== undefined;
  }

  private isIGetMutedUserIdsParameters(parameters: UserParameters): parameters is IGetMutedUserIdsParameters {
    return (parameters as IGetMutedUserIdsParameters).cursor !== undefined;
  }

  private isIGetMutedUsersParameters(parameters: UserParameters): parameters is IGetMutedUsersParameters {
    return (parameters as IGetMutedUsersParameters).cursor !== undefined;
  }
}
