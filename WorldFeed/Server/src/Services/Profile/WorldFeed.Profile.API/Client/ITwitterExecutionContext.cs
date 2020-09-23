namespace WorldFeed.Profile.Client
{
    using System;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Settings;
    using WorldFeed.Profile.Application.Requesters;
    using WorldFeed.Profile.Infrastructure.Inject;

    public interface ITwitterExecutionContext : ITweetinviSettings
    {
        Func<ITwitterRequest> RequestFactory { get; set; }

        IProfileContainer Container { get; set; }

        ITwitterClientEvents Events { get; }
    }
}
