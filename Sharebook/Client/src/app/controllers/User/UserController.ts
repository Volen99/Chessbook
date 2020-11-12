import {IUserController} from "../../core/Core/Controllers/IUserController";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {TwitterRequest} from "../../core/Public/TwitterRequest";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {IUserQueryExecutor, IUserQueryExecutorToken} from "./UserQueryExecutor";
import {IGetAuthenticatedUserParameters} from "../../core/Public/Parameters/AccountClient/GetAuthenticatedUserParameters";
import {IGetUsersParameters} from "../../core/Public/Parameters/UsersClient/GetUsersParameters";
import {IGetUserParameters} from "../../core/Public/Parameters/UsersClient/GetUserParameters";
import {GetFriendIdsParameters, IGetFriendIdsParameters} from "../../core/Public/Parameters/UsersClient/GetFriendIdsParameters";
import {IIdsCursorQueryResultDTO} from "../../core/Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {ITwitterPageIterator, TwitterPageIterator} from "../../core/Core/Iterators/TwitterPageIterator";
import {IUserDTO} from "../../core/Public/Models/Interfaces/DTO/IUserDTO";
import {GetFollowerIdsParameters, IGetFollowerIdsParameters} from "../../core/Public/Parameters/UsersClient/GetFollowerIdsParameters";
import {IGetRelationshipBetweenParameters} from "../../core/Public/Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IGetProfileImageParameters} from "../../core/Public/Parameters/UsersClient/GetProfileImageParameters";
import {IFollowUserParameters} from "../../core/Public/Parameters/AccountClient/FollowUserParameters";
import {IUpdateRelationshipParameters} from "../../core/Public/Parameters/AccountClient/UpdateRelationshipParameters";
import {IRelationshipDetailsDTO} from "../../core/Public/Models/Interfaces/DTO/IRelationshipDetailsDTO";
import {Stream} from "stream";
import {IUnfollowUserParameters} from "../../core/Public/Parameters/AccountClient/UnfollowUserParameters";
import {IGetRelationshipsWithParameters} from "../../core/Public/Parameters/AccountClient/GetRelationshipsWithParameters";
import {
  GetUserIdsRequestingFriendshipParameters,
  IGetUserIdsRequestingFriendshipParameters
} from "../../core/Public/Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {IRelationshipStateDTO} from "../../core/Public/Models/Interfaces/DTO/IRelationshipStateDTO";
import {
  GetUserIdsYouRequestedToFollowParameters,
  IGetUserIdsYouRequestedToFollowParameters
} from "../../core/Public/Parameters/AccountClient/GetUserIdsYouRequestedToFollowParameters";
import {IBlockUserParameters} from "../../core/Public/Parameters/AccountClient/BlockUserParameters";
import {IUnblockUserParameters} from "../../core/Public/Parameters/AccountClient/UnblockUserParameters";
import {IReportUserForSpamParameters} from "../../core/Public/Parameters/AccountClient/ReportUserForSpamParameters";
import {
  GetBlockedUserIdsParameters,
  IGetBlockedUserIdsParameters
} from "../../core/Public/Parameters/AccountClient/GetBlockedUserIdsParameter";
import {GetBlockedUsersParameters, IGetBlockedUsersParameters} from "../../core/Public/Parameters/AccountClient/GetBlockedUsersParameter";
import {IUserCursorQueryResultDTO} from "../../core/Public/Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {IGetUserIdsWhoseRetweetsAreMutedParameters} from "../../core/Public/Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {GetMutedUserIdsParameters, IGetMutedUserIdsParameters} from "../../core/Public/Parameters/AccountClient/GetMutedUserIdsParameters";
import {GetMutedUsersParameters, IGetMutedUsersParameters} from "../../core/Public/Parameters/AccountClient/GetMutedUsersParameters";
import {IMuteUserParameters} from "../../core/Public/Parameters/AccountClient/MuteUserParameters";
import {IUnmuteUserParameters} from "../../core/Public/Parameters/AccountClient/UnMuteUserParameters";
import {Inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UserController implements IUserController {
  private readonly _userQueryExecutor: IUserQueryExecutor;

  constructor(@Inject(IUserQueryExecutorToken) userQueryExecutor: IUserQueryExecutor) {
    this._userQueryExecutor = userQueryExecutor;
  }

  public getAuthenticatedUserAsync(parameters: IGetAuthenticatedUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._userQueryExecutor.getAuthenticatedUserAsync(parameters, request);
  }

  public getUserAsync(parameters: IGetUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._userQueryExecutor.getUserAsync(parameters, request);
  }

  public getUsersAsync(parameters: IGetUsersParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO[]>> {
    return this._userQueryExecutor.getUsersAsync(parameters, request);
  }

  // Friend Ids
  public getFriendIdsIterator(parameters: IGetFriendIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(parameters.cursor,
      cursor => {
        let cursoredParameters = new GetFriendIdsParameters(parameters);
        cursoredParameters.cursor = cursor;


        return this._userQueryExecutor.getFriendIdsAsync(cursoredParameters, new TwitterRequest(request));
      },
      page => page.model.nextCursorStr,
      page => page.model.nextCursorStr === "0");

    return twitterCursorResult;
  }

  public getFollowerIdsIterator(parameters: IGetFollowerIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(parameters.cursor, cursor => {
        let cursoredParameters = new GetFollowerIdsParameters(parameters);
        cursoredParameters.cursor = cursor;

        return this._userQueryExecutor.getFollowerIdsAsync(cursoredParameters, new TwitterRequest(request));
      },
      page => page.model.nextCursorStr,
      page => page.model.nextCursorStr === "0");

    return twitterCursorResult;
  }

  public getRelationshipBetweenAsync(parameters: IGetRelationshipBetweenParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipDetailsDTO>> {
    return this._userQueryExecutor.getRelationshipBetweenAsync(parameters, request);
  }

  // Profile Image
  public getProfileImageStreamAsync(parameters: IGetProfileImageParameters, request: ITwitterRequest): Promise<any> /*Promise<Stream>*/ {
    return this._userQueryExecutor.getProfileImageStreamAsync(parameters, request);
  }

  // FOLLOW/UNFOLLOW
  public followUserAsync(parameters: IFollowUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._userQueryExecutor.followUserAsync(parameters, request);
  }

  public updateRelationshipAsync(parameters: IUpdateRelationshipParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipDetailsDTO>> {
    return this._userQueryExecutor.updateRelationshipAsync(parameters, request);
  }

  public unfollowUserAsync(parameters: IUnfollowUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._userQueryExecutor.unfollowUserAsync(parameters, request);
  }

  // FRIENDSHIP

  public getRelationshipsWithAsync(parameters: IGetRelationshipsWithParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipStateDTO[]>> {
    return this._userQueryExecutor.getRelationshipsWithAsync(parameters, request);
  }

  public getUserIdsRequestingFriendshipIterator(parameters: IGetUserIdsRequestingFriendshipParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(parameters.cursor,
      cursor => {
        let cursoredParameters = new GetUserIdsRequestingFriendshipParameters(parameters);
        cursoredParameters.cursor = cursor;

        return this._userQueryExecutor.getUserIdsRequestingFriendshipAsync(cursoredParameters, new TwitterRequest(request));
      },
      page => page.model.nextCursorStr,
      page => page.model.nextCursorStr === "0");

    return twitterCursorResult;
  }

  public getUserIdsYouRequestedToFollowIterator(parameters: IGetUserIdsYouRequestedToFollowParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(parameters.cursor,
      cursor => {
        let cursoredParameters = new GetUserIdsYouRequestedToFollowParameters(parameters);
        cursoredParameters.cursor = cursor;

        return this._userQueryExecutor.getUserIdsYouRequestedToFollowAsync(cursoredParameters, new TwitterRequest(request));
      },
      page => page.model.nextCursorStr,
      page => page.model.nextCursorStr === "0");

    return twitterCursorResult;
  }

  // BLOCK
  public blockUserAsync(parameters: IBlockUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._userQueryExecutor.blockUserAsync(parameters, request);
  }

  public unblockUserAsync(parameters: IUnblockUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._userQueryExecutor.unblockUserAsync(parameters, request);
  }

  public reportUserForSpamAsync(parameters: IReportUserForSpamParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._userQueryExecutor.reportUserForSpamAsync(parameters, request);
  }

  public getBlockedUserIdsIterator(parameters: IGetBlockedUserIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(parameters.cursor,
      cursor => {
        let cursoredParameters = new GetBlockedUserIdsParameters(parameters);
        cursoredParameters.cursor = cursor;

        return this._userQueryExecutor.getBlockedUserIdsAsync(cursoredParameters, new TwitterRequest(request));
      },
      page => page.model.nextCursorStr,
      page => page.model.nextCursorStr === "0");

    return twitterCursorResult;
  }

  public getBlockedUsersIterator(parameters: IGetBlockedUsersParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> {
    let twitterCursorResult = new TwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>(parameters.cursor,
      cursor => {
        let cursoredParameters = new GetBlockedUsersParameters(parameters);
        cursoredParameters.cursor = cursor;

        return this._userQueryExecutor.getBlockedUsersAsync(cursoredParameters, new TwitterRequest(request));
      },
      page => page.model.nextCursorStr,
      page => page.model.nextCursorStr === "0");

    return twitterCursorResult;
  }

  // MUTE
  public getUserIdsWhoseRetweetsAreMutedAsync(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters, request: ITwitterRequest): Promise<ITwitterResult<number[]>> {
    return this._userQueryExecutor.getUserIdsWhoseRetweetsAreMutedAsync(parameters, request);
  }

  public getMutedUserIdsIterator(parameters: IGetMutedUserIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(parameters.cursor,
      cursor => {
        let cursoredParameters = new GetMutedUserIdsParameters(parameters);
        cursoredParameters.cursor = cursor;

        return this._userQueryExecutor.getMutedUserIdsAsync(cursoredParameters, new TwitterRequest(request));
      },
      page => page.model.nextCursorStr,
      page => page.model.nextCursorStr === "0");

    return twitterCursorResult;
  }

  public getMutedUsersIterator(parameters: IGetMutedUsersParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> {
    let twitterCursorResult = new TwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>(parameters.cursor,
      cursor => {
        let cursoredParameters = new GetMutedUsersParameters(parameters);
        cursoredParameters.cursor = cursor;

        return this._userQueryExecutor.getMutedUsersAsync(cursoredParameters, new TwitterRequest(request));
      },
      page => page.model.nextCursorStr,
      page => page.model.nextCursorStr === "0");

    return twitterCursorResult;
  }

  public muteUserAsync(parameters: IMuteUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._userQueryExecutor.muteUserAsync(parameters, request);
  }

  public unmuteUserAsync(parameters: IUnmuteUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._userQueryExecutor.unmuteUserAsync(parameters, request);
  }
}
