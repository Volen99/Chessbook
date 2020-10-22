import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {IUserQueryParameterGenerator} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {ITwitterListQueryParameterGenerator} from "../../core/Core/QueryGenerators/ITwitterListQueryParameterGenerator";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
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
import {IQueryParameterGenerator} from "../Shared/QueryParameterGenerator";
import {IListMetadataParameters} from "../../core/Public/Parameters/ListsClient/IListMetadataParameters";
import {InjectionToken} from "@angular/core";

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
  factory: () => new TwitterListQueryGenerator(),
});

export class TwitterListQueryGenerator implements ITwitterListQueryGenerator {
  private readonly _userQueryParameterGenerator: IUserQueryParameterGenerator;
  private readonly _queryParameterGenerator: IQueryParameterGenerator;
  private readonly _twitterListQueryParameterGenerator: ITwitterListQueryParameterGenerator;

  constructor(userQueryParameterGenerator: IUserQueryParameterGenerator, queryParameterGenerator: IQueryParameterGenerator,
              twitterListQueryParameterGenerator: ITwitterListQueryParameterGenerator) {
    this._userQueryParameterGenerator = userQueryParameterGenerator;
    this._queryParameterGenerator = queryParameterGenerator;
    this._twitterListQueryParameterGenerator = twitterListQueryParameterGenerator;
  }

  // User Lists
  public getCreateListQuery(parameters: ICreateListParameters): string {
    let query = new StringBuilder(Resources.List_Create);

    TwitterListQueryGenerator.appendListMetadataToQuery(parameters, query);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  private static appendListMetadataToQuery(parameters: IListMetadataParameters, query: StringBuilder): void {
    query.addParameterToQuery("name", parameters.name);
    query.addParameterToQuery("mode", parameters.privacyMode?.toString()?.toLocaleLowerCase());
    query.addParameterToQuery("description", parameters.description);
  }

  public getListQuery(parameters: IGetListParameters): string {
    let query = new StringBuilder(Resources.List_Get);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getListsSubscribedByUserQuery(parameters: IGetListsSubscribedByUserParameters): string {
    let query = new StringBuilder(Resources.List_GetUserLists);

    query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    query.addParameterToQuery("reverse", parameters.reverse);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUpdateListQuery(parameters: IUpdateListParameters): string {
    let query = new StringBuilder(Resources.List_Update);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);

    TwitterListQueryGenerator.appendListMetadataToQuery(parameters, query);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getDestroyListQuery(parameters: IDestroyListParameters): string {
    let query = new StringBuilder(Resources.List_Destroy);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getListsOwnedByUserQuery(parameters: IGetListsOwnedByUserParameters): string {
    let query = new StringBuilder(Resources.List_OwnedByUser);

    query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));

    this._queryParameterGenerator.appendCursorParameters(query, parameters);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getAddMemberToListQuery(parameters: IAddMemberToListParameters): string {
    let query = new StringBuilder(Resources.List_Members_Create);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUser(query, parameters.users);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getAddMembersQuery(parameters: IAddMembersToListParameters): string {
    let query = new StringBuilder(Resources.List_CreateMembers);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUsers(query, parameters.users);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getCheckIfUserIsMemberOfListQuery(parameters: ICheckIfUserIsMemberOfListParameters): string {
    let query = new StringBuilder(Resources.List_CheckMembership);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    this._userQueryParameterGenerator.appendUser(query, parameters.user);

    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addParameterToQuery("skip_status", parameters.skipStatus);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUserListMembershipsQuery(parameters: IGetUserListMembershipsParameters): string {
    let query = new StringBuilder(Resources.List_GetUserMemberships);

    this._userQueryParameterGenerator.appendUser(query, parameters.user);
    this._queryParameterGenerator.appendCursorParameters(query, parameters);
    query.addParameterToQuery("filter_to_owned_lists", parameters.onlyRetrieveAccountLists);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getMembersOfListQuery(parameters: IGetMembersOfListParameters): string {
    let query = new StringBuilder(Resources.List_Members_List);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._queryParameterGenerator.appendCursorParameters(query, parameters);

    query.addParameterToQuery("include_entities", parameters.IncludeEntities);
    query.addParameterToQuery("skip_status", parameters.SkipStatus);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getRemoveMemberFromListQuery(parameters: IRemoveMemberFromListParameters): string {
    var query = new StringBuilder(Resources.List_DestroyMember);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUser(query, parameters.user);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getRemoveMembersFromListQuery(parameters: IRemoveMembersFromListParameters): string {
    let query = new StringBuilder(Resources.List_DestroyMembers);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUsers(query, parameters.users);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // SUBSCRIBERS
  public getSubscribeToListQuery(parameters: ISubscribeToListParameters): string {
    let query = new StringBuilder(Resources.List_Subscribe);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getListSubscribersQuery(parameters: IGetListSubscribersParameters): string {
    let query = new StringBuilder(Resources.List_GetSubscribers);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    this._queryParameterGenerator.appendCursorParameters(query, parameters);

    query.addParameterToQuery("include_entities", parameters.IncludeEntities);
    query.addParameterToQuery("skip_status", parameters.SkipStatus);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getCheckIfUserIsSubscriberOfListQuery(parameters: ICheckIfUserIsSubscriberOfListParameters): string {
    let query = new StringBuilder(Resources.List_CheckSubscriber);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    this._userQueryParameterGenerator.appendUser(query, parameters.user);

    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addParameterToQuery("skip_status", parameters.skipStatus);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUserListSubscriptionsQuery(parameters: IGetUserListSubscriptionsParameters): string {
    let query = new StringBuilder(Resources.List_UserSubscriptions);

    this._userQueryParameterGenerator.appendUser(query, parameters.user);
    this._queryParameterGenerator.appendCursorParameters(query, parameters);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUnsubscribeFromListQuery(parameters: IUnsubscribeFromListParameters): string {
    let query = new StringBuilder(Resources.List_Unsubscribe);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // TWEETS
  public getTweetsFromListQuery(parameters: IGetTweetsFromListParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.List_GetTweetsFromList);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._queryParameterGenerator.addTimelineParameters(query, parameters, tweetMode);

    query.addParameterToQuery("include_rts", parameters.includeRetweets);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }
}
