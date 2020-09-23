namespace WorldFeed.Profile.Client
{
    using WorldFeed.Profile.Application.Requesters;
    using WorldFeed.Profile.Controllers;

    public interface IRawExecutors
    {
        /// <summary>
        /// Client to execute all actions related with media upload
        /// </summary>
        IUploadRequester Upload { get; }
    }
}
