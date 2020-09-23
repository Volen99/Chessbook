namespace WorldFeed.Upload.Client
{
    using WorldFeed.Upload.API.Application.Requesters;
    using WorldFeed.Upload.Application.Requesters;

    public class RawExecutors : IRawExecutors
    {
        private readonly IUploadRequester uploadRequester;
        private readonly ITweetsRequester tweetsRequester;

        public RawExecutors(IUploadRequester uploadRequester, ITweetsRequester tweetsRequester)
        {
            this.uploadRequester = uploadRequester;
            this.tweetsRequester = tweetsRequester;
        }

        public IUploadRequester Upload => this.uploadRequester;

        public ITweetsRequester Tweets => this.tweetsRequester;
    }
}
