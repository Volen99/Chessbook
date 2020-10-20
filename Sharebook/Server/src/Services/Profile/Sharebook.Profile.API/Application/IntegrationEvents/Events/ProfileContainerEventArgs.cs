namespace Sharebook.Common.Public.Events
{
    using System;

    using Sharebook.Profile.Infrastructure.Inject;

    /// <summary>
    /// Event informing of operations being performed on a container lifecycle.
    /// <para>This is for advance use cases and debugging of the library</para>
    /// </summary>
    public class ProfileContainerEventArgs : EventArgs
    {
        public ProfileContainerEventArgs(IProfileContainer profileContainer)
        {
            this.ProfileContainer = profileContainer;
        }

        public IProfileContainer ProfileContainer { get; }
    }
}
