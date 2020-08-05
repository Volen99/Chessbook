namespace WorldFeed.Common.Client
{
    using System;

    using WorldFeed.Common.Client.Interfaces;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Settings;

    public class TwitterExecutionContext : TweetinviSettings, ITwitterExecutionContext
    {
        public TwitterExecutionContext()
        {
            RequestFactory = () => throw new InvalidOperationException($"You cannot run contextual operations without configuring the {nameof(this.RequestFactory)} of the ExecutionContext");
        }

        public TwitterExecutionContext(ITwitterExecutionContext context)
            : base(context)
        {
            RequestFactory = context.RequestFactory;
            Container = context.Container;
            Events = context.Events;
        }

        public Func<ITwitterRequest> RequestFactory { get; set; }

        public ITweetinviContainer Container { get; set; }

        public ITwitterClientEvents Events { get; set; }
    }
}
