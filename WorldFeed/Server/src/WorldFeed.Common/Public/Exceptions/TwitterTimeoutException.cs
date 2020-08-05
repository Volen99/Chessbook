namespace WorldFeed.Common.Public.Exceptions
{
    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Public.Models.Interfaces;

    public interface ITwitterTimeoutException : ITwitterException
    {
    }

    /// <summary>
    /// Exception raised when Twitter did not manage to respond to your request on time.
    /// </summary>
    public class TwitterTimeoutException : TwitterException, ITwitterTimeoutException
    {
        public TwitterTimeoutException(ITwitterRequest request)
            : base(request, $"{request.Query.Url} request timed out.")
        {
            TwitterDescription = $"Twitter was not able to perform your query within the Timeout limit of {request.Query.Timeout.TotalMilliseconds} ms.";
            WebException = null;
            StatusCode = 408;
            TwitterExceptionInfos = new ITwitterExceptionInfo[0];
        }
    }
}
