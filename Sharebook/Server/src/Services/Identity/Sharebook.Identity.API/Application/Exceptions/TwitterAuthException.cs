namespace Sharebook.Identity.API.Application.Exceptions
{
    using Sharebook.Identity.API.Application.Exceptionsc;
    using Sharebook.Identity.API.Application.Web;

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
