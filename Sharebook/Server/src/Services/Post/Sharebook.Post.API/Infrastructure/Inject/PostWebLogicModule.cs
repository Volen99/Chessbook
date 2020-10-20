namespace Sharebook.Post.API.Infrastructure.Inject
{
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Web;
    using Sharebook.Post.API.Application.Query;
    using Sharebook.Post.API.Application.Web;
    using Sharebook.Post.API.Application.Webb;
    using Sharebook.Post.API.Infrastructure.Inject.Contracts;
    using Sharebook.Post.API.WebLogic;

    public class PostWebLogicModule : IPostModule
    {
        public void Initialize(IPostContainer container)
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
