﻿namespace Sharebook.Profile.Application.Parameters.UsersClient
{
    using System.Linq;

    using Sharebook.Common.Public.Models;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Parameters.Optionals;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-lookup
    /// </summary>
    /// <inheritdoc />
    public interface IGetUsersParameters : IGetUsersOptionalParameters
    {
        /// <summary>
        /// User identifiers
        /// </summary>
        IUserIdentifier[] Users { get; set; }
    }

    /// <inheritdoc />
    public class GetUsersParameters : GetUsersOptionalParameters, IGetUsersParameters
    {
        public GetUsersParameters(long[] userIds)
        {
            Users = userIds.Select(userId => new UserIdentifier(userId) as IUserIdentifier).ToArray();
        }

        public GetUsersParameters(string[] usernames)
        {
            Users = usernames.Select(username => new UserIdentifier(username) as IUserIdentifier).ToArray();
        }

        public GetUsersParameters(IUserIdentifier[] userIdentifiers)
        {
            Users = userIdentifiers;
        }

        public GetUsersParameters(IGetUsersParameters source) : base(source)
        {
            Users = source?.Users;
        }

        /// <inheritdoc />
        public IUserIdentifier[] Users { get; set; }
    }
}
