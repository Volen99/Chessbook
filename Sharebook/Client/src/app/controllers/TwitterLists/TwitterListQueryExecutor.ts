import {ITwitterResult} from 'src/app/core/Core/Web/TwitterResult';
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {ICreateListParameters} from "../../core/Public/Parameters/ListsClient/CreateListParameters";
import {IGetListParameters} from "../../core/Public/Parameters/ListsClient/GetListParameters";
import {IGetListsSubscribedByUserParameters} from "../../core/Public/Parameters/ListsClient/GetListsSubscribedByUserParameters";
import {IUpdateListParameters} from "../../core/Public/Parameters/ListsClient/UpdateListParameters";
import {IDestroyListParameters} from "../../core/Public/Parameters/ListsClient/DestroyListParameters";
import {IGetListsOwnedByUserParameters} from "../../core/Public/Parameters/ListsClient/GetListsOwnedByUserParameters";
import {IAddMemberToListParameters} from "../../core/Public/Parameters/ListsClient/Members/AddMemberToListParameters";
import {IAddMembersToListParameters} from "../../core/Public/Parameters/ListsClient/Members/AddMembersToListParameters";
import {IGetUserListMembershipsParameters} from "../../core/Public/Parameters/ListsClient/Members/GetUserListMembershipsParameters";
import {IGetMembersOfListParameters} from "../../core/Public/Parameters/ListsClient/Members/GetMembersOfListParameters";
import {ICheckIfUserIsMemberOfListParameters} from "../../core/Public/Parameters/ListsClient/Members/CheckIfUserIsMemberOfListParameters";
import {IRemoveMemberFromListParameters} from "../../core/Public/Parameters/ListsClient/Members/RemoveMemberFromListParameters";
import {IRemoveMembersFromListParameters} from "../../core/Public/Parameters/ListsClient/Members/RemoveMembersFromListParameters";
import {ITwitterListDTO} from "../../core/Public/Models/Interfaces/DTO/ITwitterListDTO";
import {IUserCursorQueryResultDTO} from "../../core/Public/Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {ITwitterListCursorQueryResultDTO} from "../../core/Public/Models/Interfaces/DTO/QueryDTO/ITwitterListCursorQueryResultDTO";
import {ISubscribeToListParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/SubscribeToListParameters";
import {IUnsubscribeFromListParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/UnsubscribeFromListParameters";
import {IGetListSubscribersParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/GetListSubscribersParameters";
import {IGetUserListSubscriptionsParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/GetUserListSubscriptionsParameters";
import {ICheckIfUserIsSubscriberOfListParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/CheckIfUserIsSubscriberOfListParameters";
import {IGetTweetsFromListParameters} from "../../core/Public/Parameters/ListsClient/GetTweetsFromListParameters";
import {ITweetDTO} from "../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import {ITwitterListQueryGenerator} from "./TwitterListQueryGenerator";

export interface ITwitterListQueryExecutor {
  // list
  createListAsync(parameters: ICreateListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  getListAsync(parameters: IGetListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  getListsSubscribedByUserAsync(parameters: IGetListsSubscribedByUserParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO[]>>;

  updateListAsync(parameters: IUpdateListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  destroyListAsync(parameters: IDestroyListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  getListsOwnedByUserAsync(parameters: IGetListsOwnedByUserParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  // **************
  // MEMBERS
  // **************
  addMemberToListAsync(parameters: IAddMemberToListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  addMembersToListAsync(parameters: IAddMembersToListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  getUserListMembershipsAsync(parameters: IGetUserListMembershipsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  getMembersOfListAsync(parameters: IGetMembersOfListParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserCursorQueryResultDTO>>;

  checkIfUserIsAListMemberAsync(parameters: ICheckIfUserIsMemberOfListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  removeMemberFromListAsync(parameters: IRemoveMemberFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  removeMembersFromListAsync(parameters: IRemoveMembersFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  // **************
  // SUBSCRIPTIONS
  // **************
  subscribeToListAsync(parameters: ISubscribeToListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  unsubscribeFromListAsync(parameters: IUnsubscribeFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  getListSubscribersAsync(parameters: IGetListSubscribersParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserCursorQueryResultDTO>>;

  getUserListSubscriptionsAsync(parameters: IGetUserListSubscriptionsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListCursorQueryResultDTO>>;

  checkIfUserIsSubscriberOfListAsync(parameters: ICheckIfUserIsSubscriberOfListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>>;

  // **************
  // TWEETS
  // **************
  getTweetsFromListAsync(parameters: IGetTweetsFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>>;
}

export class TwitterListQueryExecutor implements ITwitterListQueryExecutor {
  private readonly _listsQueryGenerator: ITwitterListQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(listsQueryGenerator: ITwitterListQueryGenerator, twitterAccessor: ITwitterAccessor) {
    this._listsQueryGenerator = listsQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public createListAsync(parameters: ICreateListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getCreateListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public getListAsync(parameters: IGetListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getListQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public getListsSubscribedByUserAsync(parameters: IGetListsSubscribedByUserParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO[]>> {
    request.query.url = this._listsQueryGenerator.getListsSubscribedByUserQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO[]>(request);
  }

  public updateListAsync(parameters: IUpdateListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getUpdateListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public destroyListAsync(parameters: IDestroyListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getDestroyListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public getListsOwnedByUserAsync(parameters: IGetListsOwnedByUserParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    request.query.url = this._listsQueryGenerator.getListsOwnedByUserQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListCursorQueryResultDTO>(request);
  }

  public addMemberToListAsync(parameters: IAddMemberToListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getAddMemberToListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public addMembersToListAsync(parameters: IAddMembersToListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getAddMembersQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public getUserListMembershipsAsync(parameters: IGetUserListMembershipsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    request.query.url = this._listsQueryGenerator.getUserListMembershipsQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListCursorQueryResultDTO>(request);
  }

  public getMembersOfListAsync(parameters: IGetMembersOfListParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserCursorQueryResultDTO>> {
    request.query.url = this._listsQueryGenerator.getMembersOfListQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IUserCursorQueryResultDTO>(request);
  }

  public checkIfUserIsAListMemberAsync(parameters: ICheckIfUserIsMemberOfListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getCheckIfUserIsMemberOfListQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public removeMemberFromListAsync(parameters: IRemoveMemberFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getRemoveMemberFromListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public removeMembersFromListAsync(parameters: IRemoveMembersFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getRemoveMembersFromListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public subscribeToListAsync(parameters: ISubscribeToListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getSubscribeToListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public unsubscribeFromListAsync(parameters: IUnsubscribeFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getUnsubscribeFromListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public getListSubscribersAsync(parameters: IGetListSubscribersParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserCursorQueryResultDTO>> {
    request.query.url = this._listsQueryGenerator.getListSubscribersQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IUserCursorQueryResultDTO>(request);
  }

  public getUserListSubscriptionsAsync(parameters: IGetUserListSubscriptionsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    request.query.url = this._listsQueryGenerator.getUserListSubscriptionsQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListCursorQueryResultDTO>(request);
  }

  public checkIfUserIsSubscriberOfListAsync(parameters: ICheckIfUserIsSubscriberOfListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.getCheckIfUserIsSubscriberOfListQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public getTweetsFromListAsync(parameters: IGetTweetsFromListParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
    request.query.url = this._listsQueryGenerator.getTweetsFromListQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }
}
