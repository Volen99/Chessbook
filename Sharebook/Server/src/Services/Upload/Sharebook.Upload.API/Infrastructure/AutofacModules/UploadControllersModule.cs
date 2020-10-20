namespace Sharebook.Controllers
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.QueryGenerators.User;
    using Sharebook.Upload.API.Controllers;
    using Sharebook.Upload.API.Controllers.Tweet;
    using Sharebook.Upload.API.Helpers;
    using Sharebook.Upload.API.Shared;
    using Sharebook.Upload.ChunkedUpload;
    using Sharebook.Upload.Infrastructure.Inject.Contracts;

    public class UploadControllersModule : IUploadModule
    {
        public void Initialize(IUploadContainer container)
        {
            this.InitializeControllers(container);
            this.InitializeQueryExecutors(container);
            this.InitializeQueryGenerators(container);
            this.InitializeHelpers(container);
        }

        private void InitializeControllers(IUploadContainer container)
        {
            container.RegisterType<IUploadController, UploadController>();
            container.RegisterType<ITweetController, TweetController>();
            container.RegisterType<IChunkedUploader, ChunkedUploader>();
        }

        private void InitializeQueryExecutors(IUploadContainer container)
        {
            container.RegisterType<ITweetQueryExecutor, TweetQueryExecutor>();

            container.RegisterType<IUploadQueryExecutor, UploadQueryExecutor>();
            container.RegisterType<IUploadMediaStatusQueryExecutor, UploadMediaStatusQueryExecutor>();

            container.RegisterType<ITweetQueryExecutor, TweetQueryExecutor>();
        }

        private void InitializeQueryGenerators(IUploadContainer container)
        {
            container.RegisterType<ITweetQueryGenerator, TweetQueryGenerator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUploadQueryGenerator, UploadQueryGenerator>(RegistrationLifetime.InstancePerApplication);

            // container.RegisterType<IUserQueryGenerator, UserQueryGenerator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IQueryParameterGenerator, QueryParameterGenerator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IUserQueryParameterGenerator, UserQueryParameterGenerator>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeHelpers(IUploadContainer container)
        {
            container.RegisterType<ITweetHelper, TweetHelper>();
            container.RegisterType<IUploadHelper, UploadHelper>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
