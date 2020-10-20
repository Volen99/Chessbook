namespace Sharebook.Identity.API.Infrastructure.AutofacModules
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Identity.API.Application.QueryExecutors;
    using Sharebook.Identity.API.Application.QueryGenerators;
    using Sharebook.Identity.API.Auth;
    using Sharebook.Identity.API.Controllers;
    using Sharebook.Identity.API.Infrastructure.Inject;

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
