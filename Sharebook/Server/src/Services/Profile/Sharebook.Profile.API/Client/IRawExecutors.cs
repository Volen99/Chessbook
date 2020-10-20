namespace Sharebook.Profile.Client
{
    using Sharebook.Profile.Application.Requesters;
    using Sharebook.Profile.Controllers;

    public interface IRawExecutors
    {
        /// <summary>
        /// Client to execute all actions related with media upload
        /// </summary>
        IUploadRequester Upload { get; }
    }
}
