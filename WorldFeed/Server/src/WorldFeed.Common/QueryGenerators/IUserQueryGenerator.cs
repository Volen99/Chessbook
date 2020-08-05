﻿namespace WorldFeed.Common.QueryGenerators
{
    using WorldFeed.Common.Public.Parameters.AccountClient;
    using WorldFeed.Common.Public.Parameters.UsersClient;
    using WorldFeed.Common.Public.Parameters.UsersClients;

    public interface IUserQueryGenerator
    {
        string GetAuthenticatedUserQuery(IGetAuthenticatedUserParameters parameters);

        string GetUserQuery(IGetUserParameters parameters);
        string GetUsersQuery(IGetUsersParameters parameters);

        string GetFriendIdsQuery(IGetFriendIdsParameters parameters);
        string GetFollowerIdsQuery(IGetFollowerIdsParameters parameters);

        string GetRelationshipBetweenQuery(IGetRelationshipBetweenParameters parameters);
        string DownloadProfileImageURL(IGetProfileImageParameters parameters);

        // BLOCK
        string GetBlockUserQuery(IBlockUserParameters parameters);

        string GetUnblockUserQuery(IUnblockUserParameters parameters);

        string GetReportUserForSpamQuery(IReportUserForSpamParameters parameters);

        string GetBlockedUserIdsQuery(IGetBlockedUserIdsParameters parameters);

        string GetBlockedUsersQuery(IGetBlockedUsersParameters parameters);

        // FOLLOWERS
        string GetFollowUserQuery(IFollowUserParameters parameters);

        string GetUnfollowUserQuery(IUnfollowUserParameters parameters);

        // RELATIONSHIPS
        string GetUpdateRelationshipQuery(IUpdateRelationshipParameters parameters);

        // ONGOING REQUESTS
        string GetUserIdsRequestingFriendshipQuery(IGetUserIdsRequestingFriendshipParameters parameters);

        string GetUserIdsYouRequestedToFollowQuery(IGetUserIdsYouRequestedToFollowParameters parameters);

        // FRIENDSHIPS
        string GetRelationshipsWithQuery(IGetRelationshipsWithParameters parameters);

        // MUTE
        string GetUserIdsWhoseRetweetsAreMutedQuery(IGetUserIdsWhoseRetweetsAreMutedParameters parameters);
        string GetMutedUserIdsQuery(IGetMutedUserIdsParameters parameters);

        string GetMutedUsersQuery(IGetMutedUsersParameters parameters);

        string GetMuteUserQuery(IMuteUserParameters parameters);

        string GetUnmuteUserQuery(IUnmuteUserParameters parameters);
    }
}
