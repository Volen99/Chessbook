namespace Sharebook.Identity.API.Application.IntegrationEvents.Events
{
    using System;

    using Sharebook.Identity.API.Infrastructure.Inject;

    /// <summary>
    /// Event informing of operations being performed on a container lifecycle.
    /// <para>This is for advance use cases and debugging of the library</para>
    /// </summary>
    public class IdentityContainerEventArgs : EventArgs
    {
        public IdentityContainerEventArgs(IIdentityContainer identityContainer)
        {
            this.IdentityContainer = identityContainer;
        }

        public IIdentityContainer IdentityContainer { get; }
    }
}
