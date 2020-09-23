namespace WorldFeed.Upload.Client
{
    using WorldFeed.Upload.API.Application.Requesters;
    using WorldFeed.Upload.Application.Requesters;

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
