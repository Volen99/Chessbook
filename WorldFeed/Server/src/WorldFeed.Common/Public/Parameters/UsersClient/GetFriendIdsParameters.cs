namespace WorldFeed.Common.Public.Parameters.UsersClient
{
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Common.Settings;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-ids
    /// </summary>
    /// <inheritdoc />
    public interface IGetFriendIdsParameters : ICursorQueryParameters
    {
        /// <summary>
        /// User for who you want to get the friends from.
        /// </summary>
        IUserIdentifier User { get; }
    }

    /// <inheritdoc />
    public class GetFriendIdsParameters : CursorQueryParameters, IGetFriendIdsParameters
    {
        public GetFriendIdsParameters(IUserIdentifier userIdentifier)
        {
            PageSize = WorldFeedLimits.DEFAULTS.USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE;
            User = userIdentifier;
        }

        public GetFriendIdsParameters(string username) : this(new UserIdentifier(username))
        {
        }

        public GetFriendIdsParameters(long userId) : this(new UserIdentifier(userId))
        {
        }

        public GetFriendIdsParameters(IGetFriendIdsParameters parameters) : base(parameters)
        {
            if (parameters == null)
            {
                PageSize = WorldFeedLimits.DEFAULTS.USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE;
                return;
            }

            User = parameters.User;
        }

        /// <inheritdoc />
        public IUserIdentifier User { get; }
    }
}
