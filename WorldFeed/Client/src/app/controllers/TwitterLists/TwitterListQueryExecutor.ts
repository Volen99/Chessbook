import Task from "src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task";
import {ITwitterResult} from 'src/app/core/Core/Web/TwitterResult';
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";

export interface ITwitterListQueryExecutor {
  // list
  CreateListAsync(parameters: ICreateListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  GetListAsync(parameters: IGetListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  GetListsSubscribedByUserAsync(parameters: IGetListsSubscribedByUserParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO[]>>

  UpdateListAsync(parameters: IUpdateListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  DestroyListAsync(parameters: IDestroyListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  GetListsOwnedByUserAsync(parameters: IGetListsOwnedByUserParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListCursorQueryResultDTO>>

  // **************
  // MEMBERS
  // **************
  AddMemberToListAsync(parameters: IAddMemberToListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  AddMembersToListAsync(parameters: IAddMembersToListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  GetUserListMembershipsAsync(parameters: IGetUserListMembershipsParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListCursorQueryResultDTO>>

  GetMembersOfListAsync(parameters: IGetMembersOfListParameters, request: ITwitterRequest): Task<ITwitterResult<IUserCursorQueryResultDTO>>

  CheckIfUserIsAListMemberAsync(parameters: ICheckIfUserIsMemberOfListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  RemoveMemberFromListAsync(parameters: IRemoveMemberFromListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  RemoveMembersFromListAsync(parameters: IRemoveMembersFromListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  // **************
  // SUBSCRIPTIONS
  // **************
  SubscribeToListAsync(parameters: ISubscribeToListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  UnsubscribeFromListAsync(parameters: IUnsubscribeFromListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  GetListSubscribersAsync(parameters: IGetListSubscribersParameters, request: ITwitterRequest): Task<ITwitterResult<IUserCursorQueryResultDTO>>

  GetUserListSubscriptionsAsync(parameters: IGetUserListSubscriptionsParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListCursorQueryResultDTO>>

  CheckIfUserIsSubscriberOfListAsync(parameters: ICheckIfUserIsSubscriberOfListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>

  // **************
  // TWEETS
  // **************
  GetTweetsFromListAsync(parameters: IGetTweetsFromListParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>>
}

export class TwitterListQueryExecutor implements ITwitterListQueryExecutor {
  private readonly _listsQueryGenerator: ITwitterListQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(listsQueryGenerator: ITwitterListQueryGenerator, twitterAccessor: ITwitterAccessor) {
    this._listsQueryGenerator = listsQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public CreateListAsync(parameters: ICreateListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetCreateListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return _twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
  }

  public GetListAsync(parameters: IGetListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetListQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public GetListsSubscribedByUserAsync(parameters: IGetListsSubscribedByUserParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO[]>> {
    request.query.url = this._listsQueryGenerator.GetListsSubscribedByUserQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO[]>(request);
  }

  public UpdateListAsync(parameters: IUpdateListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetUpdateListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public DestroyListAsync(parameters: IDestroyListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetDestroyListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public GetListsOwnedByUserAsync(parameters: IGetListsOwnedByUserParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    request.query.url = this._listsQueryGenerator.GetListsOwnedByUserQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListCursorQueryResultDTO>(request);
  }

  public AddMemberToListAsync(parameters: IAddMemberToListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetAddMemberToListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public AddMembersToListAsync(parameters: IAddMembersToListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetAddMembersQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public GetUserListMembershipsAsync(parameters: IGetUserListMembershipsParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    request.query.url = this._listsQueryGenerator.GetUserListMembershipsQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListCursorQueryResultDTO>(request);
  }

  public GetMembersOfListAsync(parameters: IGetMembersOfListParameters, request: ITwitterRequest): Task<ITwitterResult<IUserCursorQueryResultDTO>> {
    request.query.url = this._listsQueryGenerator.GetMembersOfListQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IUserCursorQueryResultDTO>(request);
  }

  public CheckIfUserIsAListMemberAsync(parameters: ICheckIfUserIsMemberOfListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetCheckIfUserIsMemberOfListQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public RemoveMemberFromListAsync(parameters: IRemoveMemberFromListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetRemoveMemberFromListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITwitterListDTO>(request);
  }

  public RemoveMembersFromListAsync(parameters: IRemoveMembersFromListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetRemoveMembersFromListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return _twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
  }

  public SubscribeToListAsync(parameters: ISubscribeToListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetSubscribeToListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return _twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
  }

  public UnsubscribeFromListAsync(parameters: IUnsubscribeFromListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetUnsubscribeFromListQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return _twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
  }

  public GetListSubscribersAsync(parameters: IGetListSubscribersParameters, request: ITwitterRequest): Task<ITwitterResult<IUserCursorQueryResultDTO>> {
    request.query.url = this._listsQueryGenerator.GetListSubscribersQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IUserCursorQueryResultDTO>(request);
  }

  public GetUserListSubscriptionsAsync(parameters: IGetUserListSubscriptionsParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListCursorQueryResultDTO>> {
    request.query.url = this._listsQueryGenerator.GetUserListSubscriptionsQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return _twitterAccessor.ExecuteRequestAsync<ITwitterListCursorQueryResultDTO>(request);
  }

  public CheckIfUserIsSubscriberOfListAsync(parameters: ICheckIfUserIsSubscriberOfListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>> {
    request.query.url = this._listsQueryGenerator.GetCheckIfUserIsSubscriberOfListQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return _twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
  }

  public GetTweetsFromListAsync(parameters: IGetTweetsFromListParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>> {
    request.query.url = this._listsQueryGenerator.GetTweetsFromListQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }
}
