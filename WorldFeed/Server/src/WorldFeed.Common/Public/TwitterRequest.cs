namespace WorldFeed.Common.Public
{
    using System;

    using WorldFeed.Common.Client;
    using WorldFeed.Common.Client.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Web;

    public class TwitterRequest : ITwitterRequest
    {
        private ITwitterQuery query;

        public TwitterRequest()
        {
            Query = new TwitterQuery();
            ExecutionContext = new TwitterExecutionContext
            {
                RequestFactory = () => new TwitterRequest()
            };
        }

        public TwitterRequest(ITwitterRequest source) : this()
        {
            if (source == null)
            {
                return;
            }

            Query = new TwitterQuery(source.Query);
            TwitterClientHandler = source.TwitterClientHandler;
            ExecutionContext = new TwitterExecutionContext(source.ExecutionContext);
        }

        public ITwitterQuery Query
        {
            get => this.query;
            set => this.query = value ?? throw new ArgumentException("Cannot set query to null");
        }

        public ITwitterExecutionContext ExecutionContext { get; set; }

        public ITwitterClientHandler TwitterClientHandler { get; set; }
    }
}
