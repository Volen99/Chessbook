namespace WorldFeed.Post.API.Events
{
    using System;

    using WorldFeed.Post.API.Infrastructure.Inject.Contracts;

    /// <summary>
    /// Event informing of operations being performed on a container lifecycle.
    /// <para>This is for advance use cases and debugging of the library</para>
    /// </summary>
    public class PostContainerEventArgs : EventArgs
    {
        public PostContainerEventArgs(IPostContainer postContainer)
        {
            PostContainer = postContainer;
        }

        public IPostContainer PostContainer { get; }
    }
}
