namespace Sharebook.Profile.Client
{
    using System;

    using Sharebook.Common.Events;
    using Sharebook.Common.Settings;
    using Sharebook.Profile.Application.Requesters;
    using Sharebook.Profile.Infrastructure.Inject;

    public interface ITwitterExecutionContext : ITweetinviSettings
    {
        Func<ITwitterRequest> RequestFactory { get; set; }

        IProfileContainer Container { get; set; }

        ITwitterClientEvents Events { get; }
    }
}
