﻿namespace WorldFeed.Common.Public.Parameters.AccountClient
{
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-blocks-destroy
    /// </summary>
    /// <inheritdoc />
    public interface IUnblockUserParameters : ICustomRequestParameters
    {
        /// <summary>
        /// User that you want to unblock
        /// </summary>
        IUserIdentifier User { get; set; }
    }

    /// <inheritdoc />
    public class UnblockUserParameters : CustomRequestParameters, IUnblockUserParameters
    {
        public UnblockUserParameters(string username) : this(new UserIdentifier(username))
        {
        }

        public UnblockUserParameters(long userId) : this(new UserIdentifier(userId))
        {
        }

        public UnblockUserParameters(IUserIdentifier user)
        {
            User = user;
        }

        public UnblockUserParameters(IUnblockUserParameters source) : base(source)
        {
            User = source?.User;
        }

        /// <inheritdoc />
        public IUserIdentifier User { get; set; }
    }
}
