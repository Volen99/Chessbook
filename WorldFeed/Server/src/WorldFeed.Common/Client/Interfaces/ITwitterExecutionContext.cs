namespace WorldFeed.Common.Client.Interfaces
{
    using System;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Settings;

    public interface ITwitterExecutionContext : ITweetinviSettings
    {
        Func<ITwitterRequest> RequestFactory { get; set; }

        ITweetinviContainer Container { get; set; }

        ITwitterClientEvents Events { get; }
    }
}
