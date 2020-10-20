namespace Sharebook.Identity.API.Client
{
    using System;

    using Sharebook.Common.Events;
    using Sharebook.Common.Settings;
    using Sharebook.Identity.API.Application.Requesters;
    using Sharebook.Identity.API.Infrastructure.Inject;

    public interface ITwitterExecutionContext : ITweetinviSettings
    {
        Func<ITwitterRequest> RequestFactory { get; set; }

        IIdentityContainer Container { get; set; }

        ITwitterClientEvents Events { get; }
    }
}
