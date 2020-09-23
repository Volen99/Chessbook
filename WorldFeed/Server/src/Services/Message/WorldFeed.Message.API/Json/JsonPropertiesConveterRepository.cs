namespace WorldFeed.Message.Json
{
    using Newtonsoft.Json;
    using System.Collections.Generic;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Models.Properties;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate.Enums;
    using WorldFeed.Message.DTO;
    using WorldFeed.Message.DTO.Events;

    public class JsonPropertiesConveterRepository
    {
        static JsonPropertiesConveterRepository()
        {
            Initialize();
        }

        public static JsonConverter[] Converters { get; private set; }

        private static void Initialize()
        {
            var converters = new List<JsonConverter>
            {
                // JsonCoordinatesConverter is used only for Properties (with an s) and not Property
                // because Twitter does not provide the coordinates the same way if it is a list or
                // if it is a single argument.
                new JsonCoordinatesConverter(),

                new JsonInterfaceToObjectConverter<IQuickReplyOption, QuickReplyOption>(),
                new JsonInterfaceToObjectConverter<IQuickReplyDTO, QuickReplyDTO>(),
                new JsonInterfaceToObjectConverter<IApp, App>(),
                new JsonInterfaceToObjectConverter<IEventInitiatedViaDTO, EventInitiatedViaDTO>(),
                new JsonInterfaceToObjectConverter<IMessageDataDTO, MessageDataDTO>(),
                new JsonInterfaceToObjectConverter<IQuickReplyResponse, QuickReplyResponse>(),
                new JsonInterfaceToObjectConverter<IMessageCreateTargetDTO, MessageCreateTargetDTO>(),
                new JsonInterfaceToObjectConverter<IMessageEventDTO, MessageEventDTO>(),
                new JsonInterfaceToObjectConverter<IMessageCreateDTO, MessageCreateDTO>(),
                new JsonInterfaceToObjectConverter<IMessageEventWithAppDTO, MessageEventWithAppDTO>(),
                new JsonInterfaceToObjectConverter<IGetMessageDTO, GetMessageDTO>(),
                new JsonInterfaceToObjectConverter<ICreateMessageDTO, CreateMessageDTO>(),
                new JsonInterfaceToObjectConverter<IAttachmentDTO, AttachmentDTO>(),
               //  new JsonInterfaceToObjectConverter<IMessageEntities, MessageEntitiesDTO>(),

                // Enums (that have JSON serialization implemented)
                new JsonEnumStringConverter<EventType>(),
                new JsonEnumStringConverter<QuickReplyType>(),
                new JsonEnumStringConverter<AttachmentType>(),
            };

            Converters = converters.ToArray();
        }
    }
}
