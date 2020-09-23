namespace WorldFeed.Controllers
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.QueryGenerators.User;
    using WorldFeed.Upload.API.Controllers;
    using WorldFeed.Upload.API.Controllers.Tweet;
    using WorldFeed.Upload.API.Helpers;
    using WorldFeed.Upload.API.Shared;
    using WorldFeed.Upload.ChunkedUpload;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;

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
