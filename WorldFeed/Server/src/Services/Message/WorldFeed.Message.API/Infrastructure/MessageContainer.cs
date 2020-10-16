﻿namespace WorldFeed.Message.Infrastructure
{
    using System;

    using WorldFeed.Message.Application.IntegrationEvents.Events;
    using WorldFeed.Message.Infrastructure.Inject;

    /// <summary>
    /// For super users only. Change Tweetinvi internal mechanisms.
    /// </summary>
    public static class MessageContainer
    {
        public static IMessageContainer Container;

        /// <summary>
        /// Event raised before the registration completes so that you can override registered classes.
        /// Doing so allow you to force Tweetinvi to use your own set of class instead of the one designed by the application.
        /// </summary>
        public static event EventHandler<MessageContainerEventArgs> BeforeRegistrationComplete;

        static MessageContainer()
        {
            Container = new Inject.MessageContainer();
            Container.BeforeRegistrationCompletes += ContainerOnBeforeRegistrationCompletes;
        }

        private static void ContainerOnBeforeRegistrationCompletes(object sender, MessageContainerEventArgs args)
        {
            var handlers = BeforeRegistrationComplete;
            if (handlers != null)
            {
                handlers.Invoke(sender, args);
            }

            Container.BeforeRegistrationCompletes -= ContainerOnBeforeRegistrationCompletes;
        }

        private static readonly object _resolveLock = new object();

        public static void AddModule(IMessageModule module)
        {
            lock (_resolveLock)
            {
                var updatedContainer = new Inject.MessageContainer(Container);
                module.Initialize(updatedContainer);
                updatedContainer.Initialize();

                Container = updatedContainer;
            }
        }

        /// <summary>
        /// Allow you to retrieve any class used by Tweetinvi by specifying its interface.
        /// </summary>
        public static T Resolve<T>()
        {
            lock (_resolveLock)
            {
                if (!Container.IsInitialized)
                {
                    Container.Initialize();
                }

                return Container.Resolve<T>();
            }
        }
    }
}