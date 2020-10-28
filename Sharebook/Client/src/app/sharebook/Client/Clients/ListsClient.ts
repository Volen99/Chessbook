import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import IEnumerable from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable';
import {IUserIdentifier} from "../../../core/Public/Models/Interfaces/IUserIdentifier";
import {ITwitterListIdentifier} from 'src/app/core/Public/Models/Interfaces/ITwitterListIdentifier';
import {IListsClient} from 'src/app/core/Public/Client/Clients/IListsClient';
import {PrivacyMode} from "../../../core/Public/Models/Enum/PrivacyMode";
import {ITwitterListsRequester, ITwitterListsRequesterToken} from "../../../core/Public/Client/Requesters/ITwitterListsRequester";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {ITwitterListsClientParametersValidator} from "../../../core/Core/Client/Validators/TwitterListsClientParametersValidator";
import {ITwitterList} from "../../../core/Public/Models/Interfaces/ITwitterList";
import {CreateListParameters, ICreateListParameters} from "../../../core/Public/Parameters/ListsClient/CreateListParameters";
import {GetListParameters, IGetListParameters} from "../../../core/Public/Parameters/ListsClient/GetListParameters";
import {
  GetListsSubscribedByAccountParameters,
  IGetListsSubscribedByAccountParameters
} from "../../../core/Public/Parameters/ListsClient/GetListsSubscribedByAccountParameters";
import {
  GetListsSubscribedByUserParameters,
  IGetListsSubscribedByUserParameters
} from "../../../core/Public/Parameters/ListsClient/GetListsSubscribedByUserParameters";
import {IUpdateListParameters} from "../../../core/Public/Parameters/ListsClient/UpdateListParameters";
import {DestroyListParameters, IDestroyListParameters} from "../../../core/Public/Parameters/ListsClient/DestroyListParameters";
import {
  GetListsOwnedByAccountParameters,
  IGetListsOwnedByAccountParameters
} from "../../../core/Public/Parameters/ListsClient/GetListsOwnedByAccountParameters";
import { ITwitterIterator } from 'src/app/core/Public/Iterators/ITwitterIterator';
import {ITwitterListCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/ITwitterListCursorQueryResultDTO";
import {TwitterIteratorProxy} from "../../../core/Core/Iterators/TwitterIteratorProxy";
import {
  GetListsOwnedByAccountByUserParameters,
  IGetListsOwnedByUserParameters
} from "../../../core/Public/Parameters/ListsClient/GetListsOwnedByUserParameters";
import {IUser} from "../../../core/Public/Models/Interfaces/IUser";
import {TwitterListIdentifier} from "../../../core/Public/Models/TwitterListIdentifier";
import {
  AddMemberToListParameters,
  IAddMemberToListParameters
} from "../../../core/Public/Parameters/ListsClient/Members/AddMemberToListParameters";
import {
  AddMembersToListParameters,
  IAddMembersToListParameters
} from "../../../core/Public/Parameters/ListsClient/Members/AddMembersToListParameters";
import {
  GetAccountListMembershipsParameters,
  IGetAccountListMembershipsParameters
} from "../../../core/Public/Parameters/ListsClient/Members/GetAccountListMembershipsParameters";
import {
  GetUserListMembershipsParameters,
  IGetUserListMembershipsParameters
} from "../../../core/Public/Parameters/ListsClient/Members/GetUserListMembershipsParameters";
import {
  GetMembersOfListParameters,
  IGetMembersOfListParameters
} from "../../../core/Public/Parameters/ListsClient/Members/GetMembersOfListParameters";
import {IUserCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {
  CheckIfUserIsMemberOfListParameters,
  ICheckIfUserIsMemberOfListParameters
} from "../../../core/Public/Parameters/ListsClient/Members/CheckIfUserIsMemberOfListParameters";
import {
  IRemoveMemberFromListParameters,
  RemoveMemberFromListParameters
} from "../../../core/Public/Parameters/ListsClient/Members/RemoveMemberFromListParameters";
import {
  IRemoveMembersFromListParameters,
  RemoveMembersFromListParameters
} from "../../../core/Public/Parameters/ListsClient/Members/RemoveMembersFromListParameters";
import {
  ISubscribeToListParameters,
  SubscribeToListParameters
} from "../../../core/Public/Parameters/ListsClient/Subscribers/SubscribeToListParameters";
import {
  IUnsubscribeFromListParameters,
  UnsubscribeFromListParameters
} from "../../../core/Public/Parameters/ListsClient/Subscribers/UnsubscribeFromListParameters";
import {
  GetListSubscribersParameters,
  IGetListSubscribersParameters
} from "../../../core/Public/Parameters/ListsClient/Subscribers/GetListSubscribersParameters";
import {
  GetAccountListSubscriptionsParameters,
  IGetAccountListSubscriptionsParameters
} from "../../../core/Public/Parameters/ListsClient/Subscribers/GetAccountListSubscriptionsParameters";
import {
  GetUserListSubscriptionsParameters,
  IGetUserListSubscriptionsParameters
} from "../../../core/Public/Parameters/ListsClient/Subscribers/GetUserListSubscriptionsParameters";
import {
  CheckIfUserIsSubscriberOfListParameters,
  ICheckIfUserIsSubscriberOfListParameters
} from "../../../core/Public/Parameters/ListsClient/Subscribers/CheckIfUserIsSubscriberOfListParameters";
import {
  GetTweetsFromListParameters,
  IGetTweetsFromListParameters
} from "../../../core/Public/Parameters/ListsClient/GetTweetsFromListParameters";
import {ITweet} from "../../../core/Public/Models/Interfaces/ITweet";
import {TwitterListParameters} from "../../../core/Core/Client/Validators/parameters-types";
import {ITweetDTO} from "../../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import Type from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";
import {TwitterException} from "../../../core/Public/Exceptions/TwitterException";
import {IGetUserFavoriteTweetsParameters} from "../../../core/Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class ListsClient implements IListsClient {
  private readonly _twitterListsRequester: ITwitterListsRequester;
  private readonly _client: ITwitterClient;

  constructor(@Inject(ITwitterListsRequesterToken) twitterListsRequester: ITwitterListsRequester,
              @Inject(ITwitterClientToken) client: ITwitterClient) {
    this._twitterListsRequester = twitterListsRequester;
    this._client = client;
  }

  get parametersValidator(): ITwitterListsClientParametersValidator {
    return this._client.parametersValidator;
  }

  public async createListAsync(nameOrParameters: string | ICreateListParameters, privacyMode?: PrivacyMode): Promise<ITwitterList> {
    let parameters: ICreateListParameters;
    if (this.isICreateListParameters(nameOrParameters)) {
      parameters = nameOrParameters;
    } else {
      parameters = new CreateListParameters(nameOrParameters);
      if (privacyMode) {
        parameters.privacyMode = privacyMode;
      }
    }

    let twitterResult = await this._twitterListsRequester.createListAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTwitterList(twitterResult?.model);
  }

  public async getListAsync(listIdOrSlugOrListIdentifierOrParameters: number | string
    | ITwitterListIdentifier | IGetListParameters, user?: IUserIdentifier): Promise<ITwitterList> {
    let parameters: IGetListParameters;
    if (this.isIGetListParameters(listIdOrSlugOrListIdentifierOrParameters)) {
      parameters = listIdOrSlugOrListIdentifierOrParameters;
    } else {
      if (!user) {
        parameters = new GetListParameters(listIdOrSlugOrListIdentifierOrParameters);
      } else {
        parameters = new GetListParameters(listIdOrSlugOrListIdentifierOrParameters, user);
      }
    }

    let twitterResult = await this._twitterListsRequester.getListAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTwitterList(twitterResult?.model);
  }
  public getListsSubscribedByAccountAsync(parameters?: IGetListsSubscribedByAccountParameters): Promise<ITwitterList[]> {
    let parametersCurrent: IGetListsSubscribedByAccountParameters;
    if (!parameters) {
      parametersCurrent = new GetListsSubscribedByUserParameters();
    } else {
      parametersCurrent = parameters;
    }

    return this.getListsSubscribedByUserAsync(new GetListsSubscribedByUserParameters(parametersCurrent));
  }

  public async getListsSubscribedByUserAsync(userIdOrUsernameOrUserIdentifierOrParameters: number | string
  | IUserIdentifier | IGetListsSubscribedByUserParameters): Promise<ITwitterList[]> {
    let parameters: IGetListsSubscribedByUserParameters;
    if (this.isIGetListsSubscribedByUserParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      parameters = userIdOrUsernameOrUserIdentifierOrParameters;
    } else {
      parameters = new GetListsSubscribedByUserParameters(userIdOrUsernameOrUserIdentifierOrParameters);
    }

    let twitterResult = await this._twitterListsRequester.getListsSubscribedByUserAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTwitterLists(twitterResult?.model);
  }

  public async updateListAsync(parameters: IUpdateListParameters): Promise<ITwitterList> {
    let twitterResult = await this._twitterListsRequester.updateListAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTwitterList(twitterResult?.model);
  }

  public async destroyListAsync(listIdOrSlugOrListIdentifierOrParameters: number | string
    | ITwitterListIdentifier | IDestroyListParameters, user?: IUserIdentifier): Promise<ITwitterList> {
    let parameters: IDestroyListParameters;
    if (this.isIDestroyListParameters(listIdOrSlugOrListIdentifierOrParameters)) {
      parameters = listIdOrSlugOrListIdentifierOrParameters;
    } else {
      if (!user) {
        parameters = new DestroyListParameters(listIdOrSlugOrListIdentifierOrParameters);
      } else {
        parameters = new DestroyListParameters(listIdOrSlugOrListIdentifierOrParameters, user);
      }
    }

    let twitterResult = await this._twitterListsRequester.destroyListAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTwitterList(twitterResult?.model);
  }

  public async getListsOwnedByAccountAsync(parameters?: IGetListsOwnedByAccountParameters): Promise<ITwitterList[]> {
    let parametersCurrent: IGetListsOwnedByAccountParameters;
    if (!parameters) {
      parametersCurrent = new GetListsOwnedByAccountParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this.getListsOwnedByAccountIterator(parametersCurrent);
    return (await iterator.nextPageAsync()); // .ConfigureAwait(false)).ToArray();
  }


  public getListsOwnedByAccountIterator(parameters?: IGetListsOwnedByAccountParameters): ITwitterIterator<ITwitterList> {
    let parametersCurrent: IGetListsOwnedByAccountParameters;
    if (!parameters) {
      parametersCurrent = new GetListsOwnedByAccountParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this._twitterListsRequester.getListsOwnedByAccountIterator(parametersCurrent);
    return new TwitterIteratorProxy<ITwitterResult<ITwitterListCursorQueryResultDTO>, ITwitterList>(iterator, pageResult => {
      let listDtos = pageResult?.model?.TwitterLists;
      return listDtos?.map(dto => this._client.factories.createTwitterList(dto)); // .ToArray();
    });
  }

  public async getListsOwnedByUserAsync(userIdOrUsernameOrUserIdentifierOrParameters: number | string
  | IUserIdentifier | IGetListsOwnedByUserParameters): Promise<ITwitterList[]> {
    let parameters: IGetListsOwnedByUserParameters;
    if (this.isIGetListsOwnedByUserParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      parameters = userIdOrUsernameOrUserIdentifierOrParameters;
    } else {
      parameters = new GetListsOwnedByAccountByUserParameters(userIdOrUsernameOrUserIdentifierOrParameters);
    }

    let iterator = this.getListsOwnedByUserIterator(parameters);
    return (await iterator.nextPageAsync()); // .ConfigureAwait(false)).ToArray();
  }

  public getListsOwnedByUserIterator(userIdOrUsernameOrUserOrParameters: number | string
    | IUser | IGetListsOwnedByUserParameters): ITwitterIterator<ITwitterList> {
    let parameters: IGetListsOwnedByUserParameters;
    if (this.isIGetListsOwnedByUserParameters(userIdOrUsernameOrUserOrParameters)) {
      parameters = userIdOrUsernameOrUserOrParameters;
    } else {
      parameters = new GetListsOwnedByAccountByUserParameters(userIdOrUsernameOrUserOrParameters);
    }

    let iterator = this._twitterListsRequester.getListsOwnedByUserIterator(parameters);
    return new TwitterIteratorProxy<ITwitterResult<ITwitterListCursorQueryResultDTO>, ITwitterList>(iterator, pageResult => {
      let listDtos = pageResult?.model?.TwitterLists;
      return listDtos?.map(dto => this._client.factories.createTwitterList(dto)); // .ToArray();
    });
  }

  public async addMemberToListAsync(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier
    | IAddMemberToListParameters, userIdOrUsernameOrUserIdentifier?: number | string
    | IUserIdentifier): Promise<ITwitterList> {
    let parameters: IAddMemberToListParameters;
    if (this.isIAddMemberToListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      let list: ITwitterListIdentifier;
      if (Type.isNumber(listIdOrListIdentifierOrParameters)) {
        list = new TwitterListIdentifier(listIdOrListIdentifierOrParameters);
      } else {
        list = listIdOrListIdentifierOrParameters as ITwitterListIdentifier;
      }

      parameters = new AddMemberToListParameters(list, userIdOrUsernameOrUserIdentifier);
    }

    let twitterResult = await this._twitterListsRequester.addMemberToListAsync(parameters); // .ConfigureAwait(false);
    return twitterResult?.result;
  }

  public async addMembersToListAsync(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier | IAddMembersToListParameters,
                                     userIdsOrUsernamesOrUserIdentifiers: Array<number | string | IUserIdentifier>): Promise<ITwitterList> {
    let parameters: IAddMembersToListParameters;
    if (this.isIAddMembersToListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new AddMembersToListParameters(listIdOrListIdentifierOrParameters, userIdsOrUsernamesOrUserIdentifiers);
    }

    let twitterResult = await this._twitterListsRequester.addMembersToListAsync(parameters); // .ConfigureAwait(false);
    return twitterResult?.result;
  }

  public async getAccountListMembershipsAsync(parameters?: IGetAccountListMembershipsParameters):  Promise<ITwitterList[]> {
    let parametersCurrent: IGetAccountListMembershipsParameters;
    if (!parameters) {
      parametersCurrent = new GetAccountListMembershipsParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this.getAccountListMembershipsIterator(parametersCurrent);
    return (await iterator.nextPageAsync()); //.ConfigureAwait(false)).ToArray();
  }

  public getAccountListMembershipsIterator(parameters?: IGetAccountListMembershipsParameters): ITwitterIterator<ITwitterList> {
    let parametersCurrent: IGetAccountListMembershipsParameters;
    if (!parameters) {
      parametersCurrent = new GetAccountListMembershipsParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this._twitterListsRequester.getAccountListMembershipsIterator(parametersCurrent);
    return new TwitterIteratorProxy<ITwitterResult<ITwitterListCursorQueryResultDTO>, ITwitterList>(iterator, pageResult => {
      let listDtos = pageResult.model.twitterLists;
      return listDtos?.map(dto => this._client.factories.createTwitterList(dto)); // .ToArray();
    });
  }

  public async getUserListMembershipsAsync(userIdOrUsernameOrUserIdentifierOrParameters: number | string
  | IUserIdentifier |IGetUserListMembershipsParameters): Promise<ITwitterList[]> {
    let parameters: IGetUserListMembershipsParameters;
    if (this.isIGetUserListMembershipsParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      parameters = userIdOrUsernameOrUserIdentifierOrParameters;
    } else {
      parameters = new GetUserListMembershipsParameters(userIdOrUsernameOrUserIdentifierOrParameters);
    }

    let iterator = this.getUserListMembershipsIterator(parameters);
    return (await iterator.nextPageAsync()); // .ConfigureAwait(false)).ToArray();
  }
  public getUserListMembershipsIterator(userIdOrUsernameOrUserIdentifierOrParameters: number | string
    | IUserIdentifier |IGetUserListMembershipsParameters): ITwitterIterator<ITwitterList> {
    let parameters: IGetUserListMembershipsParameters;
    if (this.isIGetUserListMembershipsParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      parameters = userIdOrUsernameOrUserIdentifierOrParameters;
    } else {
      parameters = new GetUserListMembershipsParameters(userIdOrUsernameOrUserIdentifierOrParameters);
    }

    let iterator = this._twitterListsRequester.getUserListMembershipsIterator(parameters);
    return new TwitterIteratorProxy<ITwitterResult<ITwitterListCursorQueryResultDTO>, ITwitterList>(iterator, pageResult => {
      let listDtos = pageResult.model.twitterLists;
      return listDtos?.map(dto => this._client.factories.createTwitterList(dto)); // .ToArray();
    });
  }

  public async getMembersOfListAsync(listIdOrListIdentifierOrParameters: number
    | ITwitterListIdentifier | IGetMembersOfListParameters): Promise<IUser[]> {
    let parameters: IGetMembersOfListParameters;
    if (this.isIGetMembersOfListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new GetMembersOfListParameters(listIdOrListIdentifierOrParameters);
    }

    let iterator = this.getMembersOfListIterator(parameters);
    return (await iterator.nextPageAsync()); // .ConfigureAwait(false)).ToArray();
  }

  public getMembersOfListIterator(listIdOrListIdentifierOrParameters: number
    | ITwitterListIdentifier | IGetMembersOfListParameters): ITwitterIterator<IUser> {
    let parameters: IGetMembersOfListParameters;
    if (this.isIGetMembersOfListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new GetMembersOfListParameters(listIdOrListIdentifierOrParameters);
    }

    let iterator = this._twitterListsRequester.getMembersOfListIterator(parameters);
    return new TwitterIteratorProxy<ITwitterResult<IUserCursorQueryResultDTO>, IUser>(iterator, pageResult => {
      return this._client.factories.createUsers(pageResult?.model?.Users);
    });
  }

  public async checkIfUserIsMemberOfListAsync(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier | ICheckIfUserIsMemberOfListParameters,
                                              userIdOrUsernameOrUserIdentifier?: number | string | IUserIdentifier): Promise<boolean> {
    let parameters: ICheckIfUserIsMemberOfListParameters;
    if (this.isICheckIfUserIsMemberOfListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new CheckIfUserIsMemberOfListParameters(listIdOrListIdentifierOrParameters, userIdOrUsernameOrUserIdentifier);
    }
    try {
      await this._twitterListsRequester.checkIfUserIsAListMemberAsync(parameters); // .ConfigureAwait(false);
      return true;
    } catch (e: TwitterException) {
      if (e.statusCode === 404) {
        // This is a special case where the request actually throws expectedly
        // When a user is not a member of a list this operation returns a 404.
        return false;
      }

      throw;
    }
  }
  public async removeMemberFromListAsync(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier | IRemoveMemberFromListParameters,
                                         userIdOrUsernameOrUserIdentifier?: number | string | IUserIdentifier): Promise<ITwitterList> {
    let parameters: IRemoveMemberFromListParameters;
    if (this.isIRemoveMemberFromListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new RemoveMemberFromListParameters(listIdOrListIdentifierOrParameters, userIdOrUsernameOrUserIdentifier);
    }

    let twitterResult = await this._twitterListsRequester.removeMemberFromListAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTwitterList(twitterResult?.model);
  }

  public async removeMembersFromListAsync(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier | IRemoveMembersFromListParameters,
                                          userIdsOrUsernamesOrUserIdentifiers: Array<number>): Promise<ITwitterList> {
    let parameters: IRemoveMembersFromListParameters;
    if (this.isIRemoveMembersFromListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new RemoveMembersFromListParameters(listIdOrListIdentifierOrParameters, userIdsOrUsernamesOrUserIdentifiers);
    }

    let twitterResult = await this._twitterListsRequester.removeMembersFromListAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTwitterList(twitterResult?.model);
  }

  // ***********
  // SUBSCRIBERS
  // ***********

  public async subscribeToListAsync(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier | ISubscribeToListParameters): Promise<ITwitterList> {
    let parameters: ISubscribeToListParameters;
    if (this.isISubscribeToListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new SubscribeToListParameters(listIdOrListIdentifierOrParameters);
    }

    let twitterResult = await this._twitterListsRequester.subscribeToListAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTwitterList(twitterResult?.model);
  }

  public async unsubscribeFromListAsync(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier | IUnsubscribeFromListParameters): Promise<ITwitterList> {
    let parameters: IUnsubscribeFromListParameters;
    if (this.isIUnsubscribeFromListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new UnsubscribeFromListParameters(listIdOrListIdentifierOrParameters);
    }

    let twitterResult = await this._twitterListsRequester.unsubscribeFromListAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createTwitterList(twitterResult?.model);
  }

  public async getListSubscribersAsync(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier | IGetListSubscribersParameters): Promise<IUser[]> {
    let parameters: IGetListSubscribersParameters;
    if (this.isIGetListSubscribersParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new GetListSubscribersParameters(listIdOrListIdentifierOrParameters);
    }

    let iterator = this.getListSubscribersIterator(parameters);
    return (await iterator.nextPageAsync());
  }

  public getListSubscribersIterator(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier | IGetListSubscribersParameters): ITwitterIterator<IUser> {
    let parameters: IGetListSubscribersParameters;
    if (this.isIGetListSubscribersParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new GetListSubscribersParameters(listIdOrListIdentifierOrParameters);
    }

    let pageIterator = this._twitterListsRequester.getListSubscribersIterator(parameters);
    return new TwitterIteratorProxy<ITwitterResult<IUserCursorQueryResultDTO>, IUser>(pageIterator, pageResult => {
      return this._client.factories.createUsers(pageResult?.model?.Users);
    });
  }

  public async getAccountListSubscriptionsAsync(parameters?: IGetAccountListSubscriptionsParameters): Promise<ITwitterList[]> {
    let iterator: ITwitterIterator<ITwitterList>;
    if (!parameters) {
      iterator = this.getAccountListSubscriptionsIterator();
    } else {
      iterator = this.getAccountListSubscriptionsIterator(parameters);
    }

    return (await iterator.nextPageAsync()); // .ConfigureAwait(false)).ToArray();
  }
  public getAccountListSubscriptionsIterator(parameters?: IGetAccountListSubscriptionsParameters): ITwitterIterator<ITwitterList> {
    let parametersCurrent: IGetAccountListSubscriptionsParameters;
    if (!parameters) {
      parametersCurrent = new GetAccountListSubscriptionsParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this._twitterListsRequester.getAccountListSubscriptionsIterator(parametersCurrent);
    return new TwitterIteratorProxy<ITwitterResult<ITwitterListCursorQueryResultDTO>, ITwitterList>(iterator, pageResult => {
      let listDtos = pageResult.model.twitterLists;
      return listDtos?.map(dto => this._client.factories.createTwitterList(dto)); // .ToArray();
    });
  }

  public async getUserListSubscriptionsAsync(userIdOrUsernameOrUserIdentifierOrParameters: number | string
    | IUserIdentifier | IGetUserListSubscriptionsParameters): Promise<ITwitterList[]> {
    let parameters: IGetUserListSubscriptionsParameters;
    if (this.isIGetUserListSubscriptionsParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      parameters = userIdOrUsernameOrUserIdentifierOrParameters;
    } else {
      parameters = new GetUserListSubscriptionsParameters(userIdOrUsernameOrUserIdentifierOrParameters);
    }

    let iterator = this.getUserListSubscriptionsIterator(parameters);
    return (await iterator.nextPageAsync());
  }

  public getUserListSubscriptionsIterator(userIdOrUsernameOrUserIdentifierOrParameters: number | string
    | IUserIdentifier | IGetUserListSubscriptionsParameters): ITwitterIterator<ITwitterList> {
    let parameters: IGetUserListSubscriptionsParameters;
    if (this.isIGetUserListSubscriptionsParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      parameters = userIdOrUsernameOrUserIdentifierOrParameters;
    } else {
      parameters = new GetUserListSubscriptionsParameters(userIdOrUsernameOrUserIdentifierOrParameters);
    }

    let pageIterator = this._twitterListsRequester.getUserListSubscriptionsIterator(parameters);
    return new TwitterIteratorProxy<ITwitterResult<ITwitterListCursorQueryResultDTO>, ITwitterList>(pageIterator, pageResult => {
      let twitterListDtos = pageResult.model.twitterLists;
      return this._client.factories.createTwitterLists(twitterListDtos);
    });
  }

  async IListsClient.checkIfUserIsSubscriberOfListAsync(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier | ICheckIfUserIsSubscriberOfListParameters,
                                                        userIdOrUsernameOrUserIdentifier: number): Promise<boolean> {
    let parameters: ICheckIfUserIsSubscriberOfListParameters;
    if (this.isICheckIfUserIsSubscriberOfListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new CheckIfUserIsSubscriberOfListParameters(listIdOrListIdentifierOrParameters, userIdOrUsernameOrUserIdentifier);
    }

    try {
      await this._twitterListsRequester.checkIfUserIsSubscriberOfListAsync(parameters); // .ConfigureAwait(false);
      return true;
    } catch (e: TwitterException) {
      if (e.statusCode === 404) {
        // This is a special case where the request actually throws expectedly
        // When a user is not a member of a list this operation returns a 404.
        return false;
      }

      throw;
    }
  }

        // ***********
        // GET TWEETS
        // ***********

  public async getTweetsFromListAsync(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier | IGetTweetsFromListParameters): Promise<ITweet[]> {
    let parameters: IGetTweetsFromListParameters;
    if (this.isIGetTweetsFromListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new GetTweetsFromListParameters(listIdOrListIdentifierOrParameters);
    }

    let iterator = this.getTweetsFromListIterator(parameters);
    return (await iterator.nextPageAsync()); // .ConfigureAwait(false)).ToArray();
  }

  public getTweetsFromListIterator(listIdOrListIdentifierOrParameters: number | ITwitterListIdentifier | IGetTweetsFromListParameters): ITwitterIterator<ITweet, number> {      // number
    let parameters: IGetTweetsFromListParameters;
    if (this.isIGetTweetsFromListParameters(listIdOrListIdentifierOrParameters)) {
      parameters = listIdOrListIdentifierOrParameters;
    } else {
      parameters = new GetTweetsFromListParameters(listIdOrListIdentifierOrParameters);
    }

    let pageIterator = this._twitterListsRequester.getTweetsFromListIterator(parameters);
    return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, number>(pageIterator,          // number?
      twitterResult => this._client.factories.createTweets(twitterResult?.model));
  }

  private isICreateListParameters(nameOrParameters: any): nameOrParameters is ICreateListParameters {
    return (nameOrParameters as ICreateListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIGetListParameters(listIdOrSlugOrListIdentifierOrParameters: any): listIdOrSlugOrListIdentifierOrParameters is IGetListParameters {
    return (listIdOrSlugOrListIdentifierOrParameters as IGetListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIGetListsSubscribedByUserParameters(userIdOrUsernameOrUserIdentifierOrParameters: any): userIdOrUsernameOrUserIdentifierOrParameters is IGetListsSubscribedByUserParameters {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IGetListsSubscribedByUserParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIDestroyListParameters(listIdOrSlugOrListIdentifierOrParameters: any): listIdOrSlugOrListIdentifierOrParameters is IDestroyListParameters {
    return (listIdOrSlugOrListIdentifierOrParameters as IDestroyListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIGetListsOwnedByUserParameters(userIdOrUsernameOrUserIdentifierOrParameters: any): userIdOrUsernameOrUserIdentifierOrParameters is IGetListsOwnedByUserParameters {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IGetListsOwnedByUserParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIAddMemberToListParameters(listIdOrListIdentifierOrParameters: any): listIdOrListIdentifierOrParameters is IAddMemberToListParameters {
    return (listIdOrListIdentifierOrParameters as IAddMemberToListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIAddMembersToListParameters(listIdOrListIdentifierOrParameters: any): listIdOrListIdentifierOrParameters is IAddMembersToListParameters {
    return (listIdOrListIdentifierOrParameters as IAddMembersToListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIGetUserListMembershipsParameters(userIdOrUsernameOrUserIdentifierOrParameters: any): userIdOrUsernameOrUserIdentifierOrParameters is IGetUserListMembershipsParameters {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IGetUserListMembershipsParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIGetMembersOfListParameters(listIdOrListIdentifierOrParameters: any): listIdOrListIdentifierOrParameters is IGetMembersOfListParameters {
    return (listIdOrListIdentifierOrParameters as IGetMembersOfListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isICheckIfUserIsMemberOfListParameters(listIdOrListIdentifierOrParameters: any): listIdOrListIdentifierOrParameters is ICheckIfUserIsMemberOfListParameters {
    return (listIdOrListIdentifierOrParameters as ICheckIfUserIsMemberOfListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIRemoveMemberFromListParameters(listIdOrListIdentifierOrParameters: any): listIdOrListIdentifierOrParameters is IRemoveMemberFromListParameters {
    return (listIdOrListIdentifierOrParameters as IRemoveMemberFromListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIRemoveMembersFromListParameters(listIdOrListIdentifierOrParameters: any): listIdOrListIdentifierOrParameters is IRemoveMembersFromListParameters {
    return (listIdOrListIdentifierOrParameters as IRemoveMembersFromListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isISubscribeToListParameters(listIdOrListIdentifierOrParameters: any): listIdOrListIdentifierOrParameters is ISubscribeToListParameters {
    return (listIdOrListIdentifierOrParameters as ISubscribeToListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIUnsubscribeFromListParameters(listIdOrListIdentifierOrParameters: any): listIdOrListIdentifierOrParameters is IUnsubscribeFromListParameters {
    return (listIdOrListIdentifierOrParameters as IUnsubscribeFromListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIGetListSubscribersParameters(listIdOrListIdentifierOrParameters: any): listIdOrListIdentifierOrParameters is IGetListSubscribersParameters  {
    return (listIdOrListIdentifierOrParameters as IGetListSubscribersParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIGetUserListSubscriptionsParameters(userIdOrUsernameOrUserIdentifierOrParameters: any): userIdOrUsernameOrUserIdentifierOrParameters is IGetUserListSubscriptionsParameters  {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IGetUserListSubscriptionsParameters).formattedCustomQueryParameters !== undefined;
  }

  private isICheckIfUserIsSubscriberOfListParameters(listIdOrListIdentifierOrParameters: any): listIdOrListIdentifierOrParameters is ICheckIfUserIsSubscriberOfListParameters  {
    return (listIdOrListIdentifierOrParameters as ICheckIfUserIsSubscriberOfListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIGetTweetsFromListParameters(listIdOrListIdentifierOrParameters: any): listIdOrListIdentifierOrParameters is IGetTweetsFromListParameters  {
    return (listIdOrListIdentifierOrParameters as IGetTweetsFromListParameters).formattedCustomQueryParameters !== undefined;
  }

}
