import {IUserIdentifier} from "../../../core/Public/Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../../core/Public/Models/UserIdentifier";
import {IUsersClient} from "../../../core/Public/Client/Clients/IUsersClient";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {IUsersRequester} from "../../../core/Public/Client/Requesters/IUsersRequester";
import {IMultiLevelCursorIteratorFactory, IMultiLevelCursorIteratorFactoryToken} from "../../../core/Core/Iterators/MultiLevelCursorIteratorFactory";
import {IAuthenticatedUser} from "../../../core/Public/Models/Interfaces/IAuthenticatedUser";
import {
  GetAuthenticatedUserParameters,
  IGetAuthenticatedUserParameters
} from "../../../core/Public/Parameters/AccountClient/GetAuthenticatedUserParameters";
import {IUser} from "../../../core/Public/Models/Interfaces/IUser";
import {GetUserParameters, IGetUserParameters} from "../../../core/Public/Parameters/UsersClient/GetUserParameters";
import {IUsersClientParametersValidator} from "../../../core/Core/Client/Validators/UsersClientParametersValidator";
import Type from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";
import {GetProfileImageParameters, IGetProfileImageParameters} from "../../../core/Public/Parameters/UsersClient/GetProfileImageParameters";
import {IUserDTO} from "../../../core/Public/Models/Interfaces/DTO/IUserDTO";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {GetUsersParameters, IGetUsersParameters} from "../../../core/Public/Parameters/UsersClient/GetUsersParameters";
import {IRelationshipDetails} from "../../../core/Public/Models/Interfaces/IRelationshipDetails";
import {
  GetRelationshipBetweenParameters,
  IGetRelationshipBetweenParameters
} from "../../../core/Public/Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IRelationshipDetailsDTO} from "../../../core/Public/Models/Interfaces/DTO/IRelationshipDetailsDTO";
import {GetFriendIdsParameters, IGetFriendIdsParameters} from "../../../core/Public/Parameters/UsersClient/GetFriendIdsParameters";
import {ITwitterIterator} from "../../../core/Public/Iterators/ITwitterIterator";
import {TwitterIteratorProxy} from "../../../core/Core/Iterators/TwitterIteratorProxy";
import {IIdsCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {ITwitterPageIterator} from "../../../core/Core/Iterators/TwitterPageIterator";
import {GetFriendsParameters, IGetFriendsParameters} from 'src/app/core/Public/Parameters/UsersClient/GetFriendsParameters';
import {IMultiLevelCursorIterator} from "../../../core/Public/Iterators/IMultiLevelCursorIterator";
import {TwitterArgumentLimitException} from "../../../core/Public/Exceptions/TwitterArgumentLimitException";
import {GetFollowerIdsParameters, IGetFollowerIdsParameters} from "../../../core/Public/Parameters/UsersClient/GetFollowerIdsParameters";
import {GetFollowersParameters, IGetFollowersParameters} from "../../../core/Public/Parameters/UsersClient/GetFollowersParameters";
import {BlockUserParameters, IBlockUserParameters} from "../../../core/Public/Parameters/AccountClient/BlockUserParameters";
import {IUnblockUserParameters, UnblockUserParameters} from "../../../core/Public/Parameters/AccountClient/UnblockUserParameters";
import {
  IReportUserForSpamParameters,
  ReportUserForSpamParameters
} from "../../../core/Public/Parameters/AccountClient/ReportUserForSpamParameters";
import {
  GetBlockedUserIdsParameters,
  IGetBlockedUserIdsParameters
} from "../../../core/Public/Parameters/AccountClient/GetBlockedUserIdsParameter";
import {
  GetBlockedUsersParameters,
  IGetBlockedUsersParameters
} from "../../../core/Public/Parameters/AccountClient/GetBlockedUsersParameter";
import {IUserCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {FollowUserParameters, IFollowUserParameters} from "../../../core/Public/Parameters/AccountClient/FollowUserParameters";
import {IUnfollowUserParameters, UnfollowUserParameters} from "../../../core/Public/Parameters/AccountClient/UnfollowUserParameters";
import {IUpdateRelationshipParameters} from "../../../core/Public/Parameters/AccountClient/UpdateRelationshipParameters";
import {
  GetUserIdsRequestingFriendshipParameters,
  IGetUserIdsRequestingFriendshipParameters
} from "../../../core/Public/Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {
  GetUsersRequestingFriendshipParameters,
  IGetUsersRequestingFriendshipParameters
} from "../../../core/Public/Parameters/AccountClient/GetUsersRequestingFriendshipParameters";
import {
  GetUserIdsYouRequestedToFollowParameters,
  IGetUserIdsYouRequestedToFollowParameters
} from "../../../core/Public/Parameters/AccountClient/GetUserIdsYouRequestedToFollowParameters";
import {
  GetUsersYouRequestedToFollowParameters,
  IGetUsersYouRequestedToFollowParameters
} from "../../../core/Public/Parameters/AccountClient/GetUsersYouRequestedToFollowParameters";
import {IUserDictionary, UserDictionary} from "../../../core/Public/Models/UserDictionary";
import {IRelationshipState} from "../../../core/Public/Models/Interfaces/IRelationshipState";
import {
  GetRelationshipsWithParameters,
  IGetRelationshipsWithParameters
} from "../../../core/Public/Parameters/AccountClient/GetRelationshipsWithParameters";
import {
  GetUserIdsWhoseRetweetsAreMutedParameters,
  IGetUserIdsWhoseRetweetsAreMutedParameters
} from "../../../core/Public/Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {
  GetMutedUserIdsParameters,
  IGetMutedUserIdsParameters
} from "../../../core/Public/Parameters/AccountClient/GetMutedUserIdsParameters";
import {GetMutedUsersParameters, IGetMutedUsersParameters} from "../../../core/Public/Parameters/AccountClient/GetMutedUsersParameters";
import {IMuteUserParameters, MuteUserParameters} from "../../../core/Public/Parameters/AccountClient/MuteUserParameters";
import {IUnmuteUserParameters, UnmuteUserParameters} from "../../../core/Public/Parameters/AccountClient/UnMuteUserParameters";
import {Stream} from "stream";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class UsersClient implements IUsersClient {
  private readonly _client: ITwitterClient;
  private readonly _usersRequester: IUsersRequester;
  private readonly _multiLevelCursorIteratorFactory: IMultiLevelCursorIteratorFactory;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(IMultiLevelCursorIteratorFactoryToken) multiLevelCursorIteratorFactory: IMultiLevelCursorIteratorFactory) {
    this._client = client;
    this._usersRequester = client.raw.users;
    this._multiLevelCursorIteratorFactory = multiLevelCursorIteratorFactory;
  }

  get parametersValidator(): IUsersClientParametersValidator {
    return this._client.parametersValidator;
  }

  // #region Authenticated User

  public async getAuthenticatedUserAsync(parameters?: IGetAuthenticatedUserParameters): Promise<IAuthenticatedUser> {
    if (!parameters) {
      parameters = new GetAuthenticatedUserParameters();
    }

    let requestResult = await this._usersRequester.getAuthenticatedUserAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createAuthenticatedUser(requestResult?.model);
  }

  // #endregion

  // #region GetUser

  public async getUserAsync(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetUserParameters): Promise<IUser> {
    let parameters: IGetUserParameters;
    if (UsersClient.isIGetUserParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      let userCurrent: IUserIdentifier;
      if (Type.isNumber(userIdOrUsernameOrUserOrParameters) || Type.isString(userIdOrUsernameOrUserOrParameters)) {
        userCurrent = new UserIdentifier(userIdOrUsernameOrUserOrParameters);
      } else {
        userCurrent = userIdOrUsernameOrUserOrParameters;
      }

      parameters = new GetUserParameters(userCurrent);
    }

    let requestResult: ITwitterResult<IUserDTO> = await this._usersRequester.getUserAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createUser(requestResult?.model);
  }

  // #endregion

  // #region GetUsers

  public async getUsersAsync(userIdsOrUsernamesOrUsersOrParameters: | Array<number> | Array<string> | Array<IUserIdentifier> | IGetUsersParameters): Promise<IUser[]> {
    let parameters: IGetUsersParameters;
    if (UsersClient.isIGetUsersParameters(userIdsOrUsernamesOrUsersOrParameters)) {
      parameters = userIdsOrUsernamesOrUsersOrParameters;
    } else {
      let usersCurrent: Array<IUserIdentifier>;
      if (UsersClient.isArrayFromNumber(userIdsOrUsernamesOrUsersOrParameters)) {
        usersCurrent = userIdsOrUsernamesOrUsersOrParameters.map(x => new UserIdentifier(x));
      } else if (UsersClient.isArrayFromString(userIdsOrUsernamesOrUsersOrParameters)) {
        usersCurrent = userIdsOrUsernamesOrUsersOrParameters.map(x => new UserIdentifier(x));
      } else {
        usersCurrent = userIdsOrUsernamesOrUsersOrParameters;
      }

      parameters = new GetUsersParameters(usersCurrent);
    }

    if (parameters.Users == null || parameters.Users.length === 0) {
      return new Array<IUser>(0); // new IUser[0];
    }

    let requestResult: ITwitterResult<IUserDTO[]> = await this._usersRequester.getUsersAsync(parameters);    // .ConfigureAwait(false);
    return this._client.factories.createUsers(requestResult?.model);
  }

  // #endregion

  // #region Relationship Between Users

  public async getRelationshipBetweenAsync(sourceUserIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetRelationshipBetweenParameters,
                                           targetUserIdOrUsernameOrUser?: number | string | IUserIdentifier): Promise<IRelationshipDetails> {
    let parameters: IGetRelationshipBetweenParameters;
    if (UsersClient.isIGetRelationshipBetweenParameters(sourceUserIdOrUsernameOrUserOrParameters)) {
      parameters = sourceUserIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new GetRelationshipBetweenParameters(sourceUserIdOrUsernameOrUserOrParameters, targetUserIdOrUsernameOrUser);
    }

    let relationshipTwitterResult: ITwitterResult<IRelationshipDetailsDTO> = await this._usersRequester.getRelationshipBetweenAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createRelationshipDetails(relationshipTwitterResult?.model);
  }

  // #endregion

  // #region GetFriends

  public async getFriendIdsAsync(userIdOrUsernameOrUserOrParameter: number | string | IUserIdentifier | IGetFriendIdsParameters): Promise<number[]> {
    let parameters: IGetFriendIdsParameters;
    if (UsersClient.isIGetFriendIdsParameters(userIdOrUsernameOrUserOrParameter)) {
      parameters = userIdOrUsernameOrUserOrParameter;
    } else {
      parameters = new GetFriendIdsParameters(userIdOrUsernameOrUserOrParameter);
    }

    let iterator: ITwitterIterator<number> = this.getFriendIdsIterator(parameters);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getFriendIdsIterator(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetFriendIdsParameters): ITwitterIterator<number> {
    let parameters: IGetFriendIdsParameters;
    if (UsersClient.isIGetFriendIdsParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new GetFriendIdsParameters(userIdOrUsernameOrUserOrParameters);
    }

    let twitterResultIterator: ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> = this._usersRequester.getFriendIdsIterator(parameters);
    return new TwitterIteratorProxy<ITwitterResult<IIdsCursorQueryResultDTO>, number>(twitterResultIterator, dto => dto.model.ids);
  }


  public async getFriendsAsync(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetFriendsParameters): Promise<IUser[]> {
    let parameters: IGetFriendsParameters;
    if (UsersClient.isIGetFriendsParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new GetFriendsParameters(userIdOrUsernameOrUserOrParameters);
    }

    let iterator: IMultiLevelCursorIterator<number, IUser> = this.getFriendsIterator(parameters);
    return [...(await iterator.nextPageAsync())];      // .ConfigureAwait(false)).ToArray();
  }


  public getFriendsIterator(parameters: IGetFriendsParameters): IMultiLevelCursorIterator<number, IUser> {
    let friendsPageIterator = this._usersRequester.getFriendIdsIterator(parameters);

    let maxPageSize = this._client.config.limits.USERS_GET_USERS_MAX_SIZE;
    if (parameters.GetUsersPageSize > maxPageSize) {
      throw new TwitterArgumentLimitException(`${nameof(parameters.GetUsersPageSize)}`, maxPageSize, nameof(this._client.config.limits.USERS_GET_USERS_MAX_SIZE),
        "page size");
    }

    return this._multiLevelCursorIteratorFactory.createUserMultiLevelIterator(this._client, friendsPageIterator, maxPageSize);
  }

  // #endregion

  // #region GetFollowers

  public async getFollowerIdsAsync(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetFollowerIdsParameters): Promise<number[]> {
    let parameters: IGetFollowerIdsParameters;
    if (UsersClient.isIGetFollowerIdsParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new GetFollowerIdsParameters(userIdOrUsernameOrUserOrParameters);
    }

    let iterator: ITwitterIterator<number> = this.getFollowerIdsIterator(parameters);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getFollowerIdsIterator(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetFollowerIdsParameters): ITwitterIterator<number> {
    let parameters: IGetFollowerIdsParameters;
    if (UsersClient.isIGetFollowerIdsParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new GetFollowerIdsParameters(userIdOrUsernameOrUserOrParameters);
    }
    let followerIdsPageIterator = this._usersRequester.getFollowerIdsIterator(parameters);
    return new TwitterIteratorProxy<ITwitterResult<IIdsCursorQueryResultDTO>, number>(followerIdsPageIterator, dto => dto.model.ids);
  }

  public async getFollowersAsync(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetFollowersParameters): Promise<IUser[]> {
    let parameters: IGetFollowersParameters;
    if (UsersClient.isIGetFollowersParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new GetFollowersParameters(userIdOrUsernameOrUserOrParameters);
    }

    let iterator = this.getFollowersIterator(parameters);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getFollowersIterator(parameters: IGetFollowersParameters): IMultiLevelCursorIterator<number, IUser> {
    let followerPageIterator = this._usersRequester.getFollowerIdsIterator(parameters);

    let maxPageSize = this._client.config.limits.USERS_GET_USERS_MAX_SIZE;
    if (parameters.GetUsersPageSize > maxPageSize) {
      throw new TwitterArgumentLimitException(`${nameof(parameters.GetUsersPageSize)}`, maxPageSize,
        nameof(this._client.config.limits.USERS_GET_USERS_MAX_SIZE), "page size");
    }

    return this._multiLevelCursorIteratorFactory.createUserMultiLevelIterator(this._client, followerPageIterator, maxPageSize);
  }

  // #endregion

  // #region Block / Unblock

  public async blockUserAsync(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IBlockUserParameters): Promise<IUser> {
    let parameters: IBlockUserParameters;
    if (UsersClient.isIBlockUserParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new BlockUserParameters(userIdOrUsernameOrUserOrParameters);
    }

    let twitterResult: ITwitterResult<IUserDTO> = await this._usersRequester.blockUserAsync(parameters); // ;.ConfigureAwait(false);
    return this._client.factories.createUser(twitterResult?.model);
  }

  public async unblockUserAsync(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IUnblockUserParameters): Promise<IUser> {
    let parameters: IUnblockUserParameters;
    if (UsersClient.isIUnblockUserParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new UnblockUserParameters(userIdOrUsernameOrUserOrParameters);
    }

    let twitterResult: ITwitterResult<IUserDTO> = await this._usersRequester.unblockUserAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createUser(twitterResult?.model);
  }

  public async reportUserForSpamAsync(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IReportUserForSpamParameters): Promise<IUser> {
    let parameters: IReportUserForSpamParameters;
    if (UsersClient.isIReportUserForSpamParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new ReportUserForSpamParameters(userIdOrUsernameOrUserOrParameters);
    }

    let twitterResult: ITwitterResult<IUserDTO> = await this._usersRequester.reportUserForSpamAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createUser(twitterResult?.model);
  }

  public async getBlockedUserIdsAsync(parameters?: IGetBlockedUserIdsParameters): Promise<number[]> {
    let parametersCurrent: IGetBlockedUserIdsParameters;
    if (!parameters) {
      parametersCurrent = new GetBlockedUserIdsParameters();
    } else {
      parametersCurrent = parameters;
    }


    let iterator = this.getBlockedUserIdsIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getBlockedUserIdsIterator(parameters?: IGetBlockedUserIdsParameters): ITwitterIterator<number> {
    let parametersCurrent: IGetBlockedUserIdsParameters;
    if (!parameters) {
      parametersCurrent = new GetBlockedUserIdsParameters();
    } else {
      parametersCurrent = parameters;
    }

    let twitterCursorResult = this._usersRequester.getBlockedUserIdsIterator(parametersCurrent);
    return new TwitterIteratorProxy<ITwitterResult<IIdsCursorQueryResultDTO>, number>(twitterCursorResult, dto => dto.model.ids);
  }

  public async getBlockedUsersAsync(parameters?: IGetBlockedUsersParameters): Promise<IUser[]> {
    let parametersCurrent: IGetBlockedUserIdsParameters;
    if (!parameters) {
      parametersCurrent = new GetBlockedUsersParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this.getBlockedUsersIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getBlockedUsersIterator(parameters?: IGetBlockedUsersParameters): ITwitterIterator<IUser> {
    let parametersCurrent: IGetBlockedUsersParameters;
    if (!parameters) {
      parametersCurrent = new GetBlockedUsersParameters();
    } else {
      parametersCurrent = parameters;
    }

    let twitterCursorResult = this._usersRequester.getBlockedUsersIterator(parametersCurrent);
    return new TwitterIteratorProxy<ITwitterResult<IUserCursorQueryResultDTO>, IUser>(twitterCursorResult, pageResult => {
      let userDTOs = pageResult.model.users;
      return this._client.factories.createUsers(userDTOs);
    });
  }

  // #endregion

  // #region Follow / Unfollow

  public async followUserAsync(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IFollowUserParameters): Promise<IUser> {
    let parameters: IFollowUserParameters;
    if (UsersClient.isIFollowUserParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new FollowUserParameters(userIdOrUsernameOrUserOrParameters);
    }

    let twitterResult = await this._usersRequester.followUserAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createUser(twitterResult?.model);
  }

  public async unfollowUserAsync(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IUnfollowUserParameters): Promise<IUser> {
    let parameters: IUnfollowUserParameters;
    if (UsersClient.isIUnfollowUserParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new UnfollowUserParameters(userIdOrUsernameOrUserOrParameters);
    }

    let twitterResult = await this._usersRequester.unfollowUserAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createUser(twitterResult?.model);
  }

  // #endregion

  // #region Update Friendship

  public async updateRelationshipAsync(parameters: IUpdateRelationshipParameters): Promise<void> {
    await this._usersRequester.updateRelationshipAsync(parameters); // .ConfigureAwait(false);
  }

  // #endregion

  // #region Pending Followers Requests

  public async getUserIdsRequestingFriendshipAsync(parameters?: IGetUserIdsRequestingFriendshipParameters): Promise<number[]> {
    let parametersCurrent: IGetUserIdsRequestingFriendshipParameters;
    if (!parameters) {
      parametersCurrent = new GetUserIdsRequestingFriendshipParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this.getUserIdsRequestingFriendshipIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getUserIdsRequestingFriendshipIterator(parameters?: IGetUserIdsRequestingFriendshipParameters): ITwitterIterator<number> {
    let parametersCurrent: IGetUserIdsRequestingFriendshipParameters;
    if (!parameters) {
      parametersCurrent = new GetUserIdsRequestingFriendshipParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this._usersRequester.getUserIdsRequestingFriendshipIterator(parametersCurrent);
    return new TwitterIteratorProxy<ITwitterResult<IIdsCursorQueryResultDTO>, number>(iterator, dto => dto.model.ids);
  }

  public async getUsersRequestingFriendshipAsync(parameters?: IGetUsersRequestingFriendshipParameters): Promise<IUser[]> {
    let parametersCurrent: IGetUsersRequestingFriendshipParameters;
    if (!parameters) {
      parametersCurrent = new GetUsersRequestingFriendshipParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this.getUsersRequestingFriendshipIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getUsersRequestingFriendshipIterator(parameters?: IGetUsersRequestingFriendshipParameters): IMultiLevelCursorIterator<number, IUser> {
    let parametersCurrent: IGetUsersRequestingFriendshipParameters;
    if (!parameters) {
      parametersCurrent = new GetUsersRequestingFriendshipParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this._usersRequester.getUserIdsRequestingFriendshipIterator(parametersCurrent);

    let maxPageSize = this._client.config.limits.USERS_GET_USERS_MAX_SIZE;
    if (parametersCurrent.getUsersPageSize > maxPageSize) {
      throw new TwitterArgumentLimitException(`${nameof(parametersCurrent.getUsersPageSize)}`, maxPageSize, nameof(this._client.config.limits.USERS_GET_USERS_MAX_SIZE), "page size");
    }

    return this._multiLevelCursorIteratorFactory.createUserMultiLevelIterator(this._client, iterator, maxPageSize);
  }

  public async getUserIdsYouRequestedToFollowAsync(parameters?: IGetUserIdsYouRequestedToFollowParameters): Promise<number[]> {
    let parametersCurrent: IGetUserIdsYouRequestedToFollowParameters;
    if (!parameters) {
      parametersCurrent = new GetUserIdsYouRequestedToFollowParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this.getUserIdsYouRequestedToFollowIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getUserIdsYouRequestedToFollowIterator(parameters?: IGetUserIdsYouRequestedToFollowParameters): ITwitterIterator<number> {
    let parametersCurrent: IGetUserIdsYouRequestedToFollowParameters;
    if (!parameters) {
      parametersCurrent = new GetUserIdsYouRequestedToFollowParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this._usersRequester.getUserIdsYouRequestedToFollowIterator(parametersCurrent);
    return new TwitterIteratorProxy<ITwitterResult<IIdsCursorQueryResultDTO>, number>(iterator, dto => dto.model.ids);
  }

  public async getUsersYouRequestedToFollowAsync(parameters?: IGetUsersYouRequestedToFollowParameters): Promise<IUser[]> {
    let parametersCurrent: IGetUsersYouRequestedToFollowParameters;
    if (!parameters) {
      parametersCurrent = new GetUsersYouRequestedToFollowParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this.getUsersYouRequestedToFollowIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getUsersYouRequestedToFollowIterator(parameters?: IGetUsersYouRequestedToFollowParameters): IMultiLevelCursorIterator<number, IUser> {
    let parametersCurrent: IGetUsersYouRequestedToFollowParameters;
    if (!parameters) {
      parametersCurrent = new GetUsersYouRequestedToFollowParameters();
    } else {
      parametersCurrent = parameters;
    }
    let iterator = this._usersRequester.getUserIdsYouRequestedToFollowIterator(parametersCurrent);

    let maxPageSize = this._client.config.limits.USERS_GET_USERS_MAX_SIZE;
    if (parametersCurrent.getUsersPageSize > maxPageSize) {
      throw new TwitterArgumentLimitException(`${nameof(parametersCurrent.getUsersPageSize)}`, maxPageSize, nameof(this._client.config.limits.USERS_GET_USERS_MAX_SIZE), "page size");
    }

    return this._multiLevelCursorIteratorFactory.createUserMultiLevelIterator(this._client, iterator, maxPageSize);
  }

  // #endregion

  // #region Relationships With

  public async getRelationshipsWithAsync(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters: number[] | string[] | IUserIdentifier[] | IUser[] | IGetRelationshipsWithParameters):
    Promise<IUserDictionary<IRelationshipState>> {
    let parametersCurrent: IGetRelationshipsWithParameters;
    if (UsersClient.isArrayFromNumber(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters)
      || UsersClient.isArrayFromString(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters)
      || UsersClient.isArrayFromUserIdentifier(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters)
      || UsersClient.isArrayFromUsers(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters)) {
      parametersCurrent = new GetRelationshipsWithParameters(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters);
    } else {
      parametersCurrent = userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters;
    }

    if (parametersCurrent.users == null || parametersCurrent.users.length === 0) {
      return new UserDictionary<IRelationshipState>();
    }

    let twitterResult = await this._usersRequester.getRelationshipsWithAsync(parametersCurrent); // .ConfigureAwait(false);
    let relationshipsWith = this._client.factories.createRelationshipStates(twitterResult?.model);

    let userRelationshipState = new UserDictionary<IRelationshipState>();

    for (let user of parametersCurrent.users) {
      let userRelationship: IRelationshipState = relationshipsWith.filter(x => x.targetId === user.id || x.targetScreenName.toLocaleLowerCase() === user.screenName.toLocaleLowerCase())[0];
      if (userRelationship != null) {
        userRelationshipState.addOrUpdate(user, userRelationship);
      }
    }

    return userRelationshipState;
  }

  // #endregion

  // #region MUTE

  public async getUserIdsWhoseRetweetsAreMutedAsync(parameters?: IGetUserIdsWhoseRetweetsAreMutedParameters): Promise<number[]> {
    let parametersCurrent: IGetUserIdsWhoseRetweetsAreMutedParameters;
    if (!parameters) {
      parametersCurrent = new GetUserIdsWhoseRetweetsAreMutedParameters();
    } else {
      parametersCurrent = parameters;
    }

    let twitterResult = await this._usersRequester.getUserIdsWhoseRetweetsAreMutedAsync(parametersCurrent); // .ConfigureAwait(false);
    return twitterResult?.model;
  }

  public async getMutedUserIdsAsync(parameters?: IGetMutedUserIdsParameters): Promise<number[]> {
    let parametersCurrent: IGetMutedUserIdsParameters;
    if (!parameters) {
      parametersCurrent = new GetMutedUserIdsParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this.getMutedUserIdsIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getMutedUserIdsIterator(parameters?: IGetMutedUserIdsParameters): ITwitterIterator<number> {
    let parametersCurrent: IGetMutedUserIdsParameters;
    if (!parameters) {
      parametersCurrent = new GetMutedUserIdsParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this._usersRequester.getMutedUserIdsIterator(parametersCurrent);
    return new TwitterIteratorProxy<ITwitterResult<IIdsCursorQueryResultDTO>, number>(iterator, dto => dto.model.ids);
  }

  public async getMutedUsersAsync(parameters?: IGetMutedUsersParameters): Promise<IUser[]> {
    let parametersCurrent: IGetMutedUsersParameters;
    if (!parameters) {
      parametersCurrent = new GetMutedUsersParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this.getMutedUsersIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getMutedUsersIterator(parameters?: IGetMutedUsersParameters): ITwitterIterator<IUser> {
    let parametersCurrent: IGetMutedUsersParameters;
    if (!parameters) {
      parametersCurrent = new GetMutedUsersParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this._usersRequester.getMutedUsersIterator(parametersCurrent);
    return new TwitterIteratorProxy<ITwitterResult<IUserCursorQueryResultDTO>, IUser>(iterator, pageResult => {
      let userDTOs = pageResult.model.users;
      return this._client.factories.createUsers(userDTOs);
    });
  }

  public async muteUserAsync(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IMuteUserParameters): Promise<IUser> {
    let parameters: IMuteUserParameters;
    if (UsersClient.isIMuteUserParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new MuteUserParameters(userIdOrUsernameOrUserOrParameters);
    }

    let twitterResult = await this._usersRequester.muteUserAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createUser(twitterResult?.model);
  }

  public async unmuteUserAsync(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IUnmuteUserParameters): Promise<IUser> {
    let parameters: IUnmuteUserParameters;
    if (UsersClient.isIMuteUserParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new UnmuteUserParameters(userIdOrUsernameOrUserOrParameters);
    }

    let twitterResult = await this._usersRequester.unmuteUserAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createUser(twitterResult?.model);
  }

  // #endregion

  // #region Profile Image

  public getProfileImageStreamAsync(urlOrUserOrUserDTOOrParameters: string | IUser | IUserDTO | IGetProfileImageParameters): Promise<Stream> {
    let parameters: IGetProfileImageParameters;
    if (UsersClient.isIGetProfileImageParameters(urlOrUserOrUserDTOOrParameters)) {
      parameters = urlOrUserOrUserDTOOrParameters;
    } else {
      parameters = new GetProfileImageParameters(urlOrUserOrUserDTOOrParameters);
    }

    return this._usersRequester.getProfileImageStream(parameters);
  }

  // #endregion

  private static isIGetUserParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetUserParameters):
    userIdOrUsernameOrUserOrParameters is IGetUserParameters {
    return (userIdOrUsernameOrUserOrParameters as IGetUserParameters).User !== undefined;
  }

  private static isIGetUsersParameters(userIdsOrUsernamesOrUsersOrParameters: | Array<number> | Array<string> | Array<IUserIdentifier> | IGetUsersParameters):
    userIdsOrUsernamesOrUsersOrParameters is IGetUsersParameters {
    return (userIdsOrUsernamesOrUsersOrParameters as IGetUsersParameters).Users !== undefined;
  }

  private static isIGetRelationshipBetweenParameters(sourceUserIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetRelationshipBetweenParameters):
    sourceUserIdOrUsernameOrUserOrParameters is IGetRelationshipBetweenParameters {
    return (sourceUserIdOrUsernameOrUserOrParameters as IGetRelationshipBetweenParameters).SourceUser !== undefined;
  }

  private static isIGetFriendIdsParameters(userIdOrUsernameOrUserOrParameter: number | string | IUserIdentifier | IGetFriendIdsParameters):
    userIdOrUsernameOrUserOrParameter is IGetFriendIdsParameters {
    return (userIdOrUsernameOrUserOrParameter as IGetFriendIdsParameters).User !== undefined;
  }

  private static isIGetFriendsParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetFriendsParameters):
    userIdOrUsernameOrUserOrParameters is IGetFriendsParameters {
    return (userIdOrUsernameOrUserOrParameters as IGetFriendsParameters).User !== undefined;
  }

  private static isIGetFollowerIdsParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetFollowerIdsParameters):
    userIdOrUsernameOrUserOrParameters is IGetFollowerIdsParameters {
    return (userIdOrUsernameOrUserOrParameters as IGetFollowerIdsParameters).User !== undefined;
  }

  private static isIGetFollowersParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetFollowersParameters):
    userIdOrUsernameOrUserOrParameters is IGetFollowersParameters {
    return (userIdOrUsernameOrUserOrParameters as IGetFollowersParameters).User !== undefined;
  }

  private static isIBlockUserParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IBlockUserParameters):
    userIdOrUsernameOrUserOrParameters is IBlockUserParameters {
    return (userIdOrUsernameOrUserOrParameters as IBlockUserParameters).user !== undefined;
  }

  private static isIUnblockUserParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IUnblockUserParameters):
    userIdOrUsernameOrUserOrParameters is IUnblockUserParameters {
    return (userIdOrUsernameOrUserOrParameters as IUnblockUserParameters).user !== undefined;
  }

  private static isIReportUserForSpamParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IReportUserForSpamParameters):
    userIdOrUsernameOrUserOrParameters is IReportUserForSpamParameters {
    return (userIdOrUsernameOrUserOrParameters as IReportUserForSpamParameters).user !== undefined;
  }

  private static isIFollowUserParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IFollowUserParameters):
    userIdOrUsernameOrUserOrParameters is IFollowUserParameters {
    return (userIdOrUsernameOrUserOrParameters as IFollowUserParameters).user !== undefined;
  }

  private static isIUnfollowUserParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IUnfollowUserParameters):
    userIdOrUsernameOrUserOrParameters is IUnfollowUserParameters {
    return (userIdOrUsernameOrUserOrParameters as IUnfollowUserParameters).user !== undefined;
  }

  private static isIMuteUserParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IMuteUserParameters):
    userIdOrUsernameOrUserOrParameters is IMuteUserParameters {
    return (userIdOrUsernameOrUserOrParameters as IMuteUserParameters).user !== undefined;
  }

  private static isIGetProfileImageParameters(urlOrUserOrUserDTOOrParameters: string | IUser | IUserDTO | IGetProfileImageParameters):
    urlOrUserOrUserDTOOrParameters is IGetProfileImageParameters {
    return (urlOrUserOrUserDTOOrParameters as IGetProfileImageParameters).imageUrl !== undefined;
  }

  private static isArrayFromNumber(userIdsOrUsernamesOrUsersOrParameters: any):
    userIdsOrUsernamesOrUsersOrParameters is Array<number> {
    return Type.isNumber((userIdsOrUsernamesOrUsersOrParameters as Array<number>)[0]);
  }

  private static isArrayFromString(userIdsOrUsernamesOrUsersOrParameters: any):
    userIdsOrUsernamesOrUsersOrParameters is Array<string> {
    return Type.isString((userIdsOrUsernamesOrUsersOrParameters as Array<string>)[0]);
  }

  private static isArrayFromUserIdentifier(userIdsOrUsernamesOrUsersOrParameters: any):
    userIdsOrUsernamesOrUsersOrParameters is Array<IUserIdentifier> {
    return (userIdsOrUsernamesOrUsersOrParameters as Array<IUserIdentifier>)[0].id !== undefined;
  }

  private static isArrayFromUsers(userIdsOrUsernamesOrUsersOrParameters: any):
    userIdsOrUsernamesOrUsersOrParameters is Array<IUser> {
    return (userIdsOrUsernamesOrUsersOrParameters as Array<IUser>)[0].id !== undefined;
  }
}

// 748
