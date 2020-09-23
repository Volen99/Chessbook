namespace WorldFeed.Identity.API.Infrastructure
{
    using System;

    using WorldFeed.Identity.API.Application.IntegrationEvents.Events;
    using WorldFeed.Identity.API.Infrastructure.Inject;

    /// <summary>
    /// For super users only. Change Tweetinvi internal mechanisms.
    /// </summary>
    public static class IdentityContainer
    {
        public static IIdentityContainer Container;

        /// <summary>
        /// Event raised before the registration completes so that you can override registered classes.
        /// Doing so allow you to force Tweetinvi to use your own set of class instead of the one designed by the application.
        /// </summary>
        public static event EventHandler<IdentityContainerEventArgs> BeforeRegistrationComplete;

        static IdentityContainer()
        {
            this.Container = new WorldFeed.Identity.API.Infrastructure.Inject.IdentityContainer();
            Container.BeforeRegistrationCompletes += ContainerOnBeforeRegistrationCompletes;
        }

        private static void ContainerOnBeforeRegistrationCompletes(object sender, IdentityContainerEventArgs args)
        {
            var handlers = BeforeRegistrationComplete;
            if (handlers != null)
            {
                handlers.Invoke(sender, args);
            }

            Container.BeforeRegistrationCompletes -= ContainerOnBeforeRegistrationCompletes;
        }

        private static readonly object _resolveLock = new object();

        public static void AddModule(ITweetinviModule module)
        {
            lock (_resolveLock)
            {
                var updatedContainer = new WorldFeed.Identity.API.Infrastructure.Inject.IdentityContainer(Container);
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