namespace Sharebook.Upload.Client
{
    using Sharebook.Upload.API.Application.Requesters;
    using Sharebook.Upload.Application.Requesters;

    public interface IRawExecutors
    {
        /// <summary>
        /// Client to execute all actions related with media upload
        /// </summary>
        IUploadRequester Upload { get; }

        /// <summary>
        /// Client to execute all actions related with tweets
        /// </summary>
        ITweetsRequester Tweets { get; }
    }
}
