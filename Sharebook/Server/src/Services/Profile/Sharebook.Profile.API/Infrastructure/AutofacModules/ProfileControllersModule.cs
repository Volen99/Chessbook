namespace Sharebook.Profile.Application.Parameters
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Profile.Application.QueryExecutors;
    using Sharebook.Profile.Application.QueryGenerators;
    using Sharebook.Profile.Controllers;
    using Sharebook.Profile.Infrastructure.Inject;

    public class ProfileControllersModule : IProfileModule
    {
        public void Initialize(IProfileContainer container)
        {
            InitializeControllers(container);
            InitializeQueryExecutors(container);
            InitializeQueryGenerators(container);
        }

        private void InitializeControllers(IProfileContainer container)
        {
            container.RegisterType<IUserController, UserController>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeQueryExecutors(IProfileContainer container)
        {
            container.RegisterType<IUserQueryExecutor, UserQueryExecutor>();
        }

        private void InitializeQueryGenerators(IProfileContainer container)
        {
            container.RegisterType<IUserQueryGenerator, UserQueryGenerator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IQueryParameterGenerator, QueryParameterGenerator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IUserQueryParameterGenerator, UserQueryParameterGenerator>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
