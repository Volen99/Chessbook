namespace WorldFeed.Identity.API.Application.Exceptions
{
    using WorldFeed.Identity.API.Application.Exceptionsc;
    using WorldFeed.Identity.API.Application.Web;

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
