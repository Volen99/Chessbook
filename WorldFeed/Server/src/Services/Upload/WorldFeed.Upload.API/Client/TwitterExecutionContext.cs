﻿namespace WorldFeed.Upload.Client
{
    using System;

    using WorldFeed.Common.Settings;
    using WorldFeed.Upload.Application.Requesters;
    using WorldFeed.Upload.Events;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;

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

        public IUploadContainer Container { get; set; }

        public ITwitterClientEvents Events { get; set; }
    }
}