namespace WorldFeed.Message.Infrastructure.AutofacModules
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Message.API.Controllers.Message;
    using WorldFeed.Message.Controllers;
    using WorldFeed.Message.Infrastructure.Inject;

    public class MessageControllersModule : IMessageModule
    {
        public void Initialize(IMessageContainer container)
        {
            InitializeControllers(container);
            InitializeQueryExecutors(container);
            InitializeQueryGenerators(container);
        }

        private void InitializeControllers(IMessageContainer container)
        {
            container.RegisterType<IMessageController, MessageController>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeQueryExecutors(IMessageContainer container)
        {
            container.RegisterType<IMessageQueryExecutor, MessageQueryExecutor>();
        }

        private void InitializeQueryGenerators(IMessageContainer container)
        {
            container.RegisterType<IMessageQueryGenerator, MessageQueryGenerator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IQueryParameterGenerator, QueryParameterGenerator>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
