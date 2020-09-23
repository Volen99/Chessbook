namespace WorldFeed.Identity.API.Credentials.RateLimit
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Models.RateLimits;
    using WorldFeed.Common.Public.Parameters.HelpClient;
    using WorldFeed.Identity.API.Application.Parameters.HelpClient;
    using WorldFeed.Identity.API.Application.Parameters.RateLimitsClient;
    using WorldFeed.Identity.API.Application.Requesters;
    using WorldFeed.Identity.API.Auth.Authentication;
    using WorldFeed.Identity.API.Client;
    using WorldFeed.Identity.API.RateLimit;

    public class RateLimitAwaiter : IRateLimitAwaiter
    {
        private readonly IRateLimitCacheManager rateLimitCacheManager;
        private readonly ITaskDelayer taskDelayer;
        private readonly IWeakEvent<EventHandler<QueryAwaitingEventArgs>> queryAwaitingForRateLimitWeakEvent;

        public RateLimitAwaiter(IRateLimitCacheManager rateLimitCacheManager, ITaskDelayer taskDelayer,
            IWeakEvent<EventHandler<QueryAwaitingEventArgs>> queryAwaitingForRateLimitWeakEvent)
        {
            this.rateLimitCacheManager = rateLimitCacheManager;
            this.taskDelayer = taskDelayer;
            this.queryAwaitingForRateLimitWeakEvent = queryAwaitingForRateLimitWeakEvent;
        }

        public event EventHandler<QueryAwaitingEventArgs> QueryAwaitingForRateLimit
        {
            add => this.queryAwaitingForRateLimitWeakEvent.AddHandler(value);
            remove => this.queryAwaitingForRateLimitWeakEvent.RemoveHandler(value);
        }

        public Task WaitForCredentialsRateLimitAsync(ITwitterRequest request)
        {
            var credentialsRateLimitParameters = new WaitForCredentialsRateLimitParameters(request.Query.Url)
            {
                Credentials = request.Query.TwitterCredentials,
                ExecutionContext = request.ExecutionContext,
                From = RateLimitsSource.CacheOnly
            };

            return WaitForCredentialsRateLimitAsync(credentialsRateLimitParameters);
        }

        public async Task WaitForCredentialsRateLimitAsync(IWaitForCredentialsRateLimitParameters parameters)
        {
            var queryRateLimit = await this.rateLimitCacheManager.GetQueryRateLimitAsync(new GetEndpointRateLimitsParameters(parameters.Url, parameters.From), parameters.Credentials).ConfigureAwait(false);
            if (queryRateLimit == null)
            {
                return;
            }

            var timeToWait = GetTimeToWaitFromQueryRateLimit(queryRateLimit, parameters.ExecutionContext);
            if (timeToWait > TimeSpan.Zero)
            {
                this.queryAwaitingForRateLimitWeakEvent.Raise(this, new QueryAwaitingEventArgs(parameters.Url, queryRateLimit, parameters.Credentials));
                await this.taskDelayer.Delay(timeToWait).ConfigureAwait(false);
            }
        }

        public async Task WaitForCredentialsRateLimitAsync(IEndpointRateLimit queryRateLimit, IReadOnlyTwitterCredentials credentials, ITwitterExecutionContext executionContext)
        {
            var timeToWait = GetTimeToWaitFromQueryRateLimit(queryRateLimit, executionContext);
            if (timeToWait > TimeSpan.Zero)
            {
                this.queryAwaitingForRateLimitWeakEvent.Raise(this, new QueryAwaitingEventArgs(null, queryRateLimit, credentials));
                await this.taskDelayer.Delay(timeToWait).ConfigureAwait(false);
            }
        }

        public async Task<TimeSpan> TimeToWaitBeforeTwitterRequestAsync(string query, IReadOnlyTwitterCredentials credentials, ITwitterExecutionContext twitterExecutionContext)
        {
            var queryRateLimits = await this.rateLimitCacheManager.GetQueryRateLimitAsync(new GetEndpointRateLimitsParameters(query), credentials).ConfigureAwait(false);
            return GetTimeToWaitFromQueryRateLimit(queryRateLimits, twitterExecutionContext);
        }

        public TimeSpan GetTimeToWaitFromQueryRateLimit(IEndpointRateLimit queryRateLimit, ITwitterExecutionContext executionContext)
        {
            if (queryRateLimit == null || queryRateLimit.Remaining > 0)
            {
                return TimeSpan.Zero;
            }

            var timeToWaitInMs = (int) Math.Ceiling(queryRateLimit.ResetDateTimeInMilliseconds) + executionContext.RateLimitWaitFudge.TotalMilliseconds;
            return TimeSpan.FromMilliseconds(timeToWaitInMs);
        }
    }
}
