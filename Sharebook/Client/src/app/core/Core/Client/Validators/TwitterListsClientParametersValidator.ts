import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {ICreateListParameters} from "../../../Public/Parameters/ListsClient/CreateListParameters";
import {IGetListParameters} from "../../../Public/Parameters/ListsClient/GetListParameters";
import {IGetListsSubscribedByUserParameters} from "../../../Public/Parameters/ListsClient/GetListsSubscribedByUserParameters";
import {IGetListsOwnedByAccountParameters} from "../../../Public/Parameters/ListsClient/GetListsOwnedByAccountParameters";
import {IGetListsOwnedByUserParameters} from "../../../Public/Parameters/ListsClient/GetListsOwnedByUserParameters";
import {IGetTweetsFromListParameters} from "../../../Public/Parameters/ListsClient/GetTweetsFromListParameters";
import {IDestroyListParameters} from "../../../Public/Parameters/ListsClient/DestroyListParameters";
import {IUpdateListParameters} from "../../../Public/Parameters/ListsClient/UpdateListParameters";
import {IAddMemberToListParameters} from "../../../Public/Parameters/ListsClient/Members/AddMemberToListParameters";
import {IAddMembersToListParameters} from "../../../Public/Parameters/ListsClient/Members/AddMembersToListParameters";
import {IGetUserListMembershipsParameters} from "../../../Public/Parameters/ListsClient/Members/GetUserListMembershipsParameters";
import {IGetMembersOfListParameters} from "../../../Public/Parameters/ListsClient/Members/GetMembersOfListParameters";
import {ICheckIfUserIsMemberOfListParameters} from "../../../Public/Parameters/ListsClient/Members/CheckIfUserIsMemberOfListParameters";
import {IRemoveMemberFromListParameters} from "../../../Public/Parameters/ListsClient/Members/RemoveMemberFromListParameters";
import {IRemoveMembersFromListParameters} from "../../../Public/Parameters/ListsClient/Members/RemoveMembersFromListParameters";
import {IGetAccountListMembershipsParameters} from "../../../Public/Parameters/ListsClient/Members/GetAccountListMembershipsParameters";
import {ISubscribeToListParameters} from "../../../Public/Parameters/ListsClient/Subscribers/SubscribeToListParameters";
import {IUnsubscribeFromListParameters} from "../../../Public/Parameters/ListsClient/Subscribers/UnsubscribeFromListParameters";
import {IGetListSubscribersParameters} from "../../../Public/Parameters/ListsClient/Subscribers/GetListSubscribersParameters";
import {IGetAccountListSubscriptionsParameters} from "../../../Public/Parameters/ListsClient/Subscribers/GetAccountListSubscriptionsParameters";
import {IGetUserListSubscriptionsParameters} from "../../../Public/Parameters/ListsClient/Subscribers/GetUserListSubscriptionsParameters";
import {ICheckIfUserIsSubscriberOfListParameters} from "../../../Public/Parameters/ListsClient/Subscribers/CheckIfUserIsSubscriberOfListParameters";
import {ITwitterClient, ITwitterClientToken} from "../../../Public/ITwitterClient";
import {SharebookLimits} from 'src/app/core/Public/Settings/SharebookLimits';
import {TwitterArgumentLimitException} from "../../../Public/Exceptions/TwitterArgumentLimitException";
import {
  ITwitterListsClientRequiredParametersValidator,
  ITwitterListsClientRequiredParametersValidatorToken, TwitterListsClientRequiredParametersValidator
} from "./TwitterListsClientRequiredParametersValidator";
import {TwitterListParameters} from "./parameters-types";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import ArgumentOutOfRangeException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentOutOfRangeException";

export interface ITwitterListsClientParametersValidator {
  validate(parameters: ICreateListParameters): void;

  validate(parameters: IGetListParameters): void;

  validate(parameters: IGetListsSubscribedByUserParameters): void;

  validate(parameters: IUpdateListParameters): void;

  validate(parameters: IDestroyListParameters): void;

  validate(parameters: IGetListsOwnedByAccountParameters): void;

  validate(parameters: IGetListsOwnedByUserParameters): void;

  validate(parameters: IGetTweetsFromListParameters): void;

  // MEMBERS
  validate(parameters: IAddMemberToListParameters): void;

  validate(parameters: IAddMembersToListParameters): void;

  validate(parameters: IGetUserListMembershipsParameters): void;

  validate(parameters: IGetMembersOfListParameters): void;

  validate(parameters: ICheckIfUserIsMemberOfListParameters): void;

  validate(parameters: IRemoveMemberFromListParameters): void;

  validate(parameters: IRemoveMembersFromListParameters): void;

  validate(parameters: IGetAccountListMembershipsParameters): void;

  // SUBSCRIBERS
  validate(parameters: ISubscribeToListParameters): void;

  validate(parameters: IUnsubscribeFromListParameters): void;

  validate(parameters: IGetListSubscribersParameters): void;

  validate(parameters: IGetAccountListSubscriptionsParameters): void;

  validate(parameters: IGetUserListSubscriptionsParameters);

  validate(parameters: ICheckIfUserIsSubscriberOfListParameters): void;
}

export const ITwitterListsClientParametersValidatorToken = new InjectionToken<ITwitterListsClientParametersValidator>('ITwitterListsClientParametersValidator', {
  providedIn: 'root',
  factory: () => new TwitterListsClientParametersValidator(inject(ITwitterClientToken), inject(ITwitterListsClientRequiredParametersValidatorToken)),
});

type GetListsParameters = IGetListsOwnedByAccountParameters | IGetListsOwnedByUserParameters;

@Injectable({
  providedIn: 'root',
})
export class TwitterListsClientParametersValidator implements ITwitterListsClientParametersValidator {
  private readonly _client: ITwitterClient;
  private readonly _twitterListsClientRequiredParametersValidator: ITwitterListsClientRequiredParametersValidator;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(ITwitterListsClientRequiredParametersValidatorToken) twitterListsClientRequiredParametersValidator: ITwitterListsClientRequiredParametersValidator) {
    this._client = client;
    this._twitterListsClientRequiredParametersValidator = twitterListsClientRequiredParametersValidator;
  }

  private get Limits(): SharebookLimits {
    return this._client.config.limits;
  }

  public validate(parameters: TwitterListParameters): void {
    if (this.isICreateListParameters(parameters)) {
      this._twitterListsClientRequiredParametersValidator.validate(parameters);

      let maxNameSize = this.Limits.LISTS_CREATE_NAME_MAX_SIZE;
      if (parameters.name.length > maxNameSize) {
        throw new TwitterArgumentLimitException(`${`nameof(parameters.name)`}`, maxNameSize, `nameof(this.Limits.LISTS_CREATE_NAME_MAX_SIZE)`, "characters");
      }
    } else if (this.isGetListsParameters(parameters)) {
      this._twitterListsClientRequiredParametersValidator.validate(parameters);

      let maxPageSize = this.Limits.LISTS_GET_USER_OWNED_LISTS_MAX_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${`nameof(parameters.pageSize)`}`, maxPageSize, `nameof(this.Limits.LISTS_GET_USER_OWNED_LISTS_MAX_SIZE)`, "page size");
      }
    } else if (this.isIGetTweetsFromListParameters(parameters)) {
      this._twitterListsClientRequiredParametersValidator.validate(parameters);

      let maxPageSize = this.Limits.LISTS_GET_TWEETS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${`nameof(parameters.pageSize)`}`, maxPageSize, `nameof(this.Limits.LISTS_GET_TWEETS_MAX_PAGE_SIZE)`, "page size");
      }
    } else if (this.isIAddMembersToListParameters(parameters)) {
      this._twitterListsClientRequiredParametersValidator.validate(parameters);

      if (parameters.users.length === 0) {
        throw new ArgumentOutOfRangeException(`${`nameof(parameters.users)`}`, `You must have at least 1 user`);
      }

      let maxUsers = this.Limits.LISTS_ADD_MEMBERS_MAX_USERS;
      if (parameters.users.length > maxUsers) {
        throw new TwitterArgumentLimitException(`${`nameof(parameters.users)`}`, maxUsers, `nameof(this.Limits.LISTS_ADD_MEMBERS_MAX_USERS)`, "users");
      }
    } else if (this.isIGetUserListMembershipsParameters(parameters)) {
      this._twitterListsClientRequiredParametersValidator.validate(parameters);

      let maxPageSize = this.Limits.LISTS_GET_USER_MEMBERSHIPS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${`nameof(parameters.pageSize)`}`, maxPageSize, `nameof(this.Limits.LISTS_GET_USER_MEMBERSHIPS_MAX_PAGE_SIZE)`, "page size");
      }
    } else if (this.isIGetMembersOfListParameters(parameters)) {
      this._twitterListsClientRequiredParametersValidator.validate(parameters);

      let maxPageSize = this.Limits.LISTS_GET_MEMBERS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${`nameof(parameters.pageSize)`}`, maxPageSize, `nameof(this.Limits.LISTS_GET_MEMBERS_MAX_PAGE_SIZE)`, "page size");
      }
    } else if (this.isIRemoveMembersFromListParameters(parameters)) {
      this._twitterListsClientRequiredParametersValidator.validate(parameters);

      if (parameters.users.length === 0) {
        throw new ArgumentOutOfRangeException(`${`nameof(parameters.users)`}`, "You must have at least 1 user");
      }

      let maxUsers = this.Limits.LISTS_REMOVE_MEMBERS_MAX_USERS;
      if (parameters.users.length > maxUsers) {
        throw new TwitterArgumentLimitException(`${`nameof(parameters.users)`}`, maxUsers, `nameof(this.Limits.LISTS_REMOVE_MEMBERS_MAX_USERS)`, "users");
      }
    } else if (this.isIGetListSubscribersParameters(parameters)) {
      this._twitterListsClientRequiredParametersValidator.validate(parameters);

      let maxPageSize = this.Limits.LISTS_GET_SUBSCRIBERS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${`nameof(parameters.pageSize)`}`, maxPageSize, `nameof(this.Limits.LISTS_GET_SUBSCRIBERS_MAX_PAGE_SIZE)`, "page size");
      }
    } else if (this.isIGetAccountListSubscriptionsParameters(parameters)) {
      this._twitterListsClientRequiredParametersValidator.validate(parameters);

      let maxPageSize = this.Limits.LISTS_GET_USER_SUBSCRIPTIONS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${`nameof(parameters.pageSize)`}`, maxPageSize, `nameof(this.Limits.LISTS_GET_USER_SUBSCRIPTIONS_MAX_PAGE_SIZE)`, "page size");
      }
    } else if (this.isIGetUserListSubscriptionsParameters(parameters)) {
      this._twitterListsClientRequiredParametersValidator.validate(parameters);

      let maxPageSize = this.Limits.LISTS_GET_USER_SUBSCRIPTIONS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${`nameof(parameters.pageSize)`}`, maxPageSize, `nameof(this.Limits.LISTS_GET_USER_SUBSCRIPTIONS_MAX_PAGE_SIZE)`, "page size");
      }
    }
  }

  private isICreateListParameters(parameters: TwitterListParameters): parameters is ICreateListParameters {
    return (parameters as ICreateListParameters).customQueryParameters !== undefined;
  }

  private isGetListsParameters(parameters: TwitterListParameters): parameters is GetListsParameters {
    return (parameters as GetListsParameters).cursor !== undefined;
  }

  private isIGetTweetsFromListParameters(parameters: TwitterListParameters): parameters is IGetTweetsFromListParameters {
    return (parameters as IGetTweetsFromListParameters).includeRetweets !== undefined;
  }

  private isIAddMembersToListParameters(parameters: TwitterListParameters): parameters is IAddMembersToListParameters {
    return (parameters as IAddMembersToListParameters).users !== undefined;
  }

  private isIGetUserListMembershipsParameters(parameters: TwitterListParameters): parameters is IGetUserListMembershipsParameters {
    return (parameters as IGetUserListMembershipsParameters).user !== undefined;
  }

  private isIGetMembersOfListParameters(parameters: TwitterListParameters): parameters is IGetMembersOfListParameters {
    return (parameters as IGetMembersOfListParameters).cursor !== undefined;
  }

  private isIRemoveMembersFromListParameters(parameters: TwitterListParameters): parameters is IRemoveMembersFromListParameters {
    return (parameters as IRemoveMembersFromListParameters).users !== undefined;
  }

  private isIGetListSubscribersParameters(parameters: TwitterListParameters): parameters is IGetListSubscribersParameters {
    return (parameters as IGetListSubscribersParameters).cursor !== undefined;
  }

  private isIGetAccountListSubscriptionsParameters(parameters: TwitterListParameters): parameters is IGetAccountListSubscriptionsParameters {
    return (parameters as IGetAccountListSubscriptionsParameters).cursor !== undefined;
  }

  private isIGetUserListSubscriptionsParameters(parameters: TwitterListParameters): parameters is IGetUserListSubscriptionsParameters {
    return (parameters as IGetUserListSubscriptionsParameters).cursor !== undefined;
  }
}
