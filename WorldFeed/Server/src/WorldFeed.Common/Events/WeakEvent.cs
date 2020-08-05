namespace WorldFeed.Common.Events
{
    using System;
    using System.Collections.Generic;

    public interface IWeakEvent<TEventHandler>
    {
        void AddHandler(TEventHandler handler);
        void RemoveHandler(TEventHandler handler);
        void Raise(object sender, EventArgs e);
    }

    // Code taken from: http://tomlev2.wordpress.com/2010/05/17/c-a-simple-implementation-of-the-weakevent-pattern/
    public class WeakEvent<TEventHandler> : IWeakEvent<TEventHandler>
    {
        private readonly List<WeakDelegate<TEventHandler>> handlers;
        private readonly object syncRoot = new object();

        public WeakEvent()
        {
            this.handlers = new List<WeakDelegate<TEventHandler>>();
        }

        public virtual void AddHandler(TEventHandler handler)
        {
            Delegate d = (Delegate)(object)handler;
            lock (this.syncRoot)
            {
                this.handlers.Add(new WeakDelegate<TEventHandler>(d));
            }
        }

        public virtual void RemoveHandler(TEventHandler handler)
        {
            // Also remove "dead" (garbage collected) handlers
            WeakDelegate<TEventHandler>[] handlers;
            lock (this.syncRoot)
            {
                handlers = this.handlers.ToArray();
            }

            foreach (var deadHandler in handlers)
            {
                if (!deadHandler.IsAlive || deadHandler.Equals(handler))
                {
                    lock (this.syncRoot)
                    {
                        this.handlers.Remove(deadHandler);
                    }
                }
            }
        }

        public virtual void Raise(object sender, EventArgs e)
        {
            WeakDelegate<TEventHandler>[] handlers;
            lock (this.syncRoot)
            {
                handlers = this.handlers.ToArray();
            }

            foreach (var weakDelegate in handlers)
            {
                if (weakDelegate.IsAlive)
                {
                    weakDelegate.Invoke(sender, e);
                }
                else
                {
                    lock (this.syncRoot)
                    {
                        this.handlers.Remove(weakDelegate);
                    }
                }
            }
        }

        protected List<WeakDelegate<TEventHandler>> Handlers
        {
            get
            {
                lock (this.syncRoot)
                {
                    return this.handlers;
                }
            }
        }
    }
}
