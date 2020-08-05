namespace WorldFeed.Common.Public.Parameters.AccountClient
{
    using WorldFeed.Common.Settings;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-incoming
    /// </summary>
    /// <inheritdoc />
    public interface IGetUserIdsRequestingFriendshipParameters : ICursorQueryParameters
    {
    }

    /// <inheritdoc />
    public class GetUserIdsRequestingFriendshipParameters : CursorQueryParameters, IGetUserIdsRequestingFriendshipParameters
    {
        public GetUserIdsRequestingFriendshipParameters()
        {
            PageSize = WorldFeedLimits.DEFAULTS.ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE;
        }

        public GetUserIdsRequestingFriendshipParameters(IGetUserIdsRequestingFriendshipParameters parameters) : base(parameters)
        {
            if (parameters == null)
            {
                PageSize = WorldFeedLimits.DEFAULTS.ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE;
                return;
            }

            PageSize = parameters.PageSize;
        }
    }
}
