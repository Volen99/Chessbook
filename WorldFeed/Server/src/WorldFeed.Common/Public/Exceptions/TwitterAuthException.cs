namespace WorldFeed.Common.Public.Exceptions
{
    using WorldFeed.Common.Web;

    /// <summary>
    /// This exception informs that the authentication process failed.
    /// </summary>
    public class TwitterAuthException : TwitterResponseException
    {
        public TwitterAuthException(ITwitterResult twitterResult, string message) : base(twitterResult, message)
        {
        }
    }
}
