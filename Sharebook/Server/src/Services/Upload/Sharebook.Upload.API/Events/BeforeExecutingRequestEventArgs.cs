namespace Sharebook.Upload.Events
{
    using System;

    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Upload.Application.Query;

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
