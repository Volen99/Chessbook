import {BaseRequester} from "../BaseRequester";
import {IUsersRequester} from "../../../core/Public/Client/Requesters/IUsersRequester";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {IUserController} from "../../../core/Core/Controllers/IUserController";
import {IUsersClientRequiredParametersValidator} from "../../../core/Core/Client/Validators/UsersClientRequiredParametersValidator";
import {ITwitterClient} from "../../../core/Public/ITwitterClient";
import {IGetAuthenticatedUserParameters} from "../../../core/Public/Parameters/AccountClient/GetAuthenticatedUserParameters";
import {IUserDTO} from "../../../core/Public/Models/Interfaces/DTO/IUserDTO";
import {IGetUserParameters} from "../../../core/Public/Parameters/UsersClient/GetUserParameters";
import {IGetUsersParameters} from "../../../core/Public/Parameters/UsersClient/GetUsersParameters";
import {IGetFriendIdsParameters} from "../../../core/Public/Parameters/UsersClient/GetFriendIdsParameters";
import {IIdsCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {ITwitterPageIterator} from "../../../core/Core/Iterators/TwitterPageIterator";
import {IGetFollowerIdsParameters} from "../../../core/Public/Parameters/UsersClient/GetFollowerIdsParameters";
import {IGetRelationshipBetweenParameters} from "../../../core/Public/Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IRelationshipDetailsDTO} from "../../../core/Public/Models/Interfaces/DTO/IRelationshipDetailsDTO";
import {IFollowUserParameters} from "../../../core/Public/Parameters/AccountClient/FollowUserParameters";
import {IUpdateRelationshipParameters} from "../../../core/Public/Parameters/AccountClient/UpdateRelationshipParameters";
import {IUnfollowUserParameters} from "../../../core/Public/Parameters/AccountClient/UnfollowUserParameters";
import {IGetUserIdsRequestingFriendshipParameters} from "../../../core/Public/Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {IGetUserIdsYouRequestedToFollowParameters} from "../../../core/Public/Parameters/AccountClient/GetUserIdsYouRequestedToFollowParameters";
import {IBlockUserParameters} from "../../../core/Public/Parameters/AccountClient/BlockUserParameters";
import {IUnblockUserParameters} from "../../../core/Public/Parameters/AccountClient/UnblockUserParameters";
import {IReportUserForSpamParameters} from "../../../core/Public/Parameters/AccountClient/ReportUserForSpamParameters";
import {IGetBlockedUserIdsParameters} from "../../../core/Public/Parameters/AccountClient/GetBlockedUserIdsParameter";
import {IGetBlockedUsersParameters} from "../../../core/Public/Parameters/AccountClient/GetBlockedUsersParameter";
import {IUserCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {IGetRelationshipsWithParameters} from "../../../core/Public/Parameters/AccountClient/GetRelationshipsWithParameters";
import {IRelationshipStateDTO} from "../../../core/Public/Models/Interfaces/DTO/IRelationshipStateDTO";
import {IGetUserIdsWhoseRetweetsAreMutedParameters} from "../../../core/Public/Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {IGetMutedUserIdsParameters} from "../../../core/Public/Parameters/AccountClient/GetMutedUserIdsParameters";
import {IGetMutedUsersParameters} from "../../../core/Public/Parameters/AccountClient/GetMutedUsersParameters";
import {IMuteUserParameters} from "../../../core/Public/Parameters/AccountClient/MuteUserParameters";
import {IUnmuteUserParameters} from "../../../core/Public/Parameters/AccountClient/UnMuteUserParameters";
import {IGetProfileImageParameters} from "../../../core/Public/Parameters/UsersClient/GetProfileImageParameters";
import {Stream} from "stream";

export class UsersRequester extends BaseRequester implements IUsersRequester {
  private readonly _userController: IUserController;
  private readonly _validator: IUsersClientRequiredParametersValidator;

  constructor(client: ITwitterClient, clientEvents: ITwitterClientEvents, userController: IUserController,
              validator: IUsersClientRequiredParametersValidator) {
    super(client, clientEvents);

    this._userController = userController;
    this._validator = validator;
  }

  public getAuthenticatedUserAsync(parameters: IGetAuthenticatedUserParameters): Promise<ITwitterResult<IUserDTO>> {
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    return super.ExecuteRequestAsync(() => this._userController.getAuthenticatedUserAsync(parameters, request), request);
  }

  public getUserAsync(parameters: IGetUserParameters): Promise<ITwitterResult<IUserDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.getUserAsync(parameters, request));
  }

  public getUsersAsync(parameters: IGetUsersParameters): Promise<ITwitterResult<IUserDTO[]>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.getUsersAsync(parameters, request));
  }

  public getFriendIdsIterator(parameters: IGetFriendIdsParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    request.executionContext.Converters = JsonQueryConverterRepository.Converters;
    return this._userController.getFriendIdsIterator(parameters, request);
  }

  public getFollowerIdsIterator(parameters: IGetFollowerIdsParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    request.executionContext.Converters = JsonQueryConverterRepository.Converters;
    return this._userController.getFollowerIdsIterator(parameters, request);
  }

  public getRelationshipBetweenAsync(parameters: IGetRelationshipBetweenParameters): Promise<ITwitterResult<IRelationshipDetailsDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.getRelationshipBetweenAsync(parameters, request));
  }

  // FOLLOWERS
  public followUserAsync(parameters: IFollowUserParameters): Promise<ITwitterResult<IUserDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.followUserAsync(parameters, request));
  }

  public updateRelationshipAsync(parameters: IUpdateRelationshipParameters): Promise<ITwitterResult<IRelationshipDetailsDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.updateRelationshipAsync(parameters, request));
  }

  public unfollowUserAsync(parameters: IUnfollowUserParameters): Promise<ITwitterResult<IUserDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.unfollowUserAsync(parameters, request));
  }

  public getUserIdsRequestingFriendshipIterator(parameters: IGetUserIdsRequestingFriendshipParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    request.executionContext.Converters = JsonQueryConverterRepository.Converters;
    return this._userController.getUserIdsRequestingFriendshipIterator(parameters, request);
  }

  public getUserIdsYouRequestedToFollowIterator(parameters: IGetUserIdsYouRequestedToFollowParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    request.executionContext.Converters = JsonQueryConverterRepository.Converters;
    return this._userController.getUserIdsYouRequestedToFollowIterator(parameters, request);
  }

  // BLOCK
  public blockUserAsync(parameters: IBlockUserParameters): Promise<ITwitterResult<IUserDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.blockUserAsync(parameters, request));
  }

  public unblockUserAsync(parameters: IUnblockUserParameters): Promise<ITwitterResult<IUserDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.unblockUserAsync(parameters, request));
  }

  public reportUserForSpamAsync(parameters: IReportUserForSpamParameters): Promise<ITwitterResult<IUserDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.reportUserForSpamAsync(parameters, request));
  }

  public getBlockedUserIdsIterator(parameters: IGetBlockedUserIdsParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    request.executionContext.Converters = JsonQueryConverterRepository.Converters;
    return this._userController.getBlockedUserIdsIterator(parameters, request);
  }

  public getBlockedUsersIterator(parameters: IGetBlockedUsersParameters): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    request.executionContext.Converters = JsonQueryConverterRepository.Converters;
    return this._userController.getBlockedUsersIterator(parameters, request);
  }

  // FRIENDSHIPS
  public getRelationshipsWithAsync(parameters: IGetRelationshipsWithParameters): Promise<ITwitterResult<IRelationshipStateDTO[]>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.getRelationshipsWithAsync(parameters, request));
  }

  // MUTE
  public getUserIdsWhoseRetweetsAreMutedAsync(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters): Promise<ITwitterResult<number[]>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.getUserIdsWhoseRetweetsAreMutedAsync(parameters, request));
  }

  public getMutedUserIdsIterator(parameters: IGetMutedUserIdsParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    request.executionContext.Converters = JsonQueryConverterRepository.Converters;
    return this._userController.getMutedUserIdsIterator(parameters, request);
  }

  public getMutedUsersIterator(parameters: IGetMutedUsersParameters): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> {
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    request.executionContext.Converters = JsonQueryConverterRepository.Converters;
    return this._userController.getMutedUsersIterator(parameters, request);
  }

  public muteUserAsync(parameters: IMuteUserParameters): Promise<ITwitterResult<IUserDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.muteUserAsync(parameters, request));
  }

  public unmuteUserAsync(parameters: IUnmuteUserParameters): Promise<ITwitterResult<IUserDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.unmuteUserAsync(parameters, request));
  }

  public getProfileImageStream(parameters: IGetProfileImageParameters): Promise<Stream> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._userController.getProfileImageStreamAsync(parameters, request));
  }
}
