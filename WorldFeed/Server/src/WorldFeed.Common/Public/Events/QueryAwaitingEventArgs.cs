namespace WorldFeed.Common.Public.Events
{
    using System;

    using WorldFeed.Common.Models.Authentication;
    using WorldFeed.Common.Public.Models.RateLimits;

    public class QueryAwaitingEventArgs : EventArgs
    {
        private readonly string query;
        private readonly IEndpointRateLimit queryRateLimit;
        private readonly IReadOnlyTwitterCredentials twitterCredentials;

        public QueryAwaitingEventArgs(
            string query,
            IEndpointRateLimit queryRateLimit,
            IReadOnlyTwitterCredentials twitterCredentials)
        {
            this.query = query;
            this.queryRateLimit = queryRateLimit;
            this.twitterCredentials = twitterCredentials;
        }

        public string Query => query;
        public IEndpointRateLimit QueryRateLimit => queryRateLimit;
        public IReadOnlyTwitterCredentials Credentials => twitterCredentials;
        public DateTime ResetDateTime => queryRateLimit.ResetDateTime;
        public int ResetInMilliseconds => (int)queryRateLimit.ResetDateTimeInMilliseconds;
    }
}
