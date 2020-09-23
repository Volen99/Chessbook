namespace WorldFeed.Message.Application.IntegrationEvents.Events
{
    using System;

    using WorldFeed.Message.Infrastructure.Inject;

    /// <summary>
    /// Event informing of operations being performed on a container lifecycle.
    /// <para>This is for advance use cases and debugging of the library</para>
    /// </summary>
    public class MessageContainerEventArgs : EventArgs
    {
        public MessageContainerEventArgs(IMessageContainer messageContainer)
        {
            this.MessageContainer = messageContainer;
        }

        public IMessageContainer MessageContainer { get; }
    }
}
