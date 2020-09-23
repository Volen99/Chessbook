namespace WorldFeed.Message.API.Infrastructure.Inject
{
    using System;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Models.Properties;
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Wrappers;
    using WorldFeed.Logic.Helpers;
    using WorldFeed.Logic.Wrapper;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate;
    using WorldFeed.Message.DTO;
    using WorldFeed.Message.DTO.Events;
    using WorldFeed.Message.Infrastructure.Inject;

    public class MessageLogicModule : IMessageModule
    {
        public void Initialize(IMessageContainer container)
        {
            InitializeTwitterModels(container);

            InitializeDTOs(container);
            InitializeHelpers(container);
            InitializeWrappers(container);
            InitializeExceptionHandler(container);
            InitializeSerialization(container);
        }

        // Initialize Models that are not objects coming from Twitter
        //private void InitializeTweetinviModels(IMessageContainer container)
        //{
        //    container.RegisterType<IMedia, Media>();
        //    container.RegisterType<ISearchResults, SearchResults>();
        //}

        // Initialize Models that are Twitter objects
        private void InitializeTwitterModels(IMessageContainer container)
        {
            container.RegisterType<ICoordinates, CoordinatesDTO>();
            container.RegisterType<ILocation, Location>();

            container.RegisterType<IMessage, Message>();
        }

        private void InitializeDTOs(IMessageContainer container)
        {
            container.RegisterType<IQuickReplyOption, QuickReplyOption>();
            container.RegisterType<IQuickReplyDTO, QuickReplyDTO>();
            container.RegisterType<IApp, App>();
            container.RegisterType<IEventInitiatedViaDTO, EventInitiatedViaDTO>();
            container.RegisterType<IMessageDataDTO, MessageDataDTO>();
            container.RegisterType<IQuickReplyResponse, QuickReplyResponse>();
            container.RegisterType<IMessageCreateTargetDTO, MessageCreateTargetDTO>();
            container.RegisterType<IMessageEventDTO, MessageEventDTO>();
            container.RegisterType<IMessageCreateDTO, MessageCreateDTO>();
            container.RegisterType<IGetMessageDTO, GetMessageDTO>();
            container.RegisterType<ICreateMessageDTO, CreateMessageDTO>();
            container.RegisterType<IAttachmentDTO, AttachmentDTO>();
            container.RegisterType<IMessageEntities, MessageEntitiesDTO>();
            container.RegisterType<IMediaEntity, MediaEntity>();
        }

        private void InitializeHelpers(IMessageContainer container)
        {
            container.RegisterType<ITwitterStringFormatter, TwitterStringFormatter>();
        }

        private void InitializeWrappers(IMessageContainer container)
        {
            container.RegisterType<IJObjectStaticWrapper, JObjectStaticWrapper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IJsonConvertWrapper, JsonConvertWrapper>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeExceptionHandler(IMessageContainer container)
        {
            container.RegisterType<IWebExceptionInfoExtractor, WebExceptionInfoExtractor>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterTimeoutException, TwitterTimeoutException>();
            container.RegisterType<ITwitterExceptionInfo, TwitterExceptionInfo>();
        }

        private void InitializeSerialization(IMessageContainer container)
        {
            container.RegisterType<IJsonPropertyConverterRepository, JsonPropertyConverterRepository>();
            container.RegisterType<IJsonObjectConverter, JsonObjectConverter>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
