namespace WorldFeed.Post.API.Events
{
    using System;

    using WorldFeed.Common.Public.Models.RateLimits;

    public class QueryAwaitingEventArgs : EventArgs
    {
        private readonly string query;
        private readonly IEndpointRateLimit queryRateLimit;

        public QueryAwaitingEventArgs(string query, IEndpointRateLimit queryRateLimit)
        {
            this.query = query;
            this.queryRateLimit = queryRateLimit;
        }

        public string Query => query;

        public IEndpointRateLimit QueryRateLimit => queryRateLimit;

        public DateTime ResetDateTime => queryRateLimit.ResetDateTime;

        public int ResetInMilliseconds => (int)queryRateLimit.ResetDateTimeInMilliseconds;
    }
}
