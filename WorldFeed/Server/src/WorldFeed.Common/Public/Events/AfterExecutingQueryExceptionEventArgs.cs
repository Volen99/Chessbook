namespace WorldFeed.Common.Public.Events
{
    using WorldFeed.Common.Public.Exceptions;
    using WorldFeed.Common.Public.Models.Interfaces;

    /// <summary>
    /// Event raised to inform that a request just failed its execution
    /// </summary>
    public class AfterExecutingQueryExceptionEventArgs : AfterExecutingQueryEventArgs
    {
        public AfterExecutingQueryExceptionEventArgs(ITwitterQuery twitterQuery, TwitterException exception)
            : base(twitterQuery, null, null)
        {
            Exception = exception;
        }
    }
}
