namespace WorldFeed.Post.API.Infrastructure.Inject
{
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Web;
    using WorldFeed.Post.API.Application.Query;
    using WorldFeed.Post.API.Application.Web;
    using WorldFeed.Post.API.Application.Webb;
    using WorldFeed.Post.API.Infrastructure.Inject.Contracts;
    using WorldFeed.Post.API.WebLogic;

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
