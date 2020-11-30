﻿namespace Sharebook.Post.API.Events
{
    using System;
    using System.Collections.Generic;

    using Sharebook.Storage.Application.Query;
    using Sharebook.Storage.Exceptions;

    /// <summary>
    /// Event raised to inform that a request completed its execution
    /// </summary>
    public class AfterExecutingQueryEventArgs : QueryExecutionEventArgs
    {
        public AfterExecutingQueryEventArgs(ITwitterQuery twitterQuery, string httpContent, Dictionary<string, IEnumerable<string>> httpHeaders)
            : base(twitterQuery)
        {
            HttpContent = httpContent;
            HttpHeaders = httpHeaders;
            CompletedDateTime = DateTime.Now;
        }

        /// <summary>
        /// Result returned by Twitter.
        /// </summary>
        public string HttpContent { get; }

        /// <summary>
        /// Headers returned by Twitter.
        /// </summary>
        public Dictionary<string, IEnumerable<string>> HttpHeaders { get; }

        /// <summary>
        /// Exact DateTime when the request completed.
        /// </summary>
        public DateTime CompletedDateTime { get; set; }

        /// <summary>
        /// Whether the request has been successful.
        /// </summary>
        public bool Success => HttpContent != null;

        /// <summary>
        /// Exception Raised by Twitter
        /// </summary>
        public TwitterException Exception { get; protected set; }
    }
}
