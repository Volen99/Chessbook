namespace WorldFeed.Common.Public.Events
{
    using System;

    using WorldFeed.Common.Public.Models.Interfaces;

    /// <summary>
    /// Event raised to inform that a request is starting its execution
    /// </summary>
    public class BeforeExecutingRequestEventArgs : QueryExecutionEventArgs
    {
        public BeforeExecutingRequestEventArgs(ITwitterQuery twitterQuery) : base(twitterQuery)
        {
            BeforeExecutingDateTime = DateTime.Now;
        }

        public DateTime BeforeExecutingDateTime { get; set; }

        /// <summary>
        /// If set to true this query won't be executed.
        /// </summary>
        public bool Cancel { get; set; }
    }
}
