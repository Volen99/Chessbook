namespace Sharebook.Post.Application.Requesters
{
    using System;

    using Sharebook.Post.API.Application.Query;
    using Sharebook.Post.API.Application.Web;
    using Sharebook.Post.API.Client;

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
