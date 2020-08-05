﻿namespace WorldFeed.Common.Public.Models.Authentication
{
    using WorldFeed.Common.Models.Authentication;

    /// <summary>
    /// User authentication request containing all information required for completing an authentication process
    /// </summary>
    public interface IAuthenticationRequest : IReadOnlyConsumerCredentialsWithoutBearer
    {
        /// <summary>
        /// Key required for user authentication.
        /// This key needs to be saved when getting the result of url redirect authentication
        /// </summary>
        string AuthorizationKey { get; set; }

        /// <summary>
        /// Secret required for user authentication
        /// This secret needs to be saved when getting the result of url redirect authentication
        /// </summary>
        string AuthorizationSecret { get; set; }

        /// <summary>
        /// Verification information received when a user accepts an application to use its account.
        /// If this value is changed manually it will overridden by Tweetinvi.
        /// </summary>
        string VerifierCode { get; set; }

        /// <summary>
        /// URL directing the user to Twitter authentication page for your application.
        /// </summary>
        string AuthorizationURL { get; set; }
    }
}
