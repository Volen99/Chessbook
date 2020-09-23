namespace WorldFeed.Identity.API.Client.Tools
{
    using System.Collections.Generic;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.RateLimits;
    using WorldFeed.Identity.API.DTO;
    using WorldFeed.Identity.API.Models;
    using WorldFeed.Identity.API.Models.Authentication;
    using WorldFeed.Identity.Domain.AggregatesModel.UserAggregate;

    public interface ITwitterClientFactories
    {
        // ACCOUNT SETTINGS

        /// <summary>
        /// Creates accountSettings from json
        /// </summary>
        IAccountSettings CreateAccountSettings(string json);
        IAccountSettings CreateAccountSettings(IAccountSettingsDTO dto);

        // USER

        /// <summary>
        /// Creates a user from json
        /// </summary>
        IUser CreateUser(string json);
        IUser CreateUser(IUserDTO userDTO);
        IUser[] CreateUsers(IEnumerable<IUserDTO> usersDTO);

        /// <summary>
        /// Creates an authenticated user from json
        /// </summary>
        IAuthenticatedUser CreateAuthenticatedUser(string json);
        IAuthenticatedUser CreateAuthenticatedUser(IUserDTO userDTO);

        // RATE LIMITS

        /// <summary>
        /// Creates a RateLimits object from json
        /// </summary>
        ICredentialsRateLimits CreateRateLimits(string json);
        ICredentialsRateLimits CreateRateLimits(CredentialsRateLimitsDTO dto);

        // CREDENTIALS

        /// <summary>
        /// Creates credentials from json
        /// </summary>
        ITwitterCredentials CreateTwitterCredentials(string json);

        /// <summary>
        /// Creates consumer credentials from json
        /// </summary>
        IConsumerOnlyCredentials CreateConsumerCredentials(string json);

    }
}
