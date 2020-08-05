namespace WorldFeed.Common.Public.Exceptions
{
    using System;
    using WorldFeed.Common.Web;

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
