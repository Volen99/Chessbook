namespace Sharebook.Profile.Infrastructure.Inject
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Autofac;

    using Sharebook.Common.Events;
    using Sharebook.Common.InjectWorldFeed;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Events;
    using Sharebook.Profile.Application.Parameters;

    public class ProfileContainer : IProfileContainer
    {
        private IContainer _container;
        private readonly ContainerBuilder _containerBuilder;
        private readonly List<IProfileModule> moduleCatalog;

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

        public ProfileContainer()
        {
            RegistrationActions = new List<Action<ContainerBuilder>>();

            _containerBuilder = new ContainerBuilder();
            this.moduleCatalog = new List<IProfileModule>();

            RegisterModules();
            InitializeModules();
        }

        public ProfileContainer(IProfileContainer container)
        {
            RegistrationActions = new List<Action<ContainerBuilder>>();
            _containerBuilder = new ContainerBuilder();

            container.RegistrationActions.ForEach(register =>
            {
                register(_containerBuilder);
                RegistrationActions.Add(register);
            });
        }

        public event EventHandler<ProfileContainerEventArgs> BeforeRegistrationCompletes;

        private readonly object _lock = new object();

        public void Initialize()
        {
            lock (_lock)
            {
                if (IsInitialized)
                {
                    return;
                }

                this.Raise(BeforeRegistrationCompletes, new TweetinviContainerEventArgs(this));
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

                _container = _containerBuilder.Build();
                IsInitialized = true;
            }
        }

        private void RegisterModules()
        {
            this.moduleCatalog.Add(new ProfileModule());
            this.moduleCatalog.Add(new ProfileControllersModule());
            this.moduleCatalog.Add(new ProfileCoreModule(this));
            this.moduleCatalog.Add(new ProfileLogicModule());
            this.moduleCatalog.Add(new ProfileWebLogicModule());
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

            registrationAction(_containerBuilder);
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

            registrationAction(_containerBuilder);
            RegistrationActions.Add(registrationAction);
        }

        public virtual void RegisterInstance(Type targetType, object value)
        {
            if (IsInitialized)
            {
                throw new InvalidOperationException("Cannot update container after it was already initialized");
            }

            var registrationAction = new Action<ContainerBuilder>(builder => { builder.RegisterInstance(value).As(targetType).ExternallyOwned(); });

            registrationAction(_containerBuilder);
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

            registrationAction(_containerBuilder);
            RegistrationActions.Add(registrationAction);
        }

        public T Resolve<T>(params IConstructorNamedParameter[] parameters)
        {
            if (!IsInitialized)
            {
                throw new InvalidOperationException("The container has not yet been built!");
            }

            return _container.Resolve<T>(parameters.Select(p => new NamedParameter(p.Name, p.Value)));
        }
    }
}
