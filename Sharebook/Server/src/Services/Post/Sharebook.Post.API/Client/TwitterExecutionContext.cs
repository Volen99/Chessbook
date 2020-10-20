namespace Sharebook.Post.API.Client
{
    using System;
    using Sharebook.Common.Settings;
    using Sharebook.Post.API.Infrastructure.Inject.Contracts;
    using Sharebook.Post.Application.Requesters;

    public interface ITwitterExecutionContext : ITweetinviSettings
    {
        Func<ITwitterRequest> RequestFactory { get; set; }
        IPostContainer Container { get; set; }
        ITwitterClientEvents Events { get; }
    }

    public class TwitterExecutionContext : TweetinviSettings, ITwitterExecutionContext
    {
        public TwitterExecutionContext()
        {
            RequestFactory = () => throw new InvalidOperationException($"You cannot run contextual operations without configuring the {nameof(RequestFactory)} of the ExecutionContext");
        }

        public TwitterExecutionContext(ITwitterExecutionContext context) : base(context)
        {
            RequestFactory = context.RequestFactory;
            Container = context.Container;
            Events = context.Events;
        }

        public Func<ITwitterRequest> RequestFactory { get; set; }
        public IPostContainer Container { get; set; }
        public ITwitterClientEvents Events { get; set; }
    }
}
