namespace WorldFeed.Upload.API.Infrastructure.Inject
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Web;
    using WorldFeed.Upload.API.Helpers;
    using WorldFeed.Upload.API.Web;
    using WorldFeed.Upload.API.WebLogic;
    using WorldFeed.Upload.Application.Query;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;
    using WorldFeed.WebLogic;

    public class UploadWebLogicModule : IUploadModule
    {
        public void Initialize(IUploadContainer container)
        {
            container.RegisterType<IWebRequestExecutor, WebRequestExecutor>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterRequestHandler, TwitterRequestHandler>();

            container.RegisterType<IWebHelper, WebHelper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IHttpClientWebHelper, HttpClientWebHelper>();
            container.RegisterType<ITwitterResponse, TwitterResponse>();

            container.RegisterType<ITwitterQuery, TwitterQuery>();
        }
    }
}
