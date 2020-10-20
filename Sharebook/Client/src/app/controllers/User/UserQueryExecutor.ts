import {ITwitterResult, TwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {Stream} from "stream";
import {ITwitterAccessor} from 'src/app/core/Core/Web/ITwitterAccessor';
import {IUserQueryGenerator} from "../../core/Core/QueryGenerators/IUserQueryGenerator";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import {IGetAuthenticatedUserParameters} from "../../core/Public/Parameters/AccountClient/GetAuthenticatedUserParameters";
import {IGetUserParameters} from "../../core/Public/Parameters/UsersClient/GetUserParameters";
import {IGetUsersParameters} from "../../core/Public/Parameters/UsersClient/GetUsersParameters";
import {IGetFriendIdsParameters} from "../../core/Public/Parameters/UsersClient/GetFriendIdsParameters";
import {IGetFollowerIdsParameters} from "../../core/Public/Parameters/UsersClient/GetFollowerIdsParameters";
import {IBlockUserParameters} from "../../core/Public/Parameters/AccountClient/BlockUserParameters";
import {IUnblockUserParameters} from "../../core/Public/Parameters/AccountClient/UnblockUserParameters";
import {IReportUserForSpamParameters} from "../../core/Public/Parameters/AccountClient/ReportUserForSpamParameters";
import {IGetBlockedUserIdsParameters} from "../../core/Public/Parameters/AccountClient/GetBlockedUserIdsParameter";
import {IGetBlockedUsersParameters} from "../../core/Public/Parameters/AccountClient/GetBlockedUsersParameter";
import {IFollowUserParameters} from "../../core/Public/Parameters/AccountClient/FollowUserParameters";
import {IUnfollowUserParameters} from "../../core/Public/Parameters/AccountClient/UnfollowUserParameters";
import {IGetUserIdsRequestingFriendshipParameters} from "../../core/Public/Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {IGetUserIdsYouRequestedToFollowParameters} from "../../core/Public/Parameters/AccountClient/GetUserIdsYouRequestedToFollowParameters";
import {IGetRelationshipBetweenParameters} from "../../core/Public/Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IGetRelationshipsWithParameters} from "../../core/Public/Parameters/AccountClient/GetRelationshipsWithParameters";
import {IGetMutedUserIdsParameters} from "../../core/Public/Parameters/AccountClient/GetMutedUserIdsParameters";
import {IGetMutedUsersParameters} from "../../core/Public/Parameters/AccountClient/GetMutedUsersParameters";
import {IMuteUserParameters} from "../../core/Public/Parameters/AccountClient/MuteUserParameters";
import {IUnmuteUserParameters} from "../../core/Public/Parameters/AccountClient/UnMuteUserParameters";
import {IUpdateRelationshipParameters} from "../../core/Public/Parameters/AccountClient/UpdateRelationshipParameters";
import {IGetUserIdsWhoseRetweetsAreMutedParameters} from "../../core/Public/Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {IGetProfileImageParameters} from "../../core/Public/Parameters/UsersClient/GetProfileImageParameters";
import {IUserDTO} from "../../core/Public/Models/Interfaces/DTO/IUserDTO";
import {IRelationshipDetailsDTO} from "../../core/Public/Models/Interfaces/DTO/IRelationshipDetailsDTO";
import {IUserCursorQueryResultDTO} from "../../core/Public/Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {IIdsCursorQueryResultDTO} from "../../core/Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {IRelationshipStateDTO} from "../../core/Public/Models/Interfaces/DTO/IRelationshipStateDTO";
import {IWebHelper} from "../../core/Core/Helpers/IWebHelper";

export interface IUserQueryExecutor {
  getAuthenticatedUserAsync(parameters: IGetAuthenticatedUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  // USERS
  getUserAsync(parameters: IGetUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  getUsersAsync(parameters: IGetUsersParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO[]>>;

  // FRIENDS
  getFriendIdsAsync(parameters: IGetFriendIdsParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>>;

  getFollowerIdsAsync(parameters: IGetFollowerIdsParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>>;

  // BLOCK
  blockUserAsync(parameters: IBlockUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  unblockUserAsync(parameters: IUnblockUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  reportUserForSpamAsync(parameters: IReportUserForSpamParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  getBlockedUserIdsAsync(parameters: IGetBlockedUserIdsParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>>;

  getBlockedUsersAsync(parameters: IGetBlockedUsersParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserCursorQueryResultDTO>>;

  // FOLLOWERS
  followUserAsync(parameters: IFollowUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  unfollowUserAsync(parameters: IUnfollowUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  // ONGOING REQUESTS
  getUserIdsRequestingFriendshipAsync(parameters: IGetUserIdsRequestingFriendshipParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>>;

  getUserIdsYouRequestedToFollowAsync(parameters: IGetUserIdsYouRequestedToFollowParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>>;

  // FRIENDSHIPS
  getRelationshipBetweenAsync(parameters: IGetRelationshipBetweenParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipDetailsDTO>>;

  getRelationshipsWithAsync(parameters: IGetRelationshipsWithParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipStateDTO[]>>;

  // MUTE
  getMutedUserIdsAsync(parameters: IGetMutedUserIdsParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>>;

  getMutedUsersAsync(cursoredParameters: IGetMutedUsersParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserCursorQueryResultDTO>>;

  muteUserAsync(parameters: IMuteUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  unmuteUserAsync(parameters: IUnmuteUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  updateRelationshipAsync(parameters: IUpdateRelationshipParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipDetailsDTO>>;

  getUserIdsWhoseRetweetsAreMutedAsync(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters, request: ITwitterRequest): Promise<ITwitterResult<number[]>>;

  getProfileImageStreamAsync(parameters: IGetProfileImageParameters, request: ITwitterRequest): Promise<Stream>;
}

export class UserQueryExecutor implements IUserQueryExecutor {
  private readonly _userQueryGenerator: IUserQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;
  private readonly _webHelper: IWebHelper;

  constructor(userQueryGenerator: IUserQueryGenerator, twitterAccessor: ITwitterAccessor, webHelper: IWebHelper) {
    this._userQueryGenerator = userQueryGenerator;
    this._twitterAccessor = twitterAccessor;
    this._webHelper = webHelper;
  }

  public getAuthenticatedUserAsync(parameters: IGetAuthenticatedUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._userQueryGenerator.getAuthenticatedUserQuery(parameters);

    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;

    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

  public getUserAsync(parameters: IGetUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._userQueryGenerator.getUserQuery(parameters);

    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;

    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

  public getUsersAsync(parameters: IGetUsersParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO[]>> {
    if (parameters.Users.length === 0) {
      let result: ITwitterResult<IUserDTO[]> = new TwitterResult<IUserDTO[]>(null);
      result.request = null;
      result.response = null;
      result.model = Array<IUserDTO>(0); // new IUserDTO[0];

      return Task.FromResult(result);
    }

    let query = this._userQueryGenerator.getUsersQuery(parameters);

    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;

    return this._twitterAccessor.executeRequestAsync<IUserDTO[]>(request);
  }

  public getFollowerIdsAsync(parameters: IGetFollowerIdsParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let query = this._userQueryGenerator.getFollowerIdsQuery(parameters);

    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;

    return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
  }

  public getFriendIdsAsync(parameters: IGetFriendIdsParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let query = this._userQueryGenerator.getFriendIdsQuery(parameters);

    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;

    return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
  }

  public getRelationshipBetweenAsync(parameters: IGetRelationshipBetweenParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipDetailsDTO>> {
    let query = this._userQueryGenerator.getRelationshipBetweenQuery(parameters);

    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;

    return this._twitterAccessor.executeRequestAsync<IRelationshipDetailsDTO>(request);
  }

  // Stream Profile Image
  public getProfileImageStreamAsync(parameters: IGetProfileImageParameters, request: ITwitterRequest): Promise<Stream> {
    let url = this._userQueryGenerator.downloadProfileImageURL(parameters);

    request.query.url = url;
    request.query.httpMethod = HttpMethod.GET;

    return this._webHelper.getResponseStreamAsync(request);
  }

  // BLOCK
  public blockUserAsync(parameters: IBlockUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._userQueryGenerator.getBlockUserQuery(parameters);

    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;

    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

  public unblockUserAsync(parameters: IUnblockUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._userQueryGenerator.getUnblockUserQuery(parameters);

    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;

    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

  public reportUserForSpamAsync(parameters: IReportUserForSpamParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._userQueryGenerator.getReportUserForSpamQuery(parameters);

    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;

    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

  public getBlockedUserIdsAsync(parameters: IGetBlockedUserIdsParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let query = this._userQueryGenerator.getBlockedUserIdsQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
  }

  public getBlockedUsersAsync(parameters: IGetBlockedUsersParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserCursorQueryResultDTO>> {
    let query = this._userQueryGenerator.getBlockedUsersQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IUserCursorQueryResultDTO>(request);
  }

  // FOLLOWERS
  public followUserAsync(parameters: IFollowUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._userQueryGenerator.getFollowUserQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

  public updateRelationshipAsync(parameters: IUpdateRelationshipParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipDetailsDTO>> {
    let query = this._userQueryGenerator.getUpdateRelationshipQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<IRelationshipDetailsDTO>(request);
  }

  public unfollowUserAsync(parameters: IUnfollowUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._userQueryGenerator.getUnfollowUserQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

  public getUserIdsRequestingFriendshipAsync(parameters: IGetUserIdsRequestingFriendshipParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let query = this._userQueryGenerator.getUserIdsRequestingFriendshipQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
  }

  public getUserIdsYouRequestedToFollowAsync(parameters: IGetUserIdsYouRequestedToFollowParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let query = this._userQueryGenerator.getUserIdsYouRequestedToFollowQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
  }

  // FRIENDSHIPS
  public getRelationshipsWithAsync(parameters: IGetRelationshipsWithParameters, request: ITwitterRequest): Promise<ITwitterResult<IRelationshipStateDTO[]>> {
    let query = this._userQueryGenerator.getRelationshipsWithQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IRelationshipStateDTO[]>(request);
  }

  // MUTE
  public getUserIdsWhoseRetweetsAreMutedAsync(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters, request: ITwitterRequest): Promise<ITwitterResult<number[]>> {
    let query = this._userQueryGenerator.getUserIdsWhoseRetweetsAreMutedQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<number[]>(request);
  }

  public getMutedUserIdsAsync(parameters: IGetMutedUserIdsParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let query = this._userQueryGenerator.getMutedUserIdsQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
  }

  public getMutedUsersAsync(parameters: IGetMutedUsersParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserCursorQueryResultDTO>> {
    let query = this._userQueryGenerator.getMutedUsersQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IUserCursorQueryResultDTO>(request);
  }

  public muteUserAsync(parameters: IMuteUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._userQueryGenerator.getMuteUserQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

  public unmuteUserAsync(parameters: IUnmuteUserParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._userQueryGenerator.getUnmuteUserQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }
}
