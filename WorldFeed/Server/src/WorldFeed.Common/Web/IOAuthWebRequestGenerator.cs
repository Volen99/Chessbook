namespace WorldFeed.Common.Web
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;
    using WorldFeed.Common.Models.Authentication;
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Models.Interfaces;
    using HttpMethod = WorldFeed.Common.Public.Models.Enums.HttpMethod;

    /// <summary>
    /// Generator of HttpWebRequest using OAuth specification
    /// </summary>
    public interface IOAuthWebRequestGenerator
    {
        /// <summary>
        /// Generate an OAuth query parameter
        /// </summary>
        IOAuthQueryParameter GenerateParameter(string key, string value, bool requiredForSignature, bool requiredForHeader, bool isPartOfOAuthSecretKey);

        /// <summary>
        /// Generate all the query parameters for an application connection.
        /// </summary>
        IEnumerable<IOAuthQueryParameter> GenerateApplicationParameters(
            IReadOnlyConsumerCredentials temporaryCredentials,
            IAuthenticationRequest authRequest = null,
            IEnumerable<IOAuthQueryParameter> additionalParameters = null);

        /// <summary>
        /// Generate the authentication parameters from Twitter credentials.
        /// </summary>
        IEnumerable<IOAuthQueryParameter> GenerateParameters(IReadOnlyTwitterCredentials credentials, IEnumerable<IOAuthQueryParameter> additionalParameters = null);

        /// <summary>
        /// Generate authorization headers for a query with the specified OAuth fields.
        /// </summary>
        string GenerateAuthorizationHeader(Uri uri, HttpMethod httpMethod, IEnumerable<IOAuthQueryParameter> parameters);

        /// <summary>
        /// Generate authorization headers for a query with the specified OAuth fields.
        /// </summary>
        Task<string> SetTwitterQueryAuthorizationHeaderAsync(ITwitterQuery twitterQuery);

        Task<string> GenerateAuthorizationHeaderAsync(
            Uri uri,
            HttpContent queryContent,
            HttpMethod httpMethod,
            IEnumerable<IOAuthQueryParameter> parameters);
    }
}
