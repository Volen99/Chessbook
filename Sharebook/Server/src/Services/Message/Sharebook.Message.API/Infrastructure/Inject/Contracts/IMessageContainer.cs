namespace Sharebook.Message.Infrastructure.Inject
{
    using Autofac;
    using System;
    using System.Collections.Generic;

    using Sharebook.Common.InjectWorldFeed;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Message.Application.IntegrationEvents.Events;

    public interface IMessageContainer
    {
        bool IsInitialized { get; }
        List<Action<ContainerBuilder>> RegistrationActions { get; }
        ITwitterClient AssociatedClient { get; set; }
        event EventHandler<MessageContainerEventArgs> BeforeRegistrationCompletes;

        void Initialize();

        void RegisterType<TRegistered, TTo>(RegistrationLifetime registrationLifetime = RegistrationLifetime.InstancePerResolve) where TTo : TRegistered;
        void RegisterGeneric(Type sourceType, Type targetType, RegistrationLifetime registrationLifetime = RegistrationLifetime.InstancePerResolve);
        void RegisterInstance(Type targetType, object value);
        void RegisterDecorator<TDecorator, TDecorated>() where TDecorator : TDecorated;
        T Resolve<T>(params IConstructorNamedParameter[] parameters);
    }
}
