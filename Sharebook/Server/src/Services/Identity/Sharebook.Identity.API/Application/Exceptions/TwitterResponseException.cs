namespace Sharebook.Identity.API.Application.Exceptions
{
    using System;

    using Sharebook.Identity.API.Application.Web;

    public class TwitterResponseException : Exception
    {
        public ITwitterResult TwitterResult { get; }

        public TwitterResponseException(ITwitterResult twitterResult)
        {
            this.TwitterResult = twitterResult;
        }

        public TwitterResponseException(ITwitterResult twitterResult, string message) : base(message)
        {
            this.TwitterResult = twitterResult;
        }
    }
}
