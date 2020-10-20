namespace Sharebook.Profile.Application.QueryGenerators
{
    using System.Text;

    using Sharebook.Common.Extensions;
    using Sharebook.Common.Public.Parameters.AccountClient;
    using Sharebook.Common.Public.Parameters.UsersClient;
    using Sharebook.Common.Public.Parameters.UsersClients;
    using Sharebook.Common.QueryGenerators;
    using Sharebook.Profile.Application.Parameters;
    using Sharebook.Profile.Properties;

    public class UserQueryGenerator : IUserQueryGenerator
    {
        private readonly IUserQueryParameterGenerator userQueryParameterGenerator;
        private readonly IQueryParameterGenerator queryParameterGenerator;

        public UserQueryGenerator(IUserQueryParameterGenerator userQueryParameterGenerator, IQueryParameterGenerator queryParameterGenerator)
        {
            this.userQueryParameterGenerator = userQueryParameterGenerator;
            this.queryParameterGenerator = queryParameterGenerator;
        }

        public string GetAuthenticatedUserQuery(IGetAuthenticatedUserParameters parameters)
        {
            var query = new StringBuilder(Resources.User_GetCurrentUser);

            query.AddParameterToQuery("skip_status", parameters.SkipStatus);
            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddParameterToQuery("include_email", parameters.IncludeEmail);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUserQuery(IGetUserParameters parameters)
        {
            var query = new StringBuilder(Resources.User_GetUser);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            query.AddParameterToQuery("skip_status", parameters.SkipStatus);
            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUsersQuery(IGetUsersParameters parameters)
        {
            var userIdsParameter = this.userQueryParameterGenerator.GenerateListOfUserIdentifiersParameter(parameters.Users);
            var query = new StringBuilder(Resources.User_GetUsers);

            query.AddFormattedParameterToQuery(userIdsParameter);
            query.AddParameterToQuery("skip_status", parameters.SkipStatus);
            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // FOLLOWERS
        public string GetFriendIdsQuery(IGetFriendIdsParameters parameters)
        {
            var query = new StringBuilder(Resources.User_GetFriends);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            this.queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetFollowerIdsQuery(IGetFollowerIdsParameters parameters)
        {
            var query = new StringBuilder(Resources.User_GetFollowers);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            this.queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetRelationshipBetweenQuery(IGetRelationshipBetweenParameters parameters)
        {
            var sourceParameter = this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.SourceUser, "source_id", "source_screen_name");
            var targetParameter = this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.TargetUser, "target_id", "target_screen_name");

            var query = new StringBuilder(Resources.Friendship_GetRelationship);

            query.AddFormattedParameterToQuery(sourceParameter);
            query.AddFormattedParameterToQuery(targetParameter);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // Download Profile Image
        public string DownloadProfileImageURL(IGetProfileImageParameters parameters)
        {
            var query = new StringBuilder(parameters.ImageUrl.Replace("_normal", $"_{parameters.ImageSize.ToString().ToLowerInvariant()}"));
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        // BLOCK
        public string GetBlockUserQuery(IBlockUserParameters parameters)
        {
            var query = new StringBuilder(Resources.User_Block_Create);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUnblockUserQuery(IUnblockUserParameters parameters)
        {
            var query = new StringBuilder(Resources.User_Block_Destroy);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetReportUserForSpamQuery(IReportUserForSpamParameters parameters)
        {
            var query = new StringBuilder(Resources.User_Report_Spam);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            query.AddParameterToQuery("perform_block", parameters.PerformBlock);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetBlockedUserIdsQuery(IGetBlockedUserIdsParameters parameters)
        {
            var query = new StringBuilder(Resources.User_Block_List_Ids);

            this.queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetBlockedUsersQuery(IGetBlockedUsersParameters parameters)
        {
            var query = new StringBuilder(Resources.User_Block_List);

            this.queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddParameterToQuery("skip_status", parameters.SkipStatus);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // FOLLOWERS
        public string GetFollowUserQuery(IFollowUserParameters parameters)
        {
            var query = new StringBuilder(Resources.Friendship_Create);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            query.AddParameterToQuery("follow", parameters.EnableNotifications);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUpdateRelationshipQuery(IUpdateRelationshipParameters parameters)
        {
            var query = new StringBuilder(Resources.Friendship_Update);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            query.AddParameterToQuery("device", parameters.EnableDeviceNotifications);
            query.AddParameterToQuery("retweets", parameters.EnableRetweets);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUnfollowUserQuery(IUnfollowUserParameters parameters)
        {
            var query = new StringBuilder(Resources.Friendship_Destroy);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUserIdsRequestingFriendshipQuery(IGetUserIdsRequestingFriendshipParameters parameters)
        {
            var query = new StringBuilder(Resources.Friendship_GetIncomingIds);

            this.queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUserIdsYouRequestedToFollowQuery(IGetUserIdsYouRequestedToFollowParameters parameters)
        {
            var query = new StringBuilder(Resources.Friendship_GetOutgoingIds);

            this.queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetRelationshipsWithQuery(IGetRelationshipsWithParameters parameters)
        {
            var query = new StringBuilder(Resources.Friendship_GetRelationships);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateListOfUserIdentifiersParameter(parameters.Users));
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // MUTE
        public string GetUserIdsWhoseRetweetsAreMutedQuery(IGetUserIdsWhoseRetweetsAreMutedParameters parameters)
        {
            var query = new StringBuilder(Resources.Friendship_FriendIdsWithNoRetweets);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public string GetMutedUserIdsQuery(IGetMutedUserIdsParameters parameters)
        {
            var query = new StringBuilder(Resources.Account_Mute_GetUserIds);

            this.queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetMutedUsersQuery(IGetMutedUsersParameters parameters)
        {
            var query = new StringBuilder(Resources.Account_Mute_GetUsers);

            this.queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddParameterToQuery("skip_status", parameters.SkipStatus);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetMuteUserQuery(IMuteUserParameters parameters)
        {
            var query = new StringBuilder(Resources.Account_Mute_Create);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUnmuteUserQuery(IUnmuteUserParameters parameters)
        {
            var query = new StringBuilder(Resources.Account_Mute_Destroy);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }
    }
}
