namespace WorldFeed.Post.API.Client
{
    using WorldFeed.Post.Client.Requesters;

    public class RawExecutors : IRawExecutors
    {
        private readonly ITimelinesRequester timelinesRequester;
        private readonly ITweetsRequester tweetsRequester;

        public RawExecutors(ITimelinesRequester timelinesRequester, ITweetsRequester tweetsRequester)
        {
            this.timelinesRequester = timelinesRequester;
            this.tweetsRequester = tweetsRequester;
        }

        public ITimelinesRequester Timelines => this.timelinesRequester;

        public ITweetsRequester Tweets => this.tweetsRequester;
    }
}
