namespace Sharebook.Book.Application.IntegrationEvents.Events
{
    using System;

    using Sharebook.Book.Infrastructure.Inject;

    /// <summary>
    /// Event informing of operations being performed on a container lifecycle.
    /// <para>This is for advance use cases and debugging of the library</para>
    /// </summary>
    public class BookContainerEventArgs : EventArgs
    {
        public BookContainerEventArgs(IBookContainer bookContainer)
        {
            this.BookContainer = bookContainer;
        }

        public IBookContainer BookContainer { get; set; }
    }
}
