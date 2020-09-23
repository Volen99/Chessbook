//namespace WorldFeed.Common.RateLimit
//{
//    using System.Threading.Tasks;

//    using WorldFeed.Common.Public.Models.RateLimits;
//    using WorldFeed.Identity.API.Auth.Authentication;

//    /// <summary>
//    /// Cache storing the RateLimits to reduce the number of access to the Twitter API rate limits.
//    /// Access to the rate limit cache should be done via the RateLimitCacheManager.
//    /// </summary>
//    public interface IRateLimitCache
//    {
//        /// <summary>
//        /// Clear the rate limits entry associated with a specific set of credentials.
//        /// </summary>
//        Task ClearAsync(IReadOnlyTwitterCredentials credentials);

//        /// <summary>
//        /// Clear all the rate limit entries from the cache.
//        /// </summary>
//        Task ClearAllAsync();

//        /// <summary>
//        /// Manually set a rate limit entry for a specific set of credentials.
//        /// </summary>
//        Task RefreshEntryAsync(IReadOnlyTwitterCredentials credentials, ICredentialsRateLimits newCredentialsRateLimits);

//        /// <summary>
//        /// Return the rate limits entry for a set of credentials.
//        /// </summary>
//        Task<ICredentialsRateLimits> GetCredentialsRateLimitsAsync(IReadOnlyTwitterCredentials credentials);
//    }
//}
