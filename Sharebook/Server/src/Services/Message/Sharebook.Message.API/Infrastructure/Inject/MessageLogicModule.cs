namespace Sharebook.Message.API.Infrastructure.Inject
{
    using System;

    using Sharebook.Common.DTO;
    using Sharebook.Common.Exceptions;
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Models.Properties;
    using Sharebook.Common.Public.Models;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Common.Wrappers;
    using Sharebook.Logic.Helpers;
    using Sharebook.Logic.Wrapper;
    using Sharebook.Message.Domain.AggregateRoots.MessageAggregate;
    using Sharebook.Message.DTO;
    using Sharebook.Message.DTO.Events;
    using Sharebook.Message.Infrastructure.Inject;

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
