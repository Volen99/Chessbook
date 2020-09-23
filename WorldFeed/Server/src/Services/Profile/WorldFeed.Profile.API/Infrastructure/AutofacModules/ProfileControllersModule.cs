namespace WorldFeed.Profile.Application.Parameters
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Profile.Application.QueryExecutors;
    using WorldFeed.Profile.Application.QueryGenerators;
    using WorldFeed.Profile.Controllers;
    using WorldFeed.Profile.Infrastructure.Inject;

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
