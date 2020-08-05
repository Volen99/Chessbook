﻿namespace WorldFeed.Credentials.RateLimit
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using WorldFeed.Common.RateLimit;
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Parameters.HelpClient;
    using WorldFeed.Common.Models.Authentication;

    public class RateLimitUpdaterFactory : IRateLimitUpdaterFactory
    {
        public IRateLimitUpdater Create(IRateLimitCacheManager rateLimitCacheManager)
        {
            return new RateLimitUpdater(rateLimitCacheManager);
        }
    }

    public class RateLimitUpdater : IRateLimitUpdater
    {
        private readonly IRateLimitCacheManager rateLimitCacheManager;

        public RateLimitUpdater(IRateLimitCacheManager rateLimitCacheManager)
        {
            this.rateLimitCacheManager = rateLimitCacheManager;
        }

        public async Task QueryExecutedAsync(string query, ITwitterCredentials credentials, int numberOfRequests = 1)
        {
            var getRateLimitsFromCacheParameters = new GetEndpointRateLimitsParameters(query, RateLimitsSource.CacheOnly);
            var rateLimit = await this.rateLimitCacheManager.GetQueryRateLimitAsync(getRateLimitsFromCacheParameters, credentials).ConfigureAwait(false);

            if (rateLimit != null)
            {
                var newRemainingValue = Math.Max(rateLimit.Remaining - numberOfRequests, 0);
                rateLimit.Remaining = newRemainingValue;
            }
        }

        public async Task QueryExecutedAsync(string query, ITwitterCredentials credentials, Dictionary<string, IEnumerable<string>> rateLimitHeaders)
        {
            if (rateLimitHeaders != null && rateLimitHeaders.Count > 0)
            {
                var rateLimit = await this.rateLimitCacheManager.GetQueryRateLimitAsync(new GetEndpointRateLimitsParameters(query), credentials).ConfigureAwait(false);

                // If the user runs out of RateLimit requests
                if (rateLimit == null)
                {
                    return;
                }

                IEnumerable<string> limitHeaders;
                if (rateLimitHeaders.TryGetValue("x-rate-limit-limit", out limitHeaders))
                {
                    var limit = limitHeaders.FirstOrDefault();
                    if (limit != null)
                    {
                        rateLimit.Limit = int.Parse(limit);
                    }
                }

                IEnumerable<string> remainingHeaders;
                if (rateLimitHeaders.TryGetValue("x-rate-limit-remaining", out remainingHeaders))
                {
                    var remaining = remainingHeaders.FirstOrDefault();
                    if (remaining != null)
                    {
                        rateLimit.Remaining = int.Parse(remaining);
                    }
                }

                IEnumerable<string> resetHeaders;
                if (rateLimitHeaders.TryGetValue("x-rate-limit-reset", out resetHeaders))
                {
                    var reset = resetHeaders.FirstOrDefault();
                    if (reset != null)
                    {
                        rateLimit.Reset = int.Parse(reset);
                    }
                }
            }
            else
            {
                await QueryExecutedAsync(query, credentials).ConfigureAwait(false);
            }
        }

        public async Task ClearRateLimitsForQueryAsync(string query, IReadOnlyTwitterCredentials credentials)
        {

            var rateLimit = await this.rateLimitCacheManager.GetQueryRateLimitAsync(new GetEndpointRateLimitsParameters(query, RateLimitsSource.CacheOnly), credentials).ConfigureAwait(false);
            if (rateLimit != null)
            {
                rateLimit.Remaining = 0;
            }
        }
    }
}
