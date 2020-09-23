namespace WorldFeed.Upload.Client
{
    using System;

    using WorldFeed.Common.Settings;
    using WorldFeed.Upload.Application.Requesters;
    using WorldFeed.Upload.Events;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;

    public interface ITwitterExecutionContext : ITweetinviSettings
    {
        Func<ITwitterRequest> RequestFactory { get; set; }

        IUploadContainer Container { get; set; }

        ITwitterClientEvents Events { get; }
    }
}
