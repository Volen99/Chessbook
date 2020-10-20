namespace Sharebook.Profile.Client
{
    using Sharebook.Profile.Application.Requesters;

    public class RawExecutors : IRawExecutors
    {
        private readonly IUploadRequester uploadRequester;

        public RawExecutors(IUploadRequester uploadRequester)
        {
            this.uploadRequester = uploadRequester;
        }

        public IUploadRequester Upload => this.uploadRequester;
    }
}
