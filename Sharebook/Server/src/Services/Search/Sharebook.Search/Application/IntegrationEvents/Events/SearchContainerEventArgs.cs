namespace Sharebook.Search.Application.IntegrationEvents.Events
{
    using System;

    using Sharebook.Search.Infrastructure.Inject;

    /// <summary>
    /// Event informing of operations being performed on a container lifecycle.
    /// <para>This is for advance use cases and debugging of the library</para>
    /// </summary>
    public class SearchContainerEventArgs : EventArgs
    {
        public SearchContainerEventArgs(ISearchContainer searchContainer)
        {
            this.SearchContainer = searchContainer;
        }

        public ISearchContainer SearchContainer { get; set; }
    }
}
