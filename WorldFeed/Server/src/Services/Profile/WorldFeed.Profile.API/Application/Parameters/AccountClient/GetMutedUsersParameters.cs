namespace WorldFeed.Profile.Application.Parameters.AccountClient
{
    using WorldFeed.Common.Public.Parameters.Optionals;
    using WorldFeed.Common.Settings;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-mutes-users-list
    /// </summary>
    /// <inheritdoc />
    public interface IGetMutedUsersParameters : IGetCursorUsersOptionalParameters
    {
    }
    
    /// <inheritdoc/>
    public class GetMutedUsersParameters : GetCursorUsersOptionalParameters, IGetMutedUsersParameters
    {
        public GetMutedUsersParameters()
        {
            PageSize = WorldFeedLimits.DEFAULTS.ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE;
        }

        public GetMutedUsersParameters(IGetMutedUsersParameters source) 
            : base(source)
        {
            if (source == null)
            {
                PageSize = WorldFeedLimits.DEFAULTS.ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE;
                return;
            }

            PageSize = source.PageSize;
        }
    }
}
