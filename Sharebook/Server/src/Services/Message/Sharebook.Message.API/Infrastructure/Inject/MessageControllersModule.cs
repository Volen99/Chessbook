namespace Sharebook.Message.Infrastructure.AutofacModules
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Message.API.Controllers.Message;
    using Sharebook.Message.Controllers;
    using Sharebook.Message.Infrastructure.Inject;

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
