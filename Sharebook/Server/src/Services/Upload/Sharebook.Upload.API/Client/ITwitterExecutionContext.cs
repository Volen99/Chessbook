namespace Sharebook.Upload.Client
{
    using System;

    using Sharebook.Common.Settings;
    using Sharebook.Upload.Application.Requesters;
    using Sharebook.Upload.Events;
    using Sharebook.Upload.Infrastructure.Inject.Contracts;

    public interface ITwitterExecutionContext : ITweetinviSettings
    {
        Func<ITwitterRequest> RequestFactory { get; set; }

        IUploadContainer Container { get; set; }

        ITwitterClientEvents Events { get; }
    }
}
