import {ITwitterResult} from "../Web/TwitterResult";
import {ITwitterRequest} from '../../Public/Models/Interfaces/ITwitterRequest';
import {Stream} from "stream";
import {IGetAuthenticatedUserParameters} from "../../Public/Parameters/AccountClient/GetAuthenticatedUserParameters";
import {IUserDTO} from "../../Public/Models/Interfaces/DTO/IUserDTO";
import {IGetUserParameters} from "../../Public/Parameters/UsersClient/GetUserParameters";
import {IGetUsersParameters} from "../../Public/Parameters/UsersClient/GetUsersParameters";
import {IGetUserIdsRequestingFriendshipParameters} from "../../Public/Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {IGetFriendIdsParameters} from "../../Public/Parameters/UsersClient/GetFriendIdsParameters";
import {IIdsCursorQueryResultDTO} from "../../Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {ITwitterPageIterator} from "../Iterators/TwitterPageIterator";
import {IGetFollowerIdsParameters} from "../../Public/Parameters/UsersClient/GetFollowerIdsParameters";
import {IFollowUserParameters} from "../../Public/Parameters/AccountClient/FollowUserParameters";
import {IUnfollowUserParameters} from "../../Public/Parameters/AccountClient/UnfollowUserParameters";
import {IBlockUserParameters} from "../../Public/Parameters/AccountClient/BlockUserParameters";
import {IUnblockUserParameters} from "../../Public/Parameters/AccountClient/UnblockUserParameters";
import {IReportUserForSpamParameters} from "../../Public/Parameters/AccountClient/ReportUserForSpamParameters";
import {IGetBlockedUserIdsParameters} from "../../Public/Parameters/AccountClient/GetBlockedUserIdsParameter";
import {IGetBlockedUsersParameters} from "../../Public/Parameters/AccountClient/GetBlockedUsersParameter";
import {IGetRelationshipsWithParameters} from "../../Public/Parameters/AccountClient/GetRelationshipsWithParameters";
import {IGetUserIdsYouRequestedToFollowParameters} from "../../Public/Parameters/AccountClient/GetUserIdsYouRequestedToFollowParameters";
import {IRelationshipStateDTO} from "../../Public/Models/Interfaces/DTO/IRelationshipStateDTO";
import {IGetRelationshipBetweenParameters} from "../../Public/Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IUpdateRelationshipParameters} from "../../Public/Parameters/AccountClient/UpdateRelationshipParameters";
import {IRelationshipDetailsDTO} from "../../Public/Models/Interfaces/DTO/IRelationshipDetailsDTO";
import {IUserCursorQueryResultDTO} from "../../Public/Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {IGetUserIdsWhoseRetweetsAreMutedParameters} from "../../Public/Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {IGetMutedUserIdsParameters} from "../../Public/Parameters/AccountClient/GetMutedUserIdsParameters";
import {IGetMutedUsersParameters} from "../../Public/Parameters/AccountClient/GetMutedUsersParameters";
import {IMuteUserParameters} from "../../Public/Parameters/AccountClient/MuteUserParameters";
import {IUnmuteUserParameters} from "../../Public/Parameters/AccountClient/UnMuteUserParameters";
import {IGetProfileImageParameters} from "../../Public/Parameters/UsersClient/GetProfileImageParameters";
import {InjectionToken} from "@angular/core";
import {UserController} from "../../../controllers/User/UserController";

export interface IUserController {
  getAuthenticatedUserAsync(parameters: IGetAuthenticatedUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  // USERS
  getUserAsync(parameters: IGetUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  getUsersAsync(parameters: IGetUsersParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO[]>>;

  getUserIdsRequestingFriendshipIterator(parameters: IGetUserIdsRequestingFriendshipParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  // FRIENDS
  getFriendIdsIterator(parameters: IGetFriendIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  getFollowerIdsIterator(parameters: IGetFollowerIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  // FOLLOWERS
  followUserAsync(parameters: IFollowUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  unfollowUserAsync(parameters: IUnfollowUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  // BLOCK
  blockUserAsync(parameters: IBlockUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  unblockUserAsync(parameters: IUnblockUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  reportUserForSpamAsync(parameters: IReportUserForSpamParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  getBlockedUserIdsIterator(parameters: IGetBlockedUserIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  getBlockedUsersIterator(parameters: IGetBlockedUsersParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>;

  // FRIENDSHIPS
  getRelationshipsWithAsync(parameters: IGetRelationshipsWithParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipStateDTO[]>>;

  getUserIdsYouRequestedToFollowIterator(parameters: IGetUserIdsYouRequestedToFollowParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>

  // RELATIONSHIPS
  getRelationshipBetweenAsync(parameters: IGetRelationshipBetweenParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipDetailsDTO>>;

  updateRelationshipAsync(parameters: IUpdateRelationshipParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipDetailsDTO>>;

  // MUTE
  getUserIdsWhoseRetweetsAreMutedAsync(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters, request: ITwitterRequest): Promise<ITwitterResult<number[]>>;

  getMutedUserIdsIterator(parameters: IGetMutedUserIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  getMutedUsersIterator(parameters: IGetMutedUsersParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>;

  muteUserAsync(parameters: IMuteUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  unmuteUserAsync(parameters: IUnmuteUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  getProfileImageStreamAsync(parameters: IGetProfileImageParameters, request: ITwitterRequest): Promise<Stream>;
}

export const IUserControllerToken = new InjectionToken<IUserController>('IUserController', {
  providedIn: 'root',
  factory: () => new UserController(),
});

