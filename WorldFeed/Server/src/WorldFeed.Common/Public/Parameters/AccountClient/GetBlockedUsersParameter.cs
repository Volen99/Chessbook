namespace WorldFeed.Common.Public.Parameters.AccountClient
{
    using WorldFeed.Common.Public.Parameters.Optionals;
    using WorldFeed.Common.Settings;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-blocks-list
    /// </summary>
    /// <inheritdoc />
    public interface IGetBlockedUsersParameters : IGetCursorUsersOptionalParameters
    {
    }

    /// <inheritdoc />
    public class GetBlockedUsersParameters : GetCursorUsersOptionalParameters, IGetBlockedUsersParameters
    {
        public GetBlockedUsersParameters()
        {
            PageSize = WorldFeedLimits.DEFAULTS.ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE;
        }

        public GetBlockedUsersParameters(IGetBlockedUsersParameters source) 
            : base(source)
        {
            if (source == null)
            {
                PageSize = WorldFeedLimits.DEFAULTS.ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE;
                return;
            }

            PageSize = source.PageSize;
        }
    }
}
