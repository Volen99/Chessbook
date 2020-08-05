namespace WorldFeed.Common.Public.Exceptions
{
    using WorldFeed.Common.Web;

    /// <summary>
    /// This exception informs that the authentication process failed.
    /// </summary>
    public class TwitterAuthAbortedException : TwitterAuthException
    {
        public TwitterAuthAbortedException(ITwitterResult twitterResult) : base(twitterResult, "Authentication did not proceed until the end")
        {
        }
    }
}
