namespace WorldFeed.Identity.API.Client
{
    using System;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Settings;
    using WorldFeed.Identity.API.Application.Requesters;
    using WorldFeed.Identity.API.Infrastructure.Inject;

    public interface ITwitterExecutionContext : ITweetinviSettings
    {
        Func<ITwitterRequest> RequestFactory { get; set; }

        IIdentityContainer Container { get; set; }

        ITwitterClientEvents Events { get; }
    }
}
