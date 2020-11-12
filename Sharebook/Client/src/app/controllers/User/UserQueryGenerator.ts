import {Inject, Injectable} from "@angular/core";

import {IUserQueryGenerator} from "../../core/Core/QueryGenerators/IUserQueryGenerator";
import {
  IUserQueryParameterGenerator,
  IUserQueryParameterGeneratorToken
} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {Resources} from "../../properties/resources";
import {IQueryParameterGenerator, IQueryParameterGeneratorToken} from "../Shared/QueryParameterGenerator";
import {IGetAuthenticatedUserParameters} from "../../core/Public/Parameters/AccountClient/GetAuthenticatedUserParameters";
import {IGetUserParameters} from "../../core/Public/Parameters/UsersClient/GetUserParameters";
import {IGetUsersParameters} from "../../core/Public/Parameters/UsersClient/GetUsersParameters";
import {IGetFriendIdsParameters} from "../../core/Public/Parameters/UsersClient/GetFriendIdsParameters";
import {IGetFollowerIdsParameters} from "../../core/Public/Parameters/UsersClient/GetFollowerIdsParameters";
import {IGetRelationshipBetweenParameters} from "../../core/Public/Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IGetProfileImageParameters} from "../../core/Public/Parameters/UsersClient/GetProfileImageParameters";
import {IBlockUserParameters} from "../../core/Public/Parameters/AccountClient/BlockUserParameters";
import {IUnblockUserParameters} from "../../core/Public/Parameters/AccountClient/UnblockUserParameters";
import {IReportUserForSpamParameters} from "../../core/Public/Parameters/AccountClient/ReportUserForSpamParameters";
import {IGetBlockedUserIdsParameters} from "../../core/Public/Parameters/AccountClient/GetBlockedUserIdsParameter";
import {IGetBlockedUsersParameters} from "../../core/Public/Parameters/AccountClient/GetBlockedUsersParameter";
import {IFollowUserParameters} from "../../core/Public/Parameters/AccountClient/FollowUserParameters";
import {IUpdateRelationshipParameters} from "../../core/Public/Parameters/AccountClient/UpdateRelationshipParameters";
import {IUnfollowUserParameters} from "../../core/Public/Parameters/AccountClient/UnfollowUserParameters";
import {IGetUserIdsRequestingFriendshipParameters} from "../../core/Public/Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {IGetUserIdsYouRequestedToFollowParameters} from "../../core/Public/Parameters/AccountClient/GetUserIdsYouRequestedToFollowParameters";
import {IGetRelationshipsWithParameters} from "../../core/Public/Parameters/AccountClient/GetRelationshipsWithParameters";
import {IGetUserIdsWhoseRetweetsAreMutedParameters} from "../../core/Public/Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {IGetMutedUserIdsParameters} from "../../core/Public/Parameters/AccountClient/GetMutedUserIdsParameters";
import {IGetMutedUsersParameters} from "../../core/Public/Parameters/AccountClient/GetMutedUsersParameters";
import {IMuteUserParameters} from "../../core/Public/Parameters/AccountClient/MuteUserParameters";
import {IUnmuteUserParameters} from "../../core/Public/Parameters/AccountClient/UnMuteUserParameters";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";

@Injectable({
  providedIn: 'root',
})
export class UserQueryGenerator implements IUserQueryGenerator {
  private readonly _userQueryParameterGenerator: IUserQueryParameterGenerator;
  private readonly _queryParameterGenerator: IQueryParameterGenerator;

  constructor(@Inject(IUserQueryParameterGeneratorToken) userQueryParameterGenerator: IUserQueryParameterGenerator,
              @Inject(IQueryParameterGeneratorToken) queryParameterGenerator: IQueryParameterGenerator) {
    this._userQueryParameterGenerator = userQueryParameterGenerator;
    this._queryParameterGenerator = queryParameterGenerator;
  }

  public getAuthenticatedUserQuery(parameters: IGetAuthenticatedUserParameters): string {
    let query = new StringBuilder(Resources.User_GetCurrentUser);

    StringBuilderExtensions.addParameterToQuery(query, "skip_status", parameters.skipStatus);
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "include_email", parameters.includeEmail);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUserQuery(parameters: IGetUserParameters): string {
    let query = new StringBuilder(Resources.User_GetUser);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    StringBuilderExtensions.addParameterToQuery(query, "skip_status", parameters.skipStatus);
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUsersQuery(parameters: IGetUsersParameters): string {
    let userIdsParameter = this._userQueryParameterGenerator.generateListOfUserIdentifiersParameter(parameters.Users);
    let query = new StringBuilder(Resources.User_GetUsers);

    StringBuilderExtensions.addFormattedParameterToQuery(query, userIdsParameter);
    StringBuilderExtensions.addParameterToQuery(query, "skip_status", parameters.skipStatus);
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // FOLLOWERS
  public getFriendIdsQuery(parameters: IGetFriendIdsParameters): string {
    let query = new StringBuilder(Resources.User_GetFriends);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    this._queryParameterGenerator.appendCursorParameters(query, parameters);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getFollowerIdsQuery(parameters: IGetFollowerIdsParameters): string {
    let query = new StringBuilder(Resources.User_GetFollowers);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    this._queryParameterGenerator.appendCursorParameters(query, parameters);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getRelationshipBetweenQuery(parameters: IGetRelationshipBetweenParameters): string {
    let sourceParameter = this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.SourceUser, "source_id", "source_screen_name");
    let targetParameter = this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.TargetUser, "target_id", "target_screen_name");

    let query = new StringBuilder(Resources.Friendship_GetRelationship);

    StringBuilderExtensions.addFormattedParameterToQuery(query, sourceParameter);
    StringBuilderExtensions.addFormattedParameterToQuery(query, targetParameter);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // Download Profile Image
  public downloadProfileImageURL(parameters: IGetProfileImageParameters): string {
    let query = new StringBuilder(parameters.imageUrl.replace("_normal", `_${parameters.imageSize.toString().toLocaleLowerCase()}`));
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  // BLOCK
  public getBlockUserQuery(parameters: IBlockUserParameters): string {
    let query = new StringBuilder(Resources.User_Block_Create);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUnblockUserQuery(parameters: IUnblockUserParameters): string {
    let query = new StringBuilder(Resources.User_Block_Destroy);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getReportUserForSpamQuery(parameters: IReportUserForSpamParameters): string {
    let query = new StringBuilder(Resources.User_Report_Spam);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    StringBuilderExtensions.addParameterToQuery(query, "perform_block", parameters.performBlock);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getBlockedUserIdsQuery(parameters: IGetBlockedUserIdsParameters): string {
    let query = new StringBuilder(Resources.User_Block_List_Ids);

    this._queryParameterGenerator.appendCursorParameters(query, parameters);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getBlockedUsersQuery(parameters: IGetBlockedUsersParameters): string {
    let query = new StringBuilder(Resources.User_Block_List);

    this._queryParameterGenerator.appendCursorParameters(query, parameters);
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "skip_status", parameters.skipStatus);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // FOLLOWERS
  public getFollowUserQuery(parameters: IFollowUserParameters): string {
    let query = new StringBuilder(Resources.Friendship_Create);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    StringBuilderExtensions.addParameterToQuery(query, "follow", parameters.enableNotifications);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUpdateRelationshipQuery(parameters: IUpdateRelationshipParameters): string {
    let query = new StringBuilder(Resources.Friendship_Update);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    StringBuilderExtensions.addParameterToQuery(query, "device", parameters.enableDeviceNotifications);
    StringBuilderExtensions.addParameterToQuery(query, "retweets", parameters.enableRetweets);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUnfollowUserQuery(parameters: IUnfollowUserParameters): string {
    let query = new StringBuilder(Resources.Friendship_Destroy);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUserIdsRequestingFriendshipQuery(parameters: IGetUserIdsRequestingFriendshipParameters): string {
    let query = new StringBuilder(Resources.Friendship_GetIncomingIds);

    this._queryParameterGenerator.appendCursorParameters(query, parameters);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUserIdsYouRequestedToFollowQuery(parameters: IGetUserIdsYouRequestedToFollowParameters): string {
    let query = new StringBuilder(Resources.Friendship_GetOutgoingIds);

    this._queryParameterGenerator.appendCursorParameters(query, parameters);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getRelationshipsWithQuery(parameters: IGetRelationshipsWithParameters): string {
    let query = new StringBuilder(Resources.Friendship_GetRelationships);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateListOfUserIdentifiersParameter(parameters.users));
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // MUTE
  public getUserIdsWhoseRetweetsAreMutedQuery(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters): string {
    let query = new StringBuilder(Resources.Friendship_FriendIdsWithNoRetweets);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getMutedUserIdsQuery(parameters: IGetMutedUserIdsParameters): string {
    let query = new StringBuilder(Resources.Account_Mute_GetUserIds);

    this._queryParameterGenerator.appendCursorParameters(query, parameters);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getMutedUsersQuery(parameters: IGetMutedUsersParameters): string {
    let query = new StringBuilder(Resources.Account_Mute_GetUsers);

    this._queryParameterGenerator.appendCursorParameters(query, parameters);
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "skip_status", parameters.skipStatus);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getMuteUserQuery(parameters: IMuteUserParameters): string {
    let query = new StringBuilder(Resources.Account_Mute_Create);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUnmuteUserQuery(parameters: IUnmuteUserParameters): string {
    let query = new StringBuilder(Resources.Account_Mute_Destroy);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }
}
