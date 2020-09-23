namespace WorldFeed.Identity.API.Infrastructure.AutofacModules
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Identity.API.Application.QueryExecutors;
    using WorldFeed.Identity.API.Application.QueryGenerators;
    using WorldFeed.Identity.API.Auth;
    using WorldFeed.Identity.API.Controllers;
    using WorldFeed.Identity.API.Infrastructure.Inject;

    public class AccountSettingsControllerModule : IIdentityModule
    {
        public void Initialize(IIdentityContainer container)
        {
            InitializeControllers(container);
            InitializeQueryExecutors(container);
            InitializeQueryGenerators(container);
        }

        private void InitializeControllers(IIdentityContainer container)
        {
            container.RegisterType<IAuthController, AuthController>();
            container.RegisterType<IAccountSettingsController, AccountSettingsController>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUserController, UserController>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeQueryExecutors(IIdentityContainer container)
        {
            container.RegisterType<IAccountSettingsQueryExecutor, AccountSettingsQueryExecutor>();
            container.RegisterType<IAuthQueryExecutor, AuthQueryExecutor>();

            container.RegisterType<IUserQueryExecutor, UserQueryExecutor>();
        }

        private void InitializeQueryGenerators(IIdentityContainer container)
        {
            container.RegisterType<IAccountSettingsQueryGenerator, AccountSettingsQueryGenerator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IAuthQueryGenerator, AuthQueryGenerator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUserQueryGenerator, UserQueryGenerator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IQueryParameterGenerator, QueryParameterGenerator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IUserQueryParameterGenerator, UserQueryParameterGenerator>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
