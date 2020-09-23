namespace WorldFeed.Common.Events
{
    using System;

    /// <summary>
    /// An exception that could not be handled by Tweetinvi was thrown
    /// Please report such errors on github
    /// </summary>
    public class UnexpectedExceptionThrownEvent
    {
        public UnexpectedExceptionThrownEvent(Exception exception)
        {
            this.Exception = exception;
        }

        public Exception Exception { get; }
    }
}
