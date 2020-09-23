namespace WorldFeed.Profile.Application.Parameters.UsersClient
{
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Common.Settings;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-followers-ids
    /// </summary>
    /// <inheritdoc />
    public interface IGetFollowerIdsParameters : ICursorQueryParameters
    {
        /// <summary>
        /// A unique identifier of a user
        /// </summary>
        IUserIdentifier User { get; }
    }

    /// <inheritdoc />
    public class GetFollowerIdsParameters : CursorQueryParameters, IGetFollowerIdsParameters
    {
        public GetFollowerIdsParameters(string username) : this(new UserIdentifier(username))
        {
        }

        public GetFollowerIdsParameters(long userId) : this(new UserIdentifier(userId))
        {
        }

        public GetFollowerIdsParameters(IUserIdentifier user)
        {
            PageSize = WorldFeedLimits.DEFAULTS.USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE;
            User = user;
        }

        public GetFollowerIdsParameters(IGetFollowerIdsParameters parameters) : base(parameters)
        {
            if (parameters == null)
            {
                PageSize = WorldFeedLimits.DEFAULTS.USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE;
                return;
            }

            User = parameters.User;
        }

        /// <inheritdoc />
        public IUserIdentifier User { get; }
    }
}
