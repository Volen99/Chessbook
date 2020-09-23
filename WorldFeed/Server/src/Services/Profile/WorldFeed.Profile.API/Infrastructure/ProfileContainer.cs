namespace WorldFeed.Profile.Infrastructure
{
    using System;

    using WorldFeed.Common.Public.Events;
    using WorldFeed.Profile.Infrastructure.Inject;

    /// <summary>
    /// For super users only. Change Tweetinvi internal mechanisms.
    /// </summary>
    public static class ProfileContainer
    {
        public static IProfileContainer Container;

        /// <summary>
        /// Event raised before the registration completes so that you can override registered classes.
        /// Doing so allow you to force Tweetinvi to use your own set of class instead of the one designed by the application.
        /// </summary>
        public static event EventHandler<ProfileContainerEventArgs> BeforeRegistrationComplete;

        static ProfileContainer()
        {
            Container = new Inject.ProfileContainer();
            Container.BeforeRegistrationCompletes += ContainerOnBeforeRegistrationCompletes;
        }

        private static void ContainerOnBeforeRegistrationCompletes(object sender, ProfileContainerEventArgs args)
        {
            var handlers = BeforeRegistrationComplete;
            if (handlers != null)
            {
                handlers.Invoke(sender, args);
            }

            Container.BeforeRegistrationCompletes -= ContainerOnBeforeRegistrationCompletes;
        }

        private static readonly object _resolveLock = new object();

        public static void AddModule(IProfileModule module)
        {
            lock (_resolveLock)
            {
                var updatedContainer = new Inject.ProfileContainer(Container);
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
