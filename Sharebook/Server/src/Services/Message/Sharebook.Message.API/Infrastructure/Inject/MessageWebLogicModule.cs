namespace Sharebook.Message.API.Infrastructure.Inject
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Web;
    using Sharebook.Message.Infrastructure.Inject;

    public class MessageWebLogicModule : IMessageModule
    {
        public void Initialize(IMessageContainer container)
        {
            container.RegisterType<IWebRequestExecutor, WebRequestExecutor>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterRequestHandler, TwitterRequestHandler>();

            container.RegisterType<IConsumerOnlyCredentials, ConsumerOnlyCredentials>();
            container.RegisterType<ITwitterCredentials, TwitterCredentials>();

            container.RegisterType<IOAuthQueryParameter, OAuthQueryParameter>();
            container.RegisterType<IOAuthWebRequestGeneratorFactory, OAuthWebRequestGeneratorFactory>();

            container.RegisterType<IWebHelper, WebHelper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IHttpClientWebHelper, HttpClientWebHelper>();
            container.RegisterType<ITwitterResponse, TwitterResponse>();

            container.RegisterType<ITwitterQuery, TwitterQuery>();
        }
    }
}
