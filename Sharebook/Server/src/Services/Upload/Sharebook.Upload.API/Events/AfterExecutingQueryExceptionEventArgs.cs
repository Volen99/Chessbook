namespace Sharebook.Upload.Events
{
    using Sharebook.Upload.Application.Query;
    using Sharebook.Upload.Exceptions;

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
