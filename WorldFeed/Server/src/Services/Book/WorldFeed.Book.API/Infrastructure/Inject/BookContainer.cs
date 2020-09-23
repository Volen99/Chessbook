namespace WorldFeed.Book.Infrastructure.Inject
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Autofac;

    using WorldFeed.Book.API.Infrastructure.Inject;
    using WorldFeed.Book.Application.IntegrationEvents.Events;
    using WorldFeed.Book.Infrastructure.AutofacModules;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.Models.Enums;

    public class BookContainer : IBookContainer
    {
        private IContainer container;
        private readonly ContainerBuilder containerBuilder;
        private readonly List<IBookModule> moduleCatalog;

        private bool isInitialized;

        public BookContainer()
        {
            RegistrationActions = new List<Action<ContainerBuilder>>();

            this.containerBuilder = new ContainerBuilder();
            this.moduleCatalog = new List<IBookModule>();

            RegisterModules();
            InitializeModules();
        }

        public BookContainer(IBookContainer container)
        {
            RegistrationActions = new List<Action<ContainerBuilder>>();
            this.containerBuilder = new ContainerBuilder();

            container.RegistrationActions.ForEach(register =>
            {
                register(this.containerBuilder);
                RegistrationActions.Add(register);
            });
        }

        public List<Action<ContainerBuilder>> RegistrationActions { get; }

        public ITwitterClient AssociatedClient { get; set; }

        public bool IsInitialized
        {
            get
            {
                lock (_lock)
                {
                    return this.isInitialized;
                }
            }
            set
            {
                lock (_lock)
                {
                    this.isInitialized = value;
                }
            }
        }

        public event EventHandler<BookContainerEventArgs> BeforeRegistrationCompletes;

        private readonly object _lock = new object();

        public void Initialize()
        {
            lock (_lock)
            {
                if (IsInitialized)
                {
                    return;
                }

                this.Raise(BeforeRegistrationCompletes, new BookContainerEventArgs(this));
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
            this.moduleCatalog.Add(new BookModule());
            this.moduleCatalog.Add(new BookControllersModule());
            this.moduleCatalog.Add(new BookCoreModule(this));
            this.moduleCatalog.Add(new BookLogicModule());
            this.moduleCatalog.Add(new BookWebLogicModule());
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
