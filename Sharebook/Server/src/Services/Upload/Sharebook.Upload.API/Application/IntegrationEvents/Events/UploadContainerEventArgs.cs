namespace Sharebook.Common.Public.Events
{
    using System;

    using Sharebook.Upload.Infrastructure.Inject;
    using Sharebook.Upload.Infrastructure.Inject.Contracts;

    /// <summary>
    /// Event informing of operations being performed on a container lifecycle.
    /// <para>This is for advance use cases and debugging of the library</para>
    /// </summary>
    public class UploadContainerEventArgs : EventArgs
    {
        public UploadContainerEventArgs(IUploadContainer uploadContainer)
        {
            this.UploadContainer = uploadContainer;
        }

        public IUploadContainer UploadContainer { get; }
    }
}
