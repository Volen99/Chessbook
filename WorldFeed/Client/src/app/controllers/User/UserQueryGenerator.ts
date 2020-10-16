import {IUserQueryGenerator} from "../../core/Core/QueryGenerators/IUserQueryGenerator";
import {IUserQueryParameterGenerator} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {Resources} from "../../properties/resources";

export class UserQueryGenerator implements IUserQueryGenerator {
  private readonly _userQueryParameterGenerator: IUserQueryParameterGenerator;
  private readonly _queryParameterGenerator: IQueryParameterGenerator;

  constructor(userQueryParameterGenerator: IUserQueryParameterGenerator, queryParameterGenerator: IQueryParameterGenerator) {
    this._userQueryParameterGenerator = userQueryParameterGenerator;
    this._queryParameterGenerator = queryParameterGenerator;
  }

        public  getAuthenticatedUserQuery(parameters: IGetAuthenticatedUserParameters): string
        {
            let query = new StringBuilder(Resources.User_GetCurrentUser);

            query.addParameterToQuery("skip_status", parameters.SkipStatus);
            query.addParameterToQuery("include_entities", parameters.IncludeEntities);
            query.addParameterToQuery("include_email", parameters.includeEmail);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getUserQuery(parameters: IGetUserParameters): string
        {
            let query = new StringBuilder(Resources.User_GetUser);

            query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.User));
            query.addParameterToQuery("skip_status", parameters.SkipStatus);
            query.addParameterToQuery("include_entities", parameters.IncludeEntities);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getUsersQuery(parameters: IGetUsersParameters): string
        {
            let userIdsParameter = this._userQueryParameterGenerator.generateListOfUserIdentifiersParameter(parameters.Users);
            let query = new StringBuilder(Resources.User_GetUsers);

            query.addFormattedParameterToQuery(userIdsParameter);
            query.addParameterToQuery("skip_status", parameters.SkipStatus);
            query.addParameterToQuery("include_entities", parameters.IncludeEntities);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // FOLLOWERS
        public  getFriendIdsQuery(parameters: IGetFriendIdsParameters): string
        {
            let query = new StringBuilder(Resources.User_GetFriends);

            query.addFormattedParameterToQuery(_userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            this._queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getFollowerIdsQuery(parameters: IGetFollowerIdsParameters): string
        {
            let query = new StringBuilder(Resources.User_GetFollowers);

            query.addFormattedParameterToQuery(_userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));
            this._queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getRelationshipBetweenQuery(parameters: IGetRelationshipBetweenParameters): string
        {
            let sourceParameter = this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.SourceUser, "source_id", "source_screen_name");
            let targetParameter = this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.TargetUser, "target_id", "target_screen_name");

            let query = new StringBuilder(Resources.Friendship_GetRelationship);

            query.addFormattedParameterToQuery(sourceParameter);
            query.addFormattedParameterToQuery(targetParameter);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // Download Profile Image
        public  downloadProfileImageURL(parameters: IGetProfileImageParameters): string
        {
            let query = new StringBuilder(parameters.ImageUrl.Replace("_normal", $"_{parameters.ImageSize.ToString().ToLowerInvariant()}"));
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        // BLOCK
        public  getBlockUserQuery(parameters: IBlockUserParameters): string
        {
            let query = new StringBuilder(Resources.User_Block_Create);

            query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getUnblockUserQuery(parameters: IUnblockUserParameters): string
        {
            let query = new StringBuilder(Resources.User_Block_Destroy);

            query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getReportUserForSpamQuery(parameters: IReportUserForSpamParameters): string
        {
            let query = new StringBuilder(Resources.User_Report_Spam);

            query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
            query.addParameterToQuery("perform_block", parameters.performBlock);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getBlockedUserIdsQuery(parameters: IGetBlockedUserIdsParameters): string
        {
            let query = new StringBuilder(Resources.User_Block_List_Ids);

            this._queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getBlockedUsersQuery(parameters: IGetBlockedUsersParameters): string
        {
            let query = new StringBuilder(Resources.User_Block_List);

            this._queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.addParameterToQuery("include_entities", parameters.IncludeEntities);
            query.addParameterToQuery("skip_status", parameters.SkipStatus);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // FOLLOWERS
        public  getFollowUserQuery(parameters: IFollowUserParameters): string
        {
            let query = new StringBuilder(Resources.Friendship_Create);

            query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
            query.addParameterToQuery("follow", parameters.enableNotifications);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getUpdateRelationshipQuery(parameters: IUpdateRelationshipParameters): string
        {
            let query = new StringBuilder(Resources.Friendship_Update);

            query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
            query.addParameterToQuery("device", parameters.enableDeviceNotifications);
            query.addParameterToQuery("retweets", parameters.enableRetweets);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getUnfollowUserQuery(parameters: IUnfollowUserParameters): string
        {
            let query = new StringBuilder(Resources.Friendship_Destroy);

            query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getUserIdsRequestingFriendshipQuery(parameters: IGetUserIdsRequestingFriendshipParameters): string
        {
            let query = new StringBuilder(Resources.Friendship_GetIncomingIds);

            this._queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getUserIdsYouRequestedToFollowQuery(parameters: IGetUserIdsYouRequestedToFollowParameters): string
        {
            let query = new StringBuilder(Resources.Friendship_GetOutgoingIds);

            this._queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getRelationshipsWithQuery(parameters: IGetRelationshipsWithParameters): string
        {
            let query = new StringBuilder(Resources.Friendship_GetRelationships);

            query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateListOfUserIdentifiersParameter(parameters.users));
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // MUTE
        public  getUserIdsWhoseRetweetsAreMutedQuery(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters): string
        {
            let query = new StringBuilder(Resources.Friendship_FriendIdsWithNoRetweets);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public  getMutedUserIdsQuery(parameters: IGetMutedUserIdsParameters): string
        {
            let query = new StringBuilder(Resources.Account_Mute_GetUserIds);

            this._queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getMutedUsersQuery(parameters: IGetMutedUsersParameters): string
        {
            let query = new StringBuilder(Resources.Account_Mute_GetUsers);

            this._queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.addParameterToQuery("include_entities", parameters.IncludeEntities);
            query.addParameterToQuery("skip_status", parameters.SkipStatus);

            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getMuteUserQuery(parameters: IMuteUserParameters): string
        {
            let query = new StringBuilder(Resources.Account_Mute_Create);

            query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  getUnmuteUserQuery(parameters: IUnmuteUserParameters): string
        {
            let query = new StringBuilder(Resources.Account_Mute_Destroy);

            query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }
    }
