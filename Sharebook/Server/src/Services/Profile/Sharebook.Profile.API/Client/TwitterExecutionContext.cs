namespace Sharebook.Profile.Client
{
    using System;

    using Sharebook.Common.Events;
    using Sharebook.Common.Settings;
    using Sharebook.Profile.Application.Requesters;
    using Sharebook.Profile.Infrastructure.Inject;

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

        public IProfileContainer Container { get; set; }

        public ITwitterClientEvents Events { get; set; }
    }
}
