namespace Sharebook.Upload.API.Infrastructure.Inject
{
    using System;

    using Sharebook.Common.Exceptions;
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Models.Properties;
    using Sharebook.Common.Wrappers;
    using Sharebook.Logic.Helpers;
    using Sharebook.Logic.Wrapper;
    using Sharebook.Upload.API.JsonConverters;
    using Sharebook.Upload.API.Wrappers;
    using Sharebook.Upload.Exceptions;
    using Sharebook.Upload.Infrastructure.Inject.Contracts;
    using Sharebook.Upload.Models.DTO;

    public class UploadLogicModule : IUploadModule
    {
        public void Initialize(IUploadContainer container)
        {
            InitializeTwitterModels(container);
            InitializeTweetinviModels(container);

            InitializeDTOs(container);
            InitializeHelpers(container);
            InitializeWrappers(container);
            InitializeExceptionHandler(container);
            InitializeSerialization(container);
        }

        // Initialize Models that are not objects coming from Twitter
        private void InitializeTweetinviModels(IUploadContainer container)
        {
            container.RegisterType<IMedia, Media>();
        }

        // Initialize Models that are Twitter objects
        private void InitializeTwitterModels(IUploadContainer container)
        {
         //   container.RegisterType<ITweet, Tweet>();

            //container.RegisterType<ICoordinates, CoordinatesDTO>();
            //container.RegisterType<ILocation, Location>();

            //container.RegisterType<IMention, Mention>();
        }

        private void InitializeDTOs(IUploadContainer container)
        {
            //container.RegisterType<ITweetDTO, TweetDTO>();
            //container.RegisterType<ITwitterListDTO, TwitterListDTO>();
            //container.RegisterType<IUserDTO, UserDTO>();
            //container.RegisterType<IRelationshipDetailsDTO, RelationshipDetailsDTO>();

            //container.RegisterType<ITweetEntities, TweetEntitiesDTO>();
            //container.RegisterType<IObjectEntities, ObjectEntitiesDTO>();
            //container.RegisterType<IUserEntities, UserEntities>();

            //container.RegisterType<IUrlEntity, UrlEntity>();
            //container.RegisterType<IHashtagEntity, HashtagEntity>();
            //container.RegisterType<IDescriptionEntity, DescriptionEntity>();
            //container.RegisterType<ISymbolEntity, SymbolEntity>();

            //container.RegisterType<IQuickReplyOption, QuickReplyOption>();
            //container.RegisterType<IQuickReplyDTO, QuickReplyDTO>();
            //container.RegisterType<IApp, App>();
            //container.RegisterType<IEventInitiatedViaDTO, EventInitiatedViaDTO>();
            //container.RegisterType<IMessageDataDTO, MessageDataDTO>();
            //container.RegisterType<IQuickReplyResponse, QuickReplyResponse>();
            //container.RegisterType<IMessageCreateTargetDTO, MessageCreateTargetDTO>();
            //container.RegisterType<IMessageEventDTO, MessageEventDTO>();
            //container.RegisterType<IMessageCreateDTO, MessageCreateDTO>();
            //container.RegisterType<IGetMessageDTO, GetMessageDTO>();
            //container.RegisterType<ICreateMessageDTO, CreateMessageDTO>();
            //container.RegisterType<IAttachmentDTO, AttachmentDTO>();
            //container.RegisterType<IMessageEntities, MessageEntitiesDTO>();
            //container.RegisterType<IMediaEntity, MediaEntity>();
        }

        private void InitializeHelpers(IUploadContainer container)
        {
            container.RegisterType<ITwitterStringFormatter, TwitterStringFormatter>();
        }

        private void InitializeWrappers(IUploadContainer container)
        {
            container.RegisterType<IJObjectStaticWrapper, JObjectStaticWrapper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IJsonConvertWrapper, JsonConvertWrapper>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeExceptionHandler(IUploadContainer container)
        {
            container.RegisterType<IWebExceptionInfoExtractor, WebExceptionInfoExtractor>(RegistrationLifetime.InstancePerApplication);
            // container.RegisterType<ITwitterTimeoutException, TwitterTimeoutException>();
            container.RegisterType<ITwitterExceptionInfo, TwitterExceptionInfo>();
        }

        private void InitializeSerialization(IUploadContainer container)
        {
            container.RegisterType<IJsonPropertyConverterRepository, JsonPropertyConverterRepository>();
            container.RegisterType<IJsonObjectConverter, JsonObjectConverter>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
