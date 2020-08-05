﻿namespace WorldFeed.Controllers.TwitterLists
{
    using System.Text;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public.Parameters.ListsClient;
    using WorldFeed.Common.Public.Parameters.ListsClient.Interfaces;
    using WorldFeed.Common.Public.Parameters.ListsClient.Members;
    using WorldFeed.Common.Public.Parameters.ListsClient.Subscribers;
    using WorldFeed.Common.QueryGenerators;
    using WorldFeed.Common.Settings;
    using WorldFeed.Controllers.Properties;
    using WorldFeed.Controllers.Shared;

    public interface ITwitterListQueryGenerator
    {
        // list
        string GetCreateListQuery(ICreateListParameters parameters);

        string GetListQuery(IGetListParameters parameters);

        string GetListsSubscribedByUserQuery(IGetListsSubscribedByUserParameters parameters);

        string GetUpdateListQuery(IUpdateListParameters parameters);

        string GetDestroyListQuery(IDestroyListParameters parameters);

        string GetListsOwnedByUserQuery(IGetListsOwnedByUserParameters parameters);

        // members
        string GetAddMemberToListQuery(IAddMemberToListParameters parameters);

        string GetAddMembersQuery(IAddMembersToListParameters parameters);

        string GetCheckIfUserIsMemberOfListQuery(ICheckIfUserIsMemberOfListParameters parameters);

        string GetUserListMembershipsQuery(IGetUserListMembershipsParameters parameters);

        string GetMembersOfListQuery(IGetMembersOfListParameters parameters);

        string GetRemoveMemberFromListQuery(IRemoveMemberFromListParameters parameters);

        string GetRemoveMembersFromListQuery(IRemoveMembersFromListParameters parameters);

        // subscribers
        string GetSubscribeToListQuery(ISubscribeToListParameters parameters);

        string GetListSubscribersQuery(IGetListSubscribersParameters parameters);

        string GetCheckIfUserIsSubscriberOfListQuery(ICheckIfUserIsSubscriberOfListParameters parameters);

        string GetUserListSubscriptionsQuery(IGetUserListSubscriptionsParameters parameters);

        string GetUnsubscribeFromListQuery(IUnsubscribeFromListParameters parameters);

        // Tweets
        string GetTweetsFromListQuery(IGetTweetsFromListParameters queryParameters, TweetMode? requestTweetMode);
    }

    public class TwitterListQueryGenerator : ITwitterListQueryGenerator
    {
        private readonly IUserQueryParameterGenerator userQueryParameterGenerator;
        private readonly IQueryParameterGenerator queryParameterGenerator;
        private readonly ITwitterListQueryParameterGenerator twitterListQueryParameterGenerator;

        public TwitterListQueryGenerator(IUserQueryParameterGenerator userQueryParameterGenerator, IQueryParameterGenerator queryParameterGenerator,
            ITwitterListQueryParameterGenerator twitterListQueryParameterGenerator)
        {
            this.userQueryParameterGenerator = userQueryParameterGenerator;
            this.queryParameterGenerator = queryParameterGenerator;
            this.twitterListQueryParameterGenerator = twitterListQueryParameterGenerator;
        }

        // User Lists
        public string GetCreateListQuery(ICreateListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_Create);

            AppendListMetadataToQuery(parameters, query);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        private static void AppendListMetadataToQuery(IListMetadataParameters parameters, StringBuilder query)
        {
            query.AddParameterToQuery("name", parameters.Name);
            query.AddParameterToQuery("mode", parameters.PrivacyMode?.ToString()?.ToLowerInvariant());
            query.AddParameterToQuery("description", parameters.Description);
        }

        public string GetListQuery(IGetListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_Get);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters.List);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetListsSubscribedByUserQuery(IGetListsSubscribedByUserParameters parameters)
        {
            var query = new StringBuilder(Resources.List_GetUserLists);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            query.AddParameterToQuery("reverse", parameters.Reverse);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUpdateListQuery(IUpdateListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_Update);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters.List);

            AppendListMetadataToQuery(parameters, query);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetDestroyListQuery(IDestroyListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_Destroy);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters.List);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetListsOwnedByUserQuery(IGetListsOwnedByUserParameters parameters)
        {
            var query = new StringBuilder(Resources.List_OwnedByUser);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));

            this.queryParameterGenerator.AppendCursorParameters(query, parameters);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetAddMemberToListQuery(IAddMemberToListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_Members_Create);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters.List);
            this.userQueryParameterGenerator.AppendUser(query, parameters.User);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetAddMembersQuery(IAddMembersToListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_CreateMembers);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters.List);
            this.userQueryParameterGenerator.AppendUsers(query, parameters.Users);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetCheckIfUserIsMemberOfListQuery(ICheckIfUserIsMemberOfListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_CheckMembership);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters);
            this.userQueryParameterGenerator.AppendUser(query, parameters.User);

            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddParameterToQuery("skip_status", parameters.SkipStatus);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUserListMembershipsQuery(IGetUserListMembershipsParameters parameters)
        {
            var query = new StringBuilder(Resources.List_GetUserMemberships);

            this.userQueryParameterGenerator.AppendUser(query, parameters.User);
            this.queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.AddParameterToQuery("filter_to_owned_lists", parameters.OnlyRetrieveAccountLists);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetMembersOfListQuery(IGetMembersOfListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_Members_List);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters.List);
            this.queryParameterGenerator.AppendCursorParameters(query, parameters);

            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddParameterToQuery("skip_status", parameters.SkipStatus);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetRemoveMemberFromListQuery(IRemoveMemberFromListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_DestroyMember);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters.List);
            this.userQueryParameterGenerator.AppendUser(query, parameters.User);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetRemoveMembersFromListQuery(IRemoveMembersFromListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_DestroyMembers);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters.List);
            this.userQueryParameterGenerator.AppendUsers(query, parameters.Users);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // SUBSCRIBERS
        public string GetSubscribeToListQuery(ISubscribeToListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_Subscribe);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetListSubscribersQuery(IGetListSubscribersParameters parameters)
        {
            var query = new StringBuilder(Resources.List_GetSubscribers);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters);
            this.queryParameterGenerator.AppendCursorParameters(query, parameters);

            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddParameterToQuery("skip_status", parameters.SkipStatus);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetCheckIfUserIsSubscriberOfListQuery(ICheckIfUserIsSubscriberOfListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_CheckSubscriber);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters);
            this.userQueryParameterGenerator.AppendUser(query, parameters.User);

            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddParameterToQuery("skip_status", parameters.SkipStatus);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUserListSubscriptionsQuery(IGetUserListSubscriptionsParameters parameters)
        {
            var query = new StringBuilder(Resources.List_UserSubscriptions);

            this.userQueryParameterGenerator.AppendUser(query, parameters.User);
            this.queryParameterGenerator.AppendCursorParameters(query, parameters);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUnsubscribeFromListQuery(IUnsubscribeFromListParameters parameters)
        {
            var query = new StringBuilder(Resources.List_Unsubscribe);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // TWEETS
        public string GetTweetsFromListQuery(IGetTweetsFromListParameters parameters, TweetMode? requestTweetMode)
        {
            var query = new StringBuilder(Resources.List_GetTweetsFromList);

            this.twitterListQueryParameterGenerator.AppendListIdentifierParameter(query, parameters.List);
            this.queryParameterGenerator.AddTimelineParameters(query, parameters, requestTweetMode);

            query.AddParameterToQuery("include_rts", parameters.IncludeRetweets);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }
    }
}
