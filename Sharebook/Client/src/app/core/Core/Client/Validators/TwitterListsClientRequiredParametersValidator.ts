import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {ITwitterListsClientParametersValidator} from "./TwitterListsClientParametersValidator";
import {IUserQueryValidator, IUserQueryValidatorToken, UserQueryValidator} from "./UserQueryValidator";
import {TwitterListParameters} from "./parameters-types";
import {ICreateListParameters} from "../../../Public/Parameters/ListsClient/CreateListParameters";
import {IUpdateListParameters} from "../../../Public/Parameters/ListsClient/UpdateListParameters";
import {IGetListParameters} from "../../../Public/Parameters/ListsClient/GetListParameters";
import {IDestroyListParameters} from "../../../Public/Parameters/ListsClient/DestroyListParameters";
import {IGetTweetsFromListParameters} from "../../../Public/Parameters/ListsClient/GetTweetsFromListParameters";
import {IAddMembersToListParameters} from "../../../Public/Parameters/ListsClient/Members/AddMembersToListParameters";
import {IGetMembersOfListParameters} from "../../../Public/Parameters/ListsClient/Members/GetMembersOfListParameters";
import {IRemoveMembersFromListParameters} from "../../../Public/Parameters/ListsClient/Members/RemoveMembersFromListParameters";
import {ISubscribeToListParameters} from "../../../Public/Parameters/ListsClient/Subscribers/SubscribeToListParameters";
import {IUnsubscribeFromListParameters} from "../../../Public/Parameters/ListsClient/Subscribers/UnsubscribeFromListParameters";
import {IGetListSubscribersParameters} from "../../../Public/Parameters/ListsClient/Subscribers/GetListSubscribersParameters";
import {ITwitterListIdentifier} from "../../../Public/Models/Interfaces/ITwitterListIdentifier";
import {IGetListsOwnedByUserParameters} from "../../../Public/Parameters/ListsClient/GetListsOwnedByUserParameters";
import {IGetUserListMembershipsParameters} from "../../../Public/Parameters/ListsClient/Members/GetUserListMembershipsParameters";
import {IGetUserListSubscriptionsParameters} from "../../../Public/Parameters/ListsClient/Subscribers/GetUserListSubscriptionsParameters";
import {IAddMemberToListParameters} from "../../../Public/Parameters/ListsClient/Members/AddMemberToListParameters";
import {ICheckIfUserIsMemberOfListParameters} from "../../../Public/Parameters/ListsClient/Members/CheckIfUserIsMemberOfListParameters";
import {IRemoveMemberFromListParameters} from "../../../Public/Parameters/ListsClient/Members/RemoveMemberFromListParameters";
import {ICheckIfUserIsSubscriberOfListParameters} from "../../../Public/Parameters/ListsClient/Subscribers/CheckIfUserIsSubscriberOfListParameters";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";
import ArgumentException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentException";

export interface ITwitterListsClientRequiredParametersValidator extends ITwitterListsClientParametersValidator {
}

export const ITwitterListsClientRequiredParametersValidatorToken = new InjectionToken<ITwitterListsClientRequiredParametersValidator>('ITwitterListsClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new TwitterListsClientRequiredParametersValidator(inject(UserQueryValidator)),
});

type ThrowIfParameters = IGetListParameters
  | IUpdateListParameters
  | IDestroyListParameters
  | IGetTweetsFromListParameters
  | IAddMembersToListParameters
  | IGetMembersOfListParameters
  | IRemoveMembersFromListParameters
  | ISubscribeToListParameters
  | IUnsubscribeFromListParameters
  | IGetListSubscribersParameters;

type UserQueryParameters = IGetListsOwnedByUserParameters
  | IGetUserListMembershipsParameters
  | IGetUserListSubscriptionsParameters;

type ParametersForBothAbove = IAddMemberToListParameters      // best naming ever :-D | 13.10.2020, 21:39 (omg, I missed dinner) | Зомб x JON - Хотел тебе это сказать ❤
  | ICheckIfUserIsMemberOfListParameters
  | IRemoveMemberFromListParameters
  | ICheckIfUserIsSubscriberOfListParameters;

@Injectable({
  providedIn: 'root',
})
export class TwitterListsClientRequiredParametersValidator implements ITwitterListsClientRequiredParametersValidator {
  private readonly _userQueryValidator: IUserQueryValidator;

  constructor(@Inject(IUserQueryValidatorToken) userQueryValidator: IUserQueryValidator) {
    this._userQueryValidator = userQueryValidator;
  }

  public validate(parameters: TwitterListParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(`nameof(parameters)`);
    }

    if (this.isICreateListParameters(parameters)) {
      if (!(parameters.name)) {
        throw new ArgumentNullException(`${`nameof(parameters.name)`}`);
      }
    } else if (this.isThrowIfListParameters(parameters)) {
      this.throwIfListIdentifierIsNotValid(parameters.list);
    } else if (this.isUserQueryParameters(parameters)) {
      this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.user);
    } else if (this.isParametersForBothAbove(parameters)) {
      this.throwIfListIdentifierIsNotValid(parameters.list);
      this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.user);
    }
  }

  private isICreateListParameters(parameters: TwitterListParameters): parameters is ICreateListParameters {
    return (parameters as ICreateListParameters).formattedCustomQueryParameters !== undefined;
  }

  private isThrowIfListParameters(parameters: TwitterListParameters): parameters is ThrowIfParameters {
    return (parameters as ThrowIfParameters).formattedCustomQueryParameters !== undefined;
  }

  private isUserQueryParameters(parameters: TwitterListParameters): parameters is UserQueryParameters {
    return (parameters as UserQueryParameters).formattedCustomQueryParameters !== undefined;
  }

  private isParametersForBothAbove(parameters: any): parameters is ParametersForBothAbove {
    return (parameters as ParametersForBothAbove).formattedCustomQueryParameters !== undefined;
  }

  public throwIfListIdentifierIsNotValid(twitterListIdentifier: ITwitterListIdentifier): void {
    if (twitterListIdentifier == null) {
      throw new ArgumentNullException(`nameof(twitterListIdentifier)`, `${`nameof(twitterListIdentifier)`} cannot be null`);
    }

    let isIdValid = twitterListIdentifier.id > 0;
    let isSlugWithUsernameValid = twitterListIdentifier.slug != null && (twitterListIdentifier.ownerScreenName != null || twitterListIdentifier.ownerId > 0);

    if (!isIdValid && !isSlugWithUsernameValid) {
      throw new ArgumentException("List identifier(id or slug + userIdentifier) must be specified.");
    }
  }
}

