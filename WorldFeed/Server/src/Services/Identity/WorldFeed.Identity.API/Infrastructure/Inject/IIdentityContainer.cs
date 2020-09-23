namespace WorldFeed.Identity.API.Infrastructure.Inject
{
    using System;
    using System.Collections.Generic;
    using Autofac;

    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Identity.API.Application.IntegrationEvents.Events;

    public interface IIdentityContainer
    {
        bool IsInitialized { get; }

        List<Action<ContainerBuilder>> RegistrationActions { get; }

        ITwitterClient AssociatedClient { get; set; }

        event EventHandler<IdentityContainerEventArgs> BeforeRegistrationCompletes;

        void Initialize();

        void RegisterType<TRegistered, TTo>(RegistrationLifetime registrationLifetime = RegistrationLifetime.InstancePerResolve) where TTo : TRegistered;

        void RegisterGeneric(Type sourceType, Type targetType, RegistrationLifetime registrationLifetime = RegistrationLifetime.InstancePerResolve);

        void RegisterInstance(Type targetType, object value);

        void RegisterDecorator<TDecorator, TDecorated>() where TDecorator : TDecorated;

        T Resolve<T>(params IConstructorNamedParameter[] parameters);
    }
}
