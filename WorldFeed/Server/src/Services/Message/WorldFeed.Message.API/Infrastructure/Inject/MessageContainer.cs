namespace WorldFeed.Message.Infrastructure.Inject
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Autofac;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Message.API.Infrastructure.Inject;
    using WorldFeed.Message.Application.IntegrationEvents.Events;
    using WorldFeed.Message.Infrastructure.AutofacModules;

    public class MessageContainer : IMessageContainer
    {
        private IContainer container;
        private readonly ContainerBuilder containerBuilder;
        private readonly List<IMessageModule> moduleCatalog;

        public List<Action<ContainerBuilder>> RegistrationActions { get; }

        public ITwitterClient AssociatedClient { get; set; }

        private bool _isInitialized;

        public bool IsInitialized
        {
            get
            {
                lock (_lock)
                {
                    return _isInitialized;
                }
            }
            set
            {
                lock (_lock)
                {
                    _isInitialized = value;
                }
            }
        }

        public MessageContainer()
        {
            RegistrationActions = new List<Action<ContainerBuilder>>();

            this.containerBuilder = new ContainerBuilder();
            this.moduleCatalog = new List<IMessageModule>();

            RegisterModules();
            InitializeModules();
        }

        public MessageContainer(IMessageContainer container)
        {
            RegistrationActions = new List<Action<ContainerBuilder>>();
            this.containerBuilder = new ContainerBuilder();

            container.RegistrationActions.ForEach(register =>
            {
                register(this.containerBuilder);
                RegistrationActions.Add(register);
            });
        }

        public event EventHandler<MessageContainerEventArgs> BeforeRegistrationCompletes;

        private readonly object _lock = new object();

        public void Initialize()
        {
            lock (_lock)
            {
                if (IsInitialized)
                {
                    return;
                }

                this.Raise(BeforeRegistrationCompletes, new MessageContainerEventArgs(this));
                BuildContainer();
            }
        }

        public void BuildContainer()
        {
            lock (_lock)
            {
                if (IsInitialized)
                {
                    return;
                }

                this.container = this.containerBuilder.Build();
                IsInitialized = true;
            }
        }

        private void RegisterModules()
        {
            this.moduleCatalog.Add(new MessageModule());
            this.moduleCatalog.Add(new MessageControllersModule());
            this.moduleCatalog.Add(new MessageCoreModule(this));
            this.moduleCatalog.Add(new MessageLogicModule());
            this.moduleCatalog.Add(new MessageWebLogicModule());
        }

        private void InitializeModules()
        {
            foreach (var module in this.moduleCatalog)
            {
                module.Initialize(this);
            }
        }

        public virtual void RegisterType<TRegistered, TTo>(RegistrationLifetime registrationLifetime = RegistrationLifetime.InstancePerResolve) where TTo : TRegistered
        {
            if (IsInitialized)
            {
                throw new InvalidOperationException("Cannot update container after it was already initialized");
            }

            Action<ContainerBuilder> registrationAction;

            switch (registrationLifetime)
            {
                case RegistrationLifetime.InstancePerResolve:
                    registrationAction = builder => builder.RegisterType<TTo>().As<TRegistered>();
                    break;
                case RegistrationLifetime.InstancePerApplication:
                    registrationAction = builder => builder.RegisterType<TTo>().As<TRegistered>().SingleInstance();
                    break;
                default:
                    throw new NotSupportedException("This operation is not supported");
            }

            JsonPropertyConverterRepository.TryOverride<TRegistered, TTo>();
            JsonPropertiesConverterRepository.TryOverride<TRegistered, TTo>();

            registrationAction(this.containerBuilder);
            RegistrationActions.Add(registrationAction);
        }

        public virtual void RegisterGeneric(Type sourceType, Type targetType, RegistrationLifetime registrationLifetime = RegistrationLifetime.InstancePerResolve)
        {
            if (IsInitialized)
            {
                throw new InvalidOperationException("Cannot update container after it was already initialized");
            }


            Action<ContainerBuilder> registrationAction;

            switch (registrationLifetime)
            {
                case RegistrationLifetime.InstancePerResolve:
                    registrationAction = builder => builder.RegisterGeneric(targetType).As(sourceType);
                    break;
                case RegistrationLifetime.InstancePerApplication:
                    registrationAction = builder => builder.RegisterGeneric(targetType).As(sourceType).SingleInstance();
                    break;
                default:
                    throw new NotSupportedException("This operation is not supported");
            }

            registrationAction(this.containerBuilder);
            RegistrationActions.Add(registrationAction);
        }

        public virtual void RegisterInstance(Type targetType, object value)
        {
            if (IsInitialized)
            {
                throw new InvalidOperationException("Cannot update container after it was already initialized");
            }

            var registrationAction = new Action<ContainerBuilder>(builder => { builder.RegisterInstance(value).As(targetType).ExternallyOwned(); });

            registrationAction(this.containerBuilder);
            RegistrationActions.Add(registrationAction);
        }

        public void RegisterDecorator<TDecorator, TDecorated>() where TDecorator : TDecorated
        {
            if (IsInitialized)
            {
                throw new InvalidOperationException("Cannot update container after it was already initialized");
            }

            var registrationAction = new Action<ContainerBuilder>(builder =>
            {
                builder.RegisterDecorator<TDecorator, TDecorated>();
            });

            registrationAction(this.containerBuilder);
            RegistrationActions.Add(registrationAction);
        }

        public T Resolve<T>(params IConstructorNamedParameter[] parameters)
        {
            if (!IsInitialized)
            {
                throw new InvalidOperationException("The container has not yet been built!");
            }

            return this.container.Resolve<T>(parameters.Select(p => new NamedParameter(p.Name, p.Value)));
        }
    }
}
