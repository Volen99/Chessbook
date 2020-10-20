namespace Sharebook.Upload.API.Infrastructure.Inject
{
    using System;

    using Sharebook.Common.Events;
    using Sharebook.Common.Exceptions;
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Models;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Parameters;
    using Sharebook.Common.Web;
    using Sharebook.Upload.API.Json;
    using Sharebook.Upload.API.Web;
    using Sharebook.Upload.Application.Parameters.TweetsClient;
    using Sharebook.Upload.Application.Validations;
    using Sharebook.Upload.ChunkedUpload;
    using Sharebook.Upload.Client.Validators;
    using Sharebook.Upload.Events;
    using Sharebook.Upload.Exceptions;
    using Sharebook.Upload.Infrastructure.Inject.Contracts;

    public class UploadCoreModule : IUploadModule
    {
        private static IUploadContainer _container;

        public UploadCoreModule(IUploadContainer container)     // new UploadCoreModule(this)
        {
            _container = container;
        }

        public static IUploadContainer UploadContainer => _container;

        public void Initialize(IUploadContainer container)
        {
            if (container != _container)
            {
                throw new InvalidOperationException("This container can only be initialized with the main container");
            }

            container.RegisterGeneric(typeof(IFactory<>), typeof(Factory<>));
            container.RegisterType<ITaskDelayer, TaskDelayer>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IAttributeHelper, AttributeHelper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IHttpUtility, HttpUtility>(RegistrationLifetime.InstancePerApplication);
            container.RegisterGeneric(typeof(IWeakEvent<>), typeof(WeakEvent<>));
            container.RegisterInstance(typeof(ITweetinviEvents), new TweetinviGlobalEvents());
            container.RegisterType<ITwitterClientEvents, TwitterClientEvents>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ISingleAggregateExceptionThrower, SingleAggregateExceptionThrower>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterExceptionFactory, TwitterExceptionFactory>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterException, TwitterException>();
            container.RegisterType<IPagedOperationsHelper, PagedOperationsHelper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<JsonContentFactory, JsonContentFactory>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITwitterResultFactory, TwitterResultFactory>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITwitterAccessor, TwitterAccessor>(RegistrationLifetime.InstancePerApplication); // TODO: not good to be here

            container.RegisterType<IUploadJsonConverter, UploadJsonConverter>(RegistrationLifetime.InstancePerApplication);

            InitializeParameters(container);
            InitializeParametersValidators(container);
        }

        private void InitializeParameters(IUploadContainer container)
        {
            // Base
            container.RegisterType<ICustomRequestParameters, CustomRequestParameters>();

            // Identifiers
            container.RegisterType<ITweetIdentifier, TweetIdentifier>();
            container.RegisterType<IUserIdentifier, UserIdentifier>();

            container.RegisterType<IGeoCode, GeoCode>();


            // Tweet
            container.RegisterType<IPublishTweetParameters, PublishTweetParameters>();

            // Upload
            container.RegisterType<IChunkUploadInitParameters, ChunkUploadInitParameters>();
            container.RegisterType<IChunkUploadAppendParameters, ChunkUploadAppendParameters>();
        }

        private static void InitializeParametersValidators(IUploadContainer container)
        {
            container.RegisterType<IParametersValidator, ParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITweetsClientParametersValidator, TweetsClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITweetsClientRequiredParametersValidator, TweetsClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUploadClientParametersValidator, UploadClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IUploadClientRequiredParametersValidator, UploadClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

           // container.RegisterType<IUsersClientParametersValidator, UsersClientParametersValidator>(RegistrationLifetime.InstancePerApplication);
           // container.RegisterType<IUsersClientRequiredParametersValidator, UsersClientRequiredParametersValidator>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUserQueryValidator, UserQueryValidator>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
