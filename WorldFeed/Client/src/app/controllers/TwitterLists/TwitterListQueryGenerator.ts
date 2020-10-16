import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {IUserQueryParameterGenerator} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {ITwitterListQueryParameterGenerator} from "../../core/Core/QueryGenerators/ITwitterListQueryParameterGenerator";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {Resources} from "../../properties/resources";

export interface ITwitterListQueryGenerator {
  // list
  GetCreateListQuery(parameters: ICreateListParameters): string;

  GetListQuery(parameters: IGetListParameters): string;

  GetListsSubscribedByUserQuery(parameters: IGetListsSubscribedByUserParameters);

  GetUpdateListQuery(parameters: IUpdateListParameters): string;

  GetDestroyListQuery(parameters: IDestroyListParameters): string;

  GetListsOwnedByUserQuery(parameters: IGetListsOwnedByUserParameters): string;

  // members
  GetAddMemberToListQuery(parameters: IAddMemberToListParameters): string;

  GetAddMembersQuery(parameters: IAddMembersToListParameters): string;

  GetCheckIfUserIsMemberOfListQuery(parameters: ICheckIfUserIsMemberOfListParameters): string;

  GetUserListMembershipsQuery(parameters: IGetUserListMembershipsParameters): string;

  GetMembersOfListQuery(parameters: IGetMembersOfListParameters): string;

  GetRemoveMemberFromListQuery(parameters: IRemoveMemberFromListParameters): string;

  GetRemoveMembersFromListQuery(parameters: IRemoveMembersFromListParameters): string;

  // subscribers
  GetSubscribeToListQuery(parameters: ISubscribeToListParameters): string;

  GetListSubscribersQuery(parameters: IGetListSubscribersParameters): string;

  GetCheckIfUserIsSubscriberOfListQuery(parameters: ICheckIfUserIsSubscriberOfListParameters): string;

  GetUserListSubscriptionsQuery(parameters: IGetUserListSubscriptionsParameters): string;

  GetUnsubscribeFromListQuery(parameters: IUnsubscribeFromListParameters): string;

  // Tweets
  GetTweetsFromListQuery(queryParameters: IGetTweetsFromListParameters, tweetMode: ComputedTweetMode): string;
}

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
  public GetCreateListQuery(parameters: ICreateListParameters): string {
    let query = new StringBuilder(Resources.List_Create);

    AppendListMetadataToQuery(parameters, query);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  private static void;

  AppendListMetadataToQuery(parameters: IListMetadataParameters, query: StringBuilder) {
    query.addParameterToQuery("name", parameters.name);
    query.addParameterToQuery("mode", parameters.privacyMode?.ToString()?.ToLowerInvariant());
    query.addParameterToQuery("description", parameters.description);
  }

  public GetListQuery(parameters: IGetListParameters): string {
    var query = new StringBuilder(Resources.List_Get);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetListsSubscribedByUserQuery(parameters: IGetListsSubscribedByUserParameters): string {
    var query = new StringBuilder(Resources.List_GetUserLists);

    query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
    query.addParameterToQuery("reverse", parameters.reverse);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetUpdateListQuery(parameters: IUpdateListParameters): string {
    var query = new StringBuilder(Resources.List_Update);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);

    AppendListMetadataToQuery(parameters, query);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetDestroyListQuery(parameters: IDestroyListParameters): string {
    var query = new StringBuilder(Resources.List_Destroy);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetListsOwnedByUserQuery(parameters: IGetListsOwnedByUserParameters): string {
    var query = new StringBuilder(Resources.List_OwnedByUser);

    query.addFormattedParameterToQuery(_userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.user));

    this._queryParameterGenerator.AppendCursorParameters(query, parameters);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetAddMemberToListQuery(parameters: IAddMemberToListParameters): string {
    var query = new StringBuilder(Resources.List_Members_Create);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUser(query, parameters.users);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetAddMembersQuery(parameters: IAddMembersToListParameters): string {
    var query = new StringBuilder(Resources.List_CreateMembers);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUsers(query, parameters.users);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetCheckIfUserIsMemberOfListQuery(parameters: ICheckIfUserIsMemberOfListParameters): string {
    var query = new StringBuilder(Resources.List_CheckMembership);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    this._userQueryParameterGenerator.appendUser(query, parameters.user);

    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addParameterToQuery("skip_status", parameters.skipStatus);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetUserListMembershipsQuery(parameters: IGetUserListMembershipsParameters): string {
    var query = new StringBuilder(Resources.List_GetUserMemberships);

    this._userQueryParameterGenerator.appendUser(query, parameters.user);
    this._queryParameterGenerator.AppendCursorParameters(query, parameters);
    query.addParameterToQuery("filter_to_owned_lists", parameters.onlyRetrieveAccountLists);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetMembersOfListQuery(parameters: IGetMembersOfListParameters): string {
    var query = new StringBuilder(Resources.List_Members_List);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._queryParameterGenerator.AppendCursorParameters(query, parameters);

    query.addParameterToQuery("include_entities", parameters.IncludeEntities);
    query.addParameterToQuery("skip_status", parameters.SkipStatus);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetRemoveMemberFromListQuery(parameters: IRemoveMemberFromListParameters): string {
    var query = new StringBuilder(Resources.List_DestroyMember);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUser(query, parameters.user);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetRemoveMembersFromListQuery(parameters: IRemoveMembersFromListParameters): string {
    var query = new StringBuilder(Resources.List_DestroyMembers);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._userQueryParameterGenerator.appendUsers(query, parameters.users);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  // SUBSCRIBERS
  public GetSubscribeToListQuery(parameters: ISubscribeToListParameters): string {
    var query = new StringBuilder(Resources.List_Subscribe);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetListSubscribersQuery(parameters: IGetListSubscribersParameters): string {
    var query = new StringBuilder(Resources.List_GetSubscribers);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    this._queryParameterGenerator.AppendCursorParameters(query, parameters);

    query.addParameterToQuery("include_entities", parameters.IncludeEntities);
    query.addParameterToQuery("skip_status", parameters.SkipStatus);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetCheckIfUserIsSubscriberOfListQuery(parameters: ICheckIfUserIsSubscriberOfListParameters): string {
    var query = new StringBuilder(Resources.List_CheckSubscriber);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);
    this._userQueryParameterGenerator.appendUser(query, parameters.user);

    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addParameterToQuery("skip_status", parameters.skipStatus);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetUserListSubscriptionsQuery(parameters: IGetUserListSubscriptionsParameters): string {
    var query = new StringBuilder(Resources.List_UserSubscriptions);

    this._userQueryParameterGenerator.appendUser(query, parameters.user);
    this._queryParameterGenerator.AppendCursorParameters(query, parameters);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetUnsubscribeFromListQuery(parameters: IUnsubscribeFromListParameters): string {
    var query = new StringBuilder(Resources.List_Unsubscribe);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  // TWEETS
  public GetTweetsFromListQuery(parameters: IGetTweetsFromListParameters, tweetMode: ComputedTweetMode): string {
    var query = new StringBuilder(Resources.List_GetTweetsFromList);

    this._twitterListQueryParameterGenerator.appendListIdentifierParameter(query, parameters.list);
    this._queryParameterGenerator.AddTimelineParameters(query, parameters, tweetMode);

    query.addParameterToQuery("include_rts", parameters.includeRetweets);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }
}
