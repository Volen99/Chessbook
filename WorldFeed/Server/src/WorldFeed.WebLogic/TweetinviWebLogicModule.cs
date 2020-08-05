namespace WorldFeed.WebLogic
{
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Web;

    public class TweetinviWebLogicModule : ITweetinviModule
    {
        public void Initialize(ITweetinviContainer container)
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
