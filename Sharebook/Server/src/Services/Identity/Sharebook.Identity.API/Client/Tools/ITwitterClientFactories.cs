namespace Sharebook.Identity.API.Client.Tools
{
    using System.Collections.Generic;

    using Sharebook.Common.DTO;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Common.Public.Models.RateLimits;
    using Sharebook.Identity.API.DTO;
    using Sharebook.Identity.API.Models;
    using Sharebook.Identity.API.Models.Authentication;
    using Sharebook.Identity.Domain.AggregatesModel.UserAggregate;

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
