﻿namespace WorldFeed.Profile.Application.Parameters.UsersClient
{
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters.Optionals;
    using WorldFeed.Common.Settings;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-ids
    /// </summary>
    /// <inheritdoc />
    public interface IGetFriendsParameters : IGetFriendIdsParameters, IGetUsersOptionalParameters
    {
        /// <summary>
        /// Page size when retrieving the users objects from Twitter
        /// </summary>
        int GetUsersPageSize { get; set; }
    }

    /// <inheritdoc />
    public class GetFriendsParameters : GetFriendIdsParameters, IGetFriendsParameters
    {
        public GetFriendsParameters(IUserIdentifier userIdentifier)
            : base(userIdentifier)
        {
            GetUsersPageSize = WorldFeedLimits.DEFAULTS.USERS_GET_USERS_MAX_SIZE;
        }

        public GetFriendsParameters(string username) : this(new UserIdentifier(username))
        {
        }

        public GetFriendsParameters(long userId) : this(new UserIdentifier(userId))
        {
        }

        public GetFriendsParameters(IGetFriendsParameters parameters) : base(parameters)
        {
            GetUsersPageSize = WorldFeedLimits.DEFAULTS.USERS_GET_USERS_MAX_SIZE;

            if (parameters == null)
            {
                return;
            }

            SkipStatus = parameters.SkipStatus;
            IncludeEntities = parameters.IncludeEntities;
            GetUsersPageSize = parameters.GetUsersPageSize;
        }

        /// <inheritdoc />
        public bool? IncludeEntities { get; set; }

        /// <inheritdoc />
        public bool? SkipStatus { get; set; }

        /// <inheritdoc />
        public int GetUsersPageSize { get; set; }
    }
}
