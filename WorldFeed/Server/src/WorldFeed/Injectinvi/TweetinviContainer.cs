namespace WorldFeed.Injectinvi
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Autofac;

    using WorldFeed.Common;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Controllers;
    using WorldFeed.Credentials;
    using WorldFeed.Logic;
    using WorldFeed.Streams;
    using WorldFeed.WebLogic;

    public class TweetinviContainer : ITweetinviContainer
    {
        private IContainer container;
        private readonly ContainerBuilder containerBuilder;
        private readonly List<ITweetinviModule> moduleCatalog;
        private readonly object _lock = new object();

        private bool isInitialized;

        public TweetinviContainer()
        {
            RegistrationActions = new List<Action<ContainerBuilder>>();

            this.containerBuilder = new ContainerBuilder();
            this.moduleCatalog = new List<ITweetinviModule>();

            RegisterModules();
            InitializeModules();
        }

        public TweetinviContainer(ITweetinviContainer container)
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

        public event EventHandler<TweetinviContainerEventArgs> BeforeRegistrationCompletes;

        public void Initialize()
        {
            lock (_lock)
            {
                if (this.IsInitialized)
                {
                    return;
                }

                this.Raise(BeforeRegistrationCompletes, new TweetinviContainerEventArgs(this));
                this.BuildContainer();
            }
        }

        public void BuildContainer()
        {
            lock (_lock)
            {
                if (this.IsInitialized)
                {
                    return;
                }

                this.container = this.containerBuilder.Build(); // We need to store the container so it can be used to resolve types later
                IsInitialized = true;
            }
        }

        private void RegisterModules()
        {
            this.moduleCatalog.Add(new TweetinviModule());
            this.moduleCatalog.Add(new TweetinviControllersModule());
            this.moduleCatalog.Add(new TweetinviCoreModule(this));
            this.moduleCatalog.Add(new TweetinviCredentialsModule());
            this.moduleCatalog.Add(new TweetinviLogicModule());
            this.moduleCatalog.Add(new TweetinviWebLogicModule());

            this.moduleCatalog.Add(new StreaminviModule());
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
                case RegistrationLifetime.InstancePerResolve:     // Usually you're only interested in exposing the type via its interface:
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

        /// <summary>
        /// Autofac supports open generic types. Use the RegisterGeneric() builder method:
        /// </summary>
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
            if (this.IsInitialized)
            {
                // Mark Seemann: After the container has .Build(), then it becomes readonly
                throw new InvalidOperationException("Cannot update container after it was already initialized");
            }

            var registrationAction = new Action<ContainerBuilder>(builder => { builder.RegisterInstance(value).As(targetType).ExternallyOwned(); });

            registrationAction(this.containerBuilder);
            RegistrationActions.Add(registrationAction);
        }

        public void RegisterDecorator<TDecorator, TDecorated>() where TDecorator : TDecorated
        {
            if (this.IsInitialized)
            {
                // Mark Seemann: After the container has .Build(), then it becomes readonly
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
            if (!this.IsInitialized)
            {
                // Register -> Resolve -> Release
                throw new InvalidOperationException("The container has not yet been built!");
            }

            return this.container.Resolve<T>(parameters.Select(p => new NamedParameter(p.Name, p.Value)));
        }
    }
}