namespace Sharebook.Message.Json
{
    using Newtonsoft.Json;
    using System.Collections.Generic;

    using Sharebook.Common.DTO;
    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Models.Properties;
    using Sharebook.Common.Public.Models.Enums;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Message.Domain.AggregateRoots.MessageAggregate;
    using Sharebook.Message.Domain.AggregateRoots.MessageAggregate.Enums;
    using Sharebook.Message.DTO;
    using Sharebook.Message.DTO.Events;

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
