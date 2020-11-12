import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {
  IUserQueryParameterGenerator,
  IUserQueryParameterGeneratorToken
} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {
  ITwitterListQueryParameterGenerator,
  ITwitterListQueryParameterGeneratorToken
} from "../../core/Core/QueryGenerators/ITwitterListQueryParameterGenerator";
import {Resources} from "../../properties/resources";
import {ICreateListParameters} from "../../core/Public/Parameters/ListsClient/CreateListParameters";
import {IGetListParameters} from "../../core/Public/Parameters/ListsClient/GetListParameters";
import {IGetListsSubscribedByUserParameters} from "../../core/Public/Parameters/ListsClient/GetListsSubscribedByUserParameters";
import {IUpdateListParameters} from "../../core/Public/Parameters/ListsClient/UpdateListParameters";
import {IDestroyListParameters} from "../../core/Public/Parameters/ListsClient/DestroyListParameters";
import {IGetListsOwnedByUserParameters} from "../../core/Public/Parameters/ListsClient/GetListsOwnedByUserParameters";
import {IAddMemberToListParameters} from "../../core/Public/Parameters/ListsClient/Members/AddMemberToListParameters";
import {IAddMembersToListParameters} from "../../core/Public/Parameters/ListsClient/Members/AddMembersToListParameters";
import {ICheckIfUserIsMemberOfListParameters} from "../../core/Public/Parameters/ListsClient/Members/CheckIfUserIsMemberOfListParameters";
import {IGetUserListMembershipsParameters} from "../../core/Public/Parameters/ListsClient/Members/GetUserListMembershipsParameters";
import {IGetMembersOfListParameters} from "../../core/Public/Parameters/ListsClient/Members/GetMembersOfListParameters";
import {IRemoveMemberFromListParameters} from "../../core/Public/Parameters/ListsClient/Members/RemoveMemberFromListParameters";
import {IRemoveMembersFromListParameters} from "../../core/Public/Parameters/ListsClient/Members/RemoveMembersFromListParameters";
import {ISubscribeToListParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/SubscribeToListParameters";
import {IGetListSubscribersParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/GetListSubscribersParameters";
import {ICheckIfUserIsSubscriberOfListParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/CheckIfUserIsSubscriberOfListParameters";
import {IGetUserListSubscriptionsParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/GetUserListSubscriptionsParameters";
import {IUnsubscribeFromListParameters} from "../../core/Public/Parameters/ListsClient/Subscribers/UnsubscribeFromListParameters";
import {IGetTweetsFromListParameters} from "../../core/Public/Parameters/ListsClient/GetTweetsFromListParameters";
import {IQueryParameterGenerator, IQueryParameterGeneratorToken, QueryParameterGenerator} from "../Shared/QueryParameterGenerator";
import {IListMetadataParameters} from "../../core/Public/Parameters/ListsClient/IListMetadataParameters";
import {UserQueryParameterGenerator} from "../User/UserQueryParameterGenerator";
import {TwitterListQueryParameterGenerator} from "./TwitterListQueryParameterGenerator";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";

export interface ITwitterListQueryGenerator {
  // list
  getCreateListQuery(parameters: ICreateListParameters): string;

  getListQuery(parameters: IGetListParameters): string;

  getListsSubscribedByUserQuery(parameters: IGetListsSubscribedByUserParameters);

  getUpdateListQuery(parameters: IUpdateListParameters): string;

  getDestroyListQuery(parameters: IDestroyListParameters): string;

  getListsOwnedByUserQuery(parameters: IGetListsOwnedByUserParameters): string;

  // members
  getAddMemberToListQuery(parameters: IAddMemberToListParameters): string;

  getAddMembersQuery(parameters: IAddMembersToListParameters): string;

  getCheckIfUserIsMemberOfListQuery(parameters: ICheckIfUserIsMemberOfListParameters): string;

  getUserListMembershipsQuery(parameters: IGetUserListMembershipsParameters): string;

  getMembersOfListQuery(parameters: IGetMembersOfListParameters): string;

  getRemoveMemberFromListQuery(parameters: IRemoveMemberFromListParameters): string;

  getRemoveMembersFromListQuery(parameters: IRemoveMembersFromListParameters): string;

  // subscribers
  getSubscribeToListQuery(parameters: ISubscribeToListParameters): string;

  getListSubscribersQuery(parameters: IGetListSubscribersParameters): string;

  getCheckIfUserIsSubscriberOfListQuery(parameters: ICheckIfUserIsSubscriberOfListParameters): string;

  getUserListSubscriptionsQuery(parameters: IGetUserListSubscriptionsParameters): string;

  getUnsubscribeFromListQuery(parameters: IUnsubscribeFromListParameters): string;

  // Tweets
  getTweetsFromListQuery(queryParameters: IGetTweetsFromListParameters, tweetMode: ComputedTweetMode): string;
}

export const ITwitterListQueryGeneratorToken = new InjectionToken<ITwitterListQueryGenerator>('ITwitterListQueryGenerator', {
  providedIn: 'root',
  factory: () => new TwitterListQueryGenerator(inject(UserQueryParameterGenerator), inject(QueryParameterGenerator),
    Inject(TwitterListQueryParameterGenerator)),
});

@Injectable({
  providedIn: 'root',
})
export class TwitterListQueryGenerator implements ITwitterListQueryGenerator {
  private readonly _userQueryParameterGenerator: IUserQueryParameterGenerator;
  private readonly _queryParameterGenerator: IQueryParameterGenerator;
  private readonly _twitterListQueryParameterGenerator: ITwitterListQueryParameterGenerator;

  constructor(@Inject(IUserQueryParameterGeneratorToken) userQueryParameterGenerator: IUserQueryParameterGenerator,
              @Inject(IQueryParameterGeneratorToken) queryParameterGenerator: IQueryParameterGenerator,
              @Inject(ITwitterListQueryParameterGeneratorToken) twitterListQueryParameterGenerator: ITwitterListQueryParameterGenerator) {
    this._userQueryParameterGenerator = userQueryParameterGenerator;
    this._queryParameterGenerator = queryParameterGenerator;
    this._twitterListQueryParameterGenerator = twitterListQueryParameterGenerator;
  }

  // User Lists
  public getCreateListQuery(parameters: ICreateListParameters): string {
    let query = new StringBuilder(Resources.List_Create);

    TwitterListQueryGenerator.appendListMetadataToQuery(parameters, query);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  private static appendListMetadataToQuery(parameters: IListMetadataParameters, query: StringBuilder): void {
    StringBuilderExtensions.addParameterToQuery(query, "name", parameters.name);
    StringBuilderExtensions.addParameterToQuery(query, "mode", parameters.privacyMode?.toString()?.toLocaleLowerCase());
    StringBuilderExtensions.addParameterToQuery(query, "description", parameters.description);
  }

  public getListQuery(parameters: IGetListParameters): string {
    let query = new StringBuilder(Resources.List_Get);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getListsSubscribedByUserQuery(parameters: IGetListsSubscribedByUserParameters): string {
    let query = new StringBuilder(Resources.List_GetUserLists);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    StringBuilderExtensions.addParameterToQuery(query, "reverse", parameters.reverse);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUpdateListQuery(parameters: IUpdateListParameters): string {
    let query = new StringBuilder(Resources.List_Update);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);

    TwitterListQueryGenerator.appendListMetadataToQuery(parameters, query);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getDestroyListQuery(parameters: IDestroyListParameters): string {
    let query = new StringBuilder(Resources.List_Destroy);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getListsOwnedByUserQuery(parameters: IGetListsOwnedByUserParameters): string {
    let query = new StringBuilder(Resources.List_OwnedByUser);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));

    this._queryParameterGenerator.appendCursorParameters(query, parameters);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getAddMemberToListQuery(parameters: IAddMemberToListParameters): string {
    let query = new StringBuilder(Resources.List_Members_Create);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUser(query, parameters.user);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getAddMembersQuery(parameters: IAddMembersToListParameters): string {
    let query = new StringBuilder(Resources.List_CreateMembers);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUsers(query, parameters.users);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getCheckIfUserIsMemberOfListQuery(parameters: ICheckIfUserIsMemberOfListParameters): string {
    let query = new StringBuilder(Resources.List_CheckMembership);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    this._userQueryParameterGenerator.appendUser(query, parameters.user);

    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "skip_status", parameters.skipStatus);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUserListMembershipsQuery(parameters: IGetUserListMembershipsParameters): string {
    let query = new StringBuilder(Resources.List_GetUserMemberships);

    this._userQueryParameterGenerator.appendUser(query, parameters.user);
    this._queryParameterGenerator.appendCursorParameters(query, parameters);
    StringBuilderExtensions.addParameterToQuery(query, "filter_to_owned_lists", parameters.onlyRetrieveAccountLists);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getMembersOfListQuery(parameters: IGetMembersOfListParameters): string {
    let query = new StringBuilder(Resources.List_Members_List);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._queryParameterGenerator.appendCursorParameters(query, parameters);

    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "skip_status", parameters.skipStatus);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getRemoveMemberFromListQuery(parameters: IRemoveMemberFromListParameters): string {
    let query = new StringBuilder(Resources.List_DestroyMember);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUser(query, parameters.user);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getRemoveMembersFromListQuery(parameters: IRemoveMembersFromListParameters): string {
    let query = new StringBuilder(Resources.List_DestroyMembers);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUsers(query, parameters.users);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // SUBSCRIBERS
  public getSubscribeToListQuery(parameters: ISubscribeToListParameters): string {
    let query = new StringBuilder(Resources.List_Subscribe);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getListSubscribersQuery(parameters: IGetListSubscribersParameters): string {
    let query = new StringBuilder(Resources.List_GetSubscribers);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    this._queryParameterGenerator.appendCursorParameters(query, parameters);

    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "skip_status", parameters.skipStatus);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getCheckIfUserIsSubscriberOfListQuery(parameters: ICheckIfUserIsSubscriberOfListParameters): string {
    let query = new StringBuilder(Resources.List_CheckSubscriber);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    this._userQueryParameterGenerator.appendUser(query, parameters.user);

    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "skip_status", parameters.skipStatus);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUserListSubscriptionsQuery(parameters: IGetUserListSubscriptionsParameters): string {
    let query = new StringBuilder(Resources.List_UserSubscriptions);

    this._userQueryParameterGenerator.appendUser(query, parameters.user);
    this._queryParameterGenerator.appendCursorParameters(query, parameters);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUnsubscribeFromListQuery(parameters: IUnsubscribeFromListParameters): string {
    let query = new StringBuilder(Resources.List_Unsubscribe);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // TWEETS
  public getTweetsFromListQuery(parameters: IGetTweetsFromListParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.List_GetTweetsFromList);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._queryParameterGenerator.addTimelineParameters(query, parameters, tweetMode);

    StringBuilderExtensions.addParameterToQuery(query, "include_rts", parameters.includeRetweets);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }
}
