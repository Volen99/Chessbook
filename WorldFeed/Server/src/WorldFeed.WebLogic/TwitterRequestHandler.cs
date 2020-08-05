namespace WorldFeed.WebLogic
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Exceptions;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.RateLimits;
    using WorldFeed.Common.Public.Parameters.HelpClient;
    using WorldFeed.Common.RateLimit;
    using WorldFeed.Common.Settings;
    using WorldFeed.Common.Web;

    public interface ITwitterRequestHandler
    {
        Task<ITwitterResponse> ExecuteQueryAsync(ITwitterRequest request);

        Task PrepareTwitterRequestAsync(ITwitterRequest request);
    }

    public class TwitterRequestHandler : ITwitterRequestHandler
    {
        private readonly IRateLimitAwaiter rateLimitAwaiter;
        private readonly IRateLimitCacheManager rateLimitCacheManager;
        private readonly IRateLimitUpdaterFactory rateLimitUpdaterFactory;
        private readonly IWebRequestExecutor webRequestExecutor;

        public TwitterRequestHandler(IRateLimitAwaiter rateLimitAwaiter, IRateLimitCacheManager rateLimitCacheManager, IRateLimitUpdaterFactory rateLimitUpdaterFactory,
            IWebRequestExecutor webRequestExecutor)
        {
            this.rateLimitAwaiter = rateLimitAwaiter;
            this.rateLimitCacheManager = rateLimitCacheManager;
            this.rateLimitUpdaterFactory = rateLimitUpdaterFactory;
            this.webRequestExecutor = webRequestExecutor;
        }

        public async Task<ITwitterResponse> ExecuteQueryAsync(ITwitterRequest request)
        {
            var rateLimitUpdater = this.rateLimitUpdaterFactory.Create(this.rateLimitCacheManager);

            await PrepareTwitterRequestAsync(request).ConfigureAwait(false);

            var beforeQueryExecuteEventArgs = new BeforeExecutingRequestEventArgs(request.Query);
            request.ExecutionContext.Events.RaiseBeforeWaitingForQueryRateLimits(beforeQueryExecuteEventArgs);

            if (beforeQueryExecuteEventArgs.Cancel)
            {
                throw new OperationCanceledException("Operation was cancelled intentionally.");
            }

            await WaitBeforeExecutingQueryAsync(request).ConfigureAwait(false);

            request.ExecutionContext.Events.RaiseBeforeExecutingQuery(beforeQueryExecuteEventArgs);

            try
            {
                ITwitterResponse twitterResponse;

                if (!(request.Query is IMultipartTwitterQuery)) // Append is Multipart
                {
                    twitterResponse = await this.webRequestExecutor.ExecuteQueryAsync(request, request.TwitterClientHandler).ConfigureAwait(false);
                }
                else
                {
                    twitterResponse = await this.webRequestExecutor.ExecuteMultipartQueryAsync(request).ConfigureAwait(false);
                }

                QueryCompleted(request, twitterResponse, rateLimitUpdater);

                return twitterResponse;
            }
            catch (TwitterException ex)
            {
                HandleException(request, ex, rateLimitUpdater);

                throw;
            }
        }

        public async Task PrepareTwitterRequestAsync(ITwitterRequest request)
        {
            var twitterQuery = request.Query; // 
            twitterQuery.Url = CleanupQueryUrl(twitterQuery.Url); // TODO : THIS LOGIC SHOULD HAPPEN BEFORE ARRIVING HERE

            // before clean up: {https://upload.twitter.com/1.1/media/upload.json?command=INIT&media_type=video%2Fmp4&total_bytes=67465&media_category=tweet_video}
            // after clean up:  "https://upload.twitter.com/1.1/media/upload.json?command=INIT&media_type=video%2Fmp4&total_bytes=67465&media_category=tweet_video"

            var rateLimitTrackerMode = request.ExecutionContext.RateLimitTrackerMode;
            if (rateLimitTrackerMode == RateLimitTrackerMode.None)
            {
                return;
            }

            // Use the RateLimitCacheManager instead of RateLimitHelper to get the queryRateLimits to ensure the cache is up to date!
            var credentialRateLimits = await this.rateLimitCacheManager.GetCredentialsRateLimitsAsync(twitterQuery.TwitterCredentials).ConfigureAwait(false);

            IEndpointRateLimit queryRateLimit = null;

            // If we were not able to retrieve the credentials few ms before there is no reason why it would work now.
            if (credentialRateLimits != null)
            {
                var getEndpointRateLimitsFromCache = new GetEndpointRateLimitsParameters(twitterQuery.Url, RateLimitsSource.CacheOnly);
                queryRateLimit = await this.rateLimitCacheManager.GetQueryRateLimitAsync(getEndpointRateLimitsFromCache, twitterQuery.TwitterCredentials).ConfigureAwait(false);
            }

            var timeToWait = this.rateLimitAwaiter.GetTimeToWaitFromQueryRateLimit(queryRateLimit, request.ExecutionContext);

            twitterQuery.CredentialsRateLimits = credentialRateLimits;
            twitterQuery.QueryRateLimit = queryRateLimit;
            twitterQuery.DateWhenCredentialsWillHaveTheRequiredRateLimits = DateTime.UtcNow.Add(timeToWait);
        }

        private async Task WaitBeforeExecutingQueryAsync(ITwitterRequest twitterRequest)
        {
            var twitterQuery = twitterRequest.Query;
            if (twitterQuery.DateWhenCredentialsWillHaveTheRequiredRateLimits == null)
            {
                return;
            }

            if (twitterRequest.ExecutionContext.RateLimitTrackerMode == RateLimitTrackerMode.TrackAndAwait)
            {
                await this.rateLimitAwaiter.WaitForCredentialsRateLimitAsync(twitterRequest).ConfigureAwait(false);
            }
        }

        #region Helper Methods

        private static string CleanupQueryUrl(string query)
        {
            var index = query.IndexOf("?", StringComparison.OrdinalIgnoreCase);
            if (index > 0)
            {
                if (query.Length == index + 1)
                {
                    query = query.Remove(index);
                    return query;
                }

                if (query.Length > index && query[index + 1] == '&')
                {
                    query = query.Remove(index + 1, 1);
                }
            }

            return query;
        }

        private void QueryCompleted(ITwitterRequest request, ITwitterResponse twitterResponse, IRateLimitUpdater rateLimitUpdater)
        {
            if (request.ExecutionContext.RateLimitTrackerMode != RateLimitTrackerMode.None)
            {
                var rateLimitHeaders = twitterResponse.Headers.Where(kvp => kvp.Key.StartsWith("x-rate-limit-")).ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

                rateLimitUpdater.QueryExecutedAsync(request.Query.Url, request.Query.TwitterCredentials, rateLimitHeaders);
            }

            request.ExecutionContext.Events.RaiseAfterExecutingQuery(new AfterExecutingQueryEventArgs(request.Query, twitterResponse.Content, twitterResponse.Headers));
        }

        private void HandleException(ITwitterRequest request, TwitterException exception, IRateLimitUpdater rateLimitUpdater)
        {
            var statusCode = exception.StatusCode;
            const int tooManyRequestStatusCode = 429;
            if (request.ExecutionContext.RateLimitTrackerMode != RateLimitTrackerMode.None && statusCode == tooManyRequestStatusCode)
            {
                rateLimitUpdater.ClearRateLimitsForQueryAsync(request.Query.Url, request.Query.TwitterCredentials);
            }

            request.ExecutionContext.Events.RaiseAfterExecutingQuery(new AfterExecutingQueryExceptionEventArgs(request.Query, exception));
        }

        #endregion
    }
}
