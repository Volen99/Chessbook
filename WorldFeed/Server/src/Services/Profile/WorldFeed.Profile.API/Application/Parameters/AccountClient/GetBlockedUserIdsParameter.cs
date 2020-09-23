namespace WorldFeed.Profile.Application.Parameters.AccountClient
{
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Common.Settings;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-blocks-ids
    /// </summary>
    /// <inheritdoc />
    public interface IGetBlockedUserIdsParameters : ICursorQueryParameters
    {
    }

    /// <inheritdoc />
    public class GetBlockedUserIdsParameters : CursorQueryParameters, IGetBlockedUserIdsParameters
    {
        public GetBlockedUserIdsParameters()
        {
            PageSize = WorldFeedLimits.DEFAULTS.ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE;
        }

        public GetBlockedUserIdsParameters(IGetBlockedUserIdsParameters source) : base(source)
        {
            if (source == null)
            {
                PageSize = WorldFeedLimits.DEFAULTS.ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE;
                return;
            }

            PageSize = source.PageSize;
        }
    }
}
