import {Inject, Injectable, InjectionToken} from "@angular/core";

import {IUsersClientParametersValidator} from "./UsersClientParametersValidator";
import {IUserQueryValidator, IUserQueryValidatorToken, UserQueryValidator} from "./UserQueryValidator";
import {IGetUserParameters} from "../../../Public/Parameters/UsersClient/GetUserParameters";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';
import {IGetUsersParameters} from "../../../Public/Parameters/UsersClient/GetUsersParameters";
import {IGetFollowerIdsParameters} from "../../../Public/Parameters/UsersClient/GetFollowerIdsParameters";
import {IGetFollowersParameters} from "../../../Public/Parameters/UsersClient/GetFollowersParameters";
import {IGetFriendIdsParameters} from "../../../Public/Parameters/UsersClient/GetFriendIdsParameters";
import {IGetFriendsParameters} from "../../../Public/Parameters/UsersClient/GetFriendsParameters";
import {IGetRelationshipBetweenParameters} from "../../../Public/Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IGetProfileImageParameters} from "../../../Public/Parameters/UsersClient/GetProfileImageParameters";
import {IGetAuthenticatedUserParameters} from "../../../Public/Parameters/AccountClient/GetAuthenticatedUserParameters";
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
import {
  GetUserIdsWhoseRetweetsAreMutedParameters,
  IGetUserIdsWhoseRetweetsAreMutedParameters
} from "../../../Public/Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {IGetMutedUserIdsParameters} from "../../../Public/Parameters/AccountClient/GetMutedUserIdsParameters";
import {IGetMutedUsersParameters} from "../../../Public/Parameters/AccountClient/GetMutedUsersParameters";
import {IUnmuteUserParameters} from "../../../Public/Parameters/AccountClient/UnMuteUserParameters";
import {IMuteUserParameters} from "../../../Public/Parameters/AccountClient/MuteUserParameters";
import Uri from "../../../../c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri";
import {UriKind} from "../../../Public/Models/Enum/uri-kind";
import ArgumentException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";

export interface IUsersClientRequiredParametersValidator extends IUsersClientParametersValidator {
}

export const IUsersClientRequiredParametersValidatorToken = new InjectionToken<IUsersClientRequiredParametersValidator>('IUsersClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new UsersClientRequiredParametersValidator(Inject(UserQueryValidator)),
});

@Injectable()
export class UsersClientRequiredParametersValidator implements IUsersClientRequiredParametersValidator {
  private readonly _userQueryValidator: IUserQueryValidator;

  constructor(@Inject(IUserQueryValidatorToken) userQueryValidator: IUserQueryValidator) {
    this._userQueryValidator = userQueryValidator;
  }

  public validate(parameters: IGetUserParameters
    | IGetUsersParameters
    | IGetFollowerIdsParameters
    | IGetFollowersParameters
    | IGetFriendIdsParameters
    | IGetFriendsParameters
    | IGetRelationshipBetweenParameters
    | IGetProfileImageParameters
    | IGetAuthenticatedUserParameters
    | IBlockUserParameters
    | IUnblockUserParameters
    | IReportUserForSpamParameters
    | IGetBlockedUserIdsParameters
    | IGetBlockedUsersParameters
    | IFollowUserParameters
    | IUnfollowUserParameters
    | IGetUserIdsRequestingFriendshipParameters
    | IGetUsersRequestingFriendshipParameters
    | IGetUserIdsYouRequestedToFollowParameters
    | IGetUsersYouRequestedToFollowParameters
    | IUpdateRelationshipParameters
    | IGetRelationshipsWithParameters
    | IGetUserIdsWhoseRetweetsAreMutedParameters
    | IGetMutedUserIdsParameters
    | IGetMutedUsersParameters
    | IMuteUserParameters
    | IUnmuteUserParameters): void {

    if (parameters == null) {
      throw new ArgumentNullException(nameof(parameters));
    }

    if (UsersClientRequiredParametersValidator.isIGetUserParameters(parameters)) {
      this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.User);
    } else if (UsersClientRequiredParametersValidator.isIGetUsersParameters(parameters)) {
      if (parameters.Users == null) {
        throw new ArgumentNullException(`${nameof(parameters.Users)}`);
      } else if (UsersClientRequiredParametersValidator.isIGetFollowerIdsParameters(parameters)
        || UsersClientRequiredParametersValidator.isIGetFriendIdsParameters(parameters)
        || UsersClientRequiredParametersValidator.isIBlockUserParameters(parameters)
        || UsersClientRequiredParametersValidator.isIUnblockUserParameters(parameters)
        || UsersClientRequiredParametersValidator.isIReportUserForSpamParameters(parameters)
        || UsersClientRequiredParametersValidator.isIFollowUserParameters(parameters)
        || UsersClientRequiredParametersValidator.isIUnfollowUserParameters(parameters)
        || UsersClientRequiredParametersValidator.isIUpdateRelationshipParameters(parameters)
        || UsersClientRequiredParametersValidator.isIMuteUserParameters(parameters)
        || UsersClientRequiredParametersValidator.isIUnmuteUserParameters(parameters)) {
        this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.user, `${nameof(parameters.user)}`);
      } else if (UsersClientRequiredParametersValidator.isIGetFollowersParameters(parameters)) {
        this.validate(parameters as IGetFollowerIdsParameters);           // TODO: RECURSION!!!
      } else if (UsersClientRequiredParametersValidator.isIGetFriendsParameters(parameters)) {
        this.validate(parameters as IGetFriendIdsParameters);             // TODO: RECURSION!!!
      } else if (UsersClientRequiredParametersValidator.isIGetRelationshipBetweenParameters(parameters)) {
        this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.SourceUser, `${nameof(parameters.SourceUser)}`);
        this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.TargetUser, `${nameof(parameters.TargetUser)}`);
      } else if (UsersClientRequiredParametersValidator.isIGetProfileImageParameters(parameters)) {
        if (parameters.imageUrl == null) {
          throw new ArgumentNullException(`${nameof(parameters.imageUrl)}`);
        }

        if (!Uri.isWellFormedUriString(parameters.imageUrl, UriKind.Absolute)) {
          throw new ArgumentException("ImageUrl has to be valid absolute url", `${nameof(parameters.imageUrl)}`);
        }
      } else if (UsersClientRequiredParametersValidator.isIGetAuthenticatedUserParameters(parameters)
        || UsersClientRequiredParametersValidator.isIGetBlockedUserIdsParameters(parameters)
        || UsersClientRequiredParametersValidator.isIGetBlockedUsersParameters(parameters)
        || UsersClientRequiredParametersValidator.isIGetUserIdsRequestingFriendshipParameters(parameters)
        || UsersClientRequiredParametersValidator.isIGetUsersRequestingFriendshipParameters(parameters)
        || UsersClientRequiredParametersValidator.isIGetUserIdsYouRequestedToFollowParameters(parameters)
        || UsersClientRequiredParametersValidator.isIGetUsersYouRequestedToFollowParameters(parameters)
        || parameters instanceof GetUserIdsWhoseRetweetsAreMutedParameters // might bug with IGetRelationshipsWithParameters
        || UsersClientRequiredParametersValidator.isIGetMutedUserIdsParameters(parameters)
        || UsersClientRequiredParametersValidator.isIGetMutedUsersParameters(parameters)) {
        if (parameters == null) {
          throw new ArgumentNullException(nameof(parameters));
        }
      } else if (UsersClientRequiredParametersValidator.isIGetRelationshipsWithParameters(parameters)) {
        if (parameters.Users == null) {
          throw new ArgumentNullException(`${nameof(parameters.Users)}`);
        }

        if (parameters.Users.every(user => user.id <= 0 && !user.idStr && !user.screenName)) {
          throw new ArgumentException("At least 1 valid user identifier is required.", `${nameof(parameters.Users)}`);
        }
      }
    }
  }

  private static isIGetUserParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetUserParameters {
    return (parameters as IGetUserParameters).User !== undefined;
  }

  private static isIGetUsersParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetUsersParameters {
    return (parameters as IGetUsersParameters).skipStatus !== undefined;
  }

  private static isIGetFollowerIdsParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetFollowerIdsParameters {
    return (parameters as IGetFollowerIdsParameters).User !== undefined;
  }

  private static isIGetFollowersParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetFollowersParameters {
    return (parameters as IGetFollowersParameters).User !== undefined;
  }

  private static isIGetFriendIdsParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetFriendIdsParameters {
    return (parameters as IGetFriendIdsParameters).User !== undefined;
  }

  private static isIGetFriendsParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetFriendsParameters {
    return (parameters as IGetFriendsParameters).User !== undefined;
  }

  private static isIGetRelationshipBetweenParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetRelationshipBetweenParameters {
    return (parameters as IGetRelationshipBetweenParameters).SourceUser !== undefined;
  }

  private static isIGetProfileImageParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetProfileImageParameters {
    return (parameters as IGetProfileImageParameters).imageUrl !== undefined;
  }

  private static isIGetAuthenticatedUserParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetAuthenticatedUserParameters {
    return (parameters as IGetAuthenticatedUserParameters).includeEmail !== undefined;
  }

  private static isIBlockUserParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IBlockUserParameters {
    return (parameters as IBlockUserParameters).user !== undefined;
  }

  private static isIUnblockUserParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IUnblockUserParameters {
    return (parameters as IUnblockUserParameters).user !== undefined;
  }

  private static isIReportUserForSpamParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IReportUserForSpamParameters {
    return (parameters as IReportUserForSpamParameters).performBlock !== undefined;
  }

  private static isIGetBlockedUserIdsParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetBlockedUserIdsParameters {
    return (parameters as IGetBlockedUserIdsParameters).cursor !== undefined;
  }

  private static isIGetBlockedUsersParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetBlockedUsersParameters {
    return (parameters as IGetBlockedUsersParameters).cursor !== undefined;
  }


  private static isIFollowUserParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IFollowUserParameters {
    return (parameters as IFollowUserParameters).enableNotifications !== undefined;
  }

  private static isIUnfollowUserParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IUnfollowUserParameters {
    return (parameters as IUnfollowUserParameters).user !== undefined;
  }

  private static isIGetUserIdsRequestingFriendshipParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetUserIdsRequestingFriendshipParameters {
    return (parameters as IGetUserIdsRequestingFriendshipParameters).formattedCustomQueryParameters !== undefined;
  }

  private static isIGetUsersRequestingFriendshipParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetUsersRequestingFriendshipParameters {
    return (parameters as IGetUsersRequestingFriendshipParameters).getUsersPageSize !== undefined;
  }

  private static isIGetUserIdsYouRequestedToFollowParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetUserIdsYouRequestedToFollowParameters {
    return (parameters as IGetUserIdsYouRequestedToFollowParameters).cursor !== undefined;
  }

  private static isIGetUsersYouRequestedToFollowParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetUsersYouRequestedToFollowParameters {
    return (parameters as IGetUsersYouRequestedToFollowParameters).getUsersPageSize !== undefined;
  }

  private static isIUpdateRelationshipParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IUpdateRelationshipParameters {
    return (parameters as IUpdateRelationshipParameters).enableRetweets !== undefined;
  }

  private static isIGetRelationshipsWithParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetRelationshipsWithParameters {
    return (parameters as IGetRelationshipsWithParameters).users !== undefined;
  }

  private static isIGetUserIdsWhoseRetweetsAreMutedParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetUserIdsWhoseRetweetsAreMutedParameters {
    return (parameters as IGetUserIdsWhoseRetweetsAreMutedParameters).formattedCustomQueryParameters !== undefined;
  }

  private static isIGetMutedUserIdsParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetMutedUserIdsParameters {
    return (parameters as IGetMutedUserIdsParameters).formattedCustomQueryParameters !== undefined;
  }

  private static isIGetMutedUsersParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IGetMutedUsersParameters {
    return (parameters as IGetMutedUsersParameters).formattedCustomQueryParameters !== undefined;
  }

  private static isIMuteUserParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IMuteUserParameters {
    return (parameters as IMuteUserParameters).user !== undefined;
  }

  private static isIUnmuteUserParameters(parameters: IGetUserParameters | IGetUsersParameters | IGetFollowerIdsParameters | IGetFollowersParameters | IGetFriendIdsParameters | IGetFriendsParameters | IGetRelationshipBetweenParameters | IGetProfileImageParameters | IGetAuthenticatedUserParameters | IBlockUserParameters | IUnblockUserParameters | IReportUserForSpamParameters | IGetBlockedUserIdsParameters | IGetBlockedUsersParameters | IFollowUserParameters | IUnfollowUserParameters | IGetUserIdsRequestingFriendshipParameters | IGetUsersRequestingFriendshipParameters | IGetUserIdsYouRequestedToFollowParameters | IGetUsersYouRequestedToFollowParameters | IUpdateRelationshipParameters | IGetRelationshipsWithParameters | IGetUserIdsWhoseRetweetsAreMutedParameters | IGetMutedUserIdsParameters | IGetMutedUsersParameters | IMuteUserParameters | IUnmuteUserParameters): parameters is IUnmuteUserParameters {
    return (parameters as IUnmuteUserParameters).user !== undefined;
  }
}
