﻿namespace Sharebook.Profile.Application.Parameters.UsersClient
{
    using Sharebook.Common.Public.Models;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Parameters.Optionals;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-show
    /// </summary>
    /// <inheritdoc />
    public interface IGetUserParameters : IGetUsersOptionalParameters
    {
        /// <summary>
        /// User identifier
        /// </summary>
        IUserIdentifier User { get; set; }
    }

    /// <inheritdoc />
    public class GetUserParameters : GetUsersOptionalParameters, IGetUserParameters
    {
        public GetUserParameters(long userId) : this(new UserIdentifier(userId))
        {
        }

        public GetUserParameters(string username) : this(new UserIdentifier(username))
        {
        }

        public GetUserParameters(IUserIdentifier user)
        {
            User = user;
        }

        public GetUserParameters(IGetUserParameters source) : base(source)
        {
            User = source?.User;
        }

        /// <inheritdoc />
        public IUserIdentifier User { get; set; }
    }
}
