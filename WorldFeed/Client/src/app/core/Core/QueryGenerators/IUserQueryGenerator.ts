import {IGetAuthenticatedUserParameters} from "../../Public/Parameters/AccountClient/GetAuthenticatedUserParameters";
import {IGetUserParameters} from "../../Public/Parameters/UsersClient/GetUserParameters";
import {IGetUsersParameters} from "../../Public/Parameters/UsersClient/GetUsersParameters";
import {IGetFriendIdsParameters} from "../../Public/Parameters/UsersClient/GetFriendIdsParameters";
import {IGetFollowerIdsParameters} from "../../Public/Parameters/UsersClient/GetFollowerIdsParameters";
import {IGetRelationshipBetweenParameters} from "../../Public/Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IGetProfileImageParameters} from "../../Public/Parameters/UsersClient/GetProfileImageParameters";
import {IBlockUserParameters} from "../../Public/Parameters/AccountClient/BlockUserParameters";
import {IUnblockUserParameters} from "../../Public/Parameters/AccountClient/UnblockUserParameters";
import {IReportUserForSpamParameters} from "../../Public/Parameters/AccountClient/ReportUserForSpamParameters";
import {IGetBlockedUserIdsParameters} from "../../Public/Parameters/AccountClient/GetBlockedUserIdsParameter";
import {IGetBlockedUsersParameters} from "../../Public/Parameters/AccountClient/GetBlockedUsersParameter";
import {IFollowUserParameters} from "../../Public/Parameters/AccountClient/FollowUserParameters";
import {IUnfollowUserParameters} from "../../Public/Parameters/AccountClient/UnfollowUserParameters";
import {IUpdateRelationshipParameters} from "../../Public/Parameters/AccountClient/UpdateRelationshipParameters";
import {IGetUserIdsRequestingFriendshipParameters} from "../../Public/Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {IGetUserIdsYouRequestedToFollowParameters} from "../../Public/Parameters/AccountClient/GetUserIdsYouRequestedToFollowParameters";
import {IGetRelationshipsWithParameters} from "../../Public/Parameters/AccountClient/GetRelationshipsWithParameters";
import {IGetUserIdsWhoseRetweetsAreMutedParameters} from "../../Public/Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {IGetMutedUserIdsParameters} from "../../Public/Parameters/AccountClient/GetMutedUserIdsParameters";
import {IGetMutedUsersParameters} from "../../Public/Parameters/AccountClient/GetMutedUsersParameters";
import {IMuteUserParameters} from "../../Public/Parameters/AccountClient/MuteUserParameters";
import {IUnmuteUserParameters} from "../../Public/Parameters/AccountClient/UnMuteUserParameters";

export interface IUserQueryGenerator {
  getAuthenticatedUserQuery(parameters: IGetAuthenticatedUserParameters): string;

  getUserQuery(parameters: IGetUserParameters): string;

  getUsersQuery(parameters: IGetUsersParameters): string;

  getFriendIdsQuery(parameters: IGetFriendIdsParameters): string;

  getFollowerIdsQuery(parameters: IGetFollowerIdsParameters): string;

  getRelationshipBetweenQuery(parameters: IGetRelationshipBetweenParameters): string;

  downloadProfileImageURL(parameters: IGetProfileImageParameters): string;

  // BLOCK
  getBlockUserQuery(parameters: IBlockUserParameters): string;

  getUnblockUserQuery(parameters: IUnblockUserParameters): string;

  getReportUserForSpamQuery(parameters: IReportUserForSpamParameters): string;

  getBlockedUserIdsQuery(parameters: IGetBlockedUserIdsParameters): string;

  getBlockedUsersQuery(parameters: IGetBlockedUsersParameters): string;

  // FOLLOWERS
  getFollowUserQuery(parameters: IFollowUserParameters): string;

  getUnfollowUserQuery(parameters: IUnfollowUserParameters): string;

  // RELATIONSHIPS
  getUpdateRelationshipQuery(parameters: IUpdateRelationshipParameters): string;

  // ONGOING REQUESTS
  getUserIdsRequestingFriendshipQuery(parameters: IGetUserIdsRequestingFriendshipParameters): string;

  getUserIdsYouRequestedToFollowQuery(parameters: IGetUserIdsYouRequestedToFollowParameters): string;

  // FRIENDSHIPS
  getRelationshipsWithQuery(parameters: IGetRelationshipsWithParameters): string;

  // MUTE
  getUserIdsWhoseRetweetsAreMutedQuery(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters): string;

  getMutedUserIdsQuery(parameters: IGetMutedUserIdsParameters): string;

  getMutedUsersQuery(parameters: IGetMutedUsersParameters): string;

  getMuteUserQuery(parameters: IMuteUserParameters): string;

  getUnmuteUserQuery(parameters: IUnmuteUserParameters): string;
}
