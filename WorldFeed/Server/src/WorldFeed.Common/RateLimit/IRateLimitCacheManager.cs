namespace WorldFeed.Common.RateLimit
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Models.Authentication;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Models.RateLimits;
    using WorldFeed.Common.Public.Parameters.HelpClient;

    /// <summary>
    /// Proxy used to access and refresh the rate limits cache.
    /// </summary>
    public interface IRateLimitCacheManager
    {
        IRateLimitCache RateLimitCache { get; }
        IRateLimitsClient RateLimitsClient { get; set; }

        /// <summary>
        /// Return the rate limits for a specific query.
        /// If the query url cannot be mapped, a new one is created in the OtherQueryRateLimits.
        /// If the credentials rate limits are not located in the cache, they will be retrieved from Twitter.
        /// </summary>
        Task<IEndpointRateLimit> GetQueryRateLimitAsync(IGetEndpointRateLimitsParameters parameters, IReadOnlyTwitterCredentials credentials);


        /// <summary>
        /// Return the all the rate limits for a specific set of credentials.
        /// If the rate limits are not located in the cache, they will be retrieved from Twitter.
        /// </summary>
        Task<ICredentialsRateLimits> GetCredentialsRateLimitsAsync(IReadOnlyTwitterCredentials credentials);

        /// <summary>
        /// Update the rate limit cache with a specific set of rate limits.
        /// </summary>
        Task UpdateCredentialsRateLimitsAsync(IReadOnlyTwitterCredentials credentials, ICredentialsRateLimits credentialsRateLimits);

        Task<ICredentialsRateLimits> RefreshCredentialsRateLimitsAsync(IReadOnlyTwitterCredentials credentials);

        /// <summary>
        /// Returns whether the rate limits should be refreshed to retrieve
        /// a specific endpoint information
        /// </summary>
        bool ShouldEndpointCacheBeUpdated(IEndpointRateLimit rateLimit);
    }
}
