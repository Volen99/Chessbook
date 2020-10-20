namespace Sharebook.Post.API.Infrastructure.Inject
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Post.API.Controllers;
    using Sharebook.Post.API.Infrastructure.Inject.Contracts;
    using Sharebook.Post.Application.QueryExecutors;
    using Sharebook.Post.Application.QueryGenerators;
    using Sharebook.Post.Helpers;

    public class PostControllersModule : IPostModule
    {
        public void Initialize(IPostContainer container)
        {
            InitializeControllers(container);
            InitializeQueryExecutors(container);
            InitializeQueryGenerators(container);
            InitializeHelpers(container);
        }

        private void InitializeControllers(IPostContainer container)
        {
            container.RegisterType<ITimelineController, TimelineController>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITweetController, TweetController>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeQueryExecutors(IPostContainer container)
        {
            container.RegisterType<ITimelineQueryExecutor, TimelineQueryExecutor>();
            container.RegisterType<ITweetQueryExecutor, TweetQueryExecutor>();
        }

        private void InitializeQueryGenerators(IPostContainer container)
        {
            container.RegisterType<ITimelineQueryGenerator, TimelineQueryGenerator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITweetQueryGenerator, TweetQueryGenerator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IQueryParameterGenerator, QueryParameterGenerator>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeHelpers(IPostContainer container)
        {
            container.RegisterType<ITweetHelper, TweetHelper>();
        }
    }
}
