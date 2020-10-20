namespace Sharebook.Upload.API.Infrastructure.Inject
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Web;
    using Sharebook.Upload.API.Helpers;
    using Sharebook.Upload.API.Web;
    using Sharebook.Upload.API.WebLogic;
    using Sharebook.Upload.Application.Query;
    using Sharebook.Upload.Infrastructure.Inject.Contracts;
    using Sharebook.WebLogic;

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
