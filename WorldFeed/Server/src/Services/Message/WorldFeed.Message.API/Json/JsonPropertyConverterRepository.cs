namespace WorldFeed.Message.Json
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate.Enums;
    using WorldFeed.Message.DTO;
    using WorldFeed.Message.DTO.Events;

    /// <summary>
    /// Repository of converters used to transform json into a specific type T.
    /// It should be used as a Field attribute (e.g. [JsonConverter(typeof(JsonPropertyConverterRepository))])
    /// </summary>
    public class JsonPropertyConverterRepository : JsonConverter, IJsonPropertyConverterRepository
    {
        public static readonly Dictionary<Type, JsonConverter> JsonConverters;

        static JsonPropertyConverterRepository()
        {
            JsonConverters = new Dictionary<Type, JsonConverter>();

            IntializeClassicalTypesConverters();
            InitializeTweetinviObjectConverters();
            InitializeTweetinviInterfacesConverters();
        }

        private static void IntializeClassicalTypesConverters()
        {
            var nullableBoolConverter = new JsonTwitterNullableConverter<bool>();
            var nullableLongConverter = new JsonTwitterNullableConverter<long>();
            var nullableIntegerConverter = new JsonTwitterNullableConverter<int>();
            var nullableDoubleConverter = new JsonTwitterNullableConverter<double>();
            var dateTimeConverter = new JsonTwitterDateTimeConverter();

            JsonConverters.Add(typeof(bool), nullableBoolConverter);
            JsonConverters.Add(typeof(long), nullableLongConverter);
            JsonConverters.Add(typeof(long?), nullableLongConverter);
            JsonConverters.Add(typeof(int), nullableIntegerConverter);
            JsonConverters.Add(typeof(double), nullableDoubleConverter);
            JsonConverters.Add(typeof(DateTime), dateTimeConverter);
        }

        private static void InitializeTweetinviObjectConverters()
        {
            var allowContributorRequestConverter = new JsonAllowContributorRequestConverter();
            var allowDirectMessagesConverter = new JsonAllowDirectMessagesConverter();
            var quickReplyTypeConverter = new JsonEnumStringConverter<QuickReplyType>();
            var eventTypeConverter = new JsonEnumStringConverter<EventType>();
            var attachmentTypeConverter = new JsonEnumStringConverter<AttachmentType>();

            JsonConverters.Add(typeof(AllowContributorRequestMode), allowContributorRequestConverter);
            JsonConverters.Add(typeof(QuickReplyType), quickReplyTypeConverter);
            JsonConverters.Add(typeof(EventType), eventTypeConverter);
            JsonConverters.Add(typeof(AttachmentType), attachmentTypeConverter);
        }

        private static void InitializeTweetinviInterfacesConverters()
        {
            var quickReplyOptionConverter = new JsonInterfaceToObjectConverter<IQuickReplyOption, QuickReplyOption>();
            var quickReplyConverter = new JsonInterfaceToObjectConverter<IQuickReplyDTO, QuickReplyDTO>();
            var eventInitiatedViaConverter = new JsonInterfaceToObjectConverter<IEventInitiatedViaDTO, EventInitiatedViaDTO>();
            var messageDataConverter = new JsonInterfaceToObjectConverter<IMessageDataDTO, MessageDataDTO>();
            var quickReplyResponseConverter = new JsonInterfaceToObjectConverter<IQuickReplyResponse, QuickReplyResponse>();
            var messageCreateTargetConverter = new JsonInterfaceToObjectConverter<IMessageCreateTargetDTO, MessageCreateTargetDTO>();
            var eventConverter = new JsonInterfaceToObjectConverter<IMessageEventDTO, MessageEventDTO>();
            var messageCreateConverter = new JsonInterfaceToObjectConverter<IMessageCreateDTO, MessageCreateDTO>();
            var getMessageConverter = new JsonInterfaceToObjectConverter<IGetMessageDTO, GetMessageDTO>();
            var createMessageConverter = new JsonInterfaceToObjectConverter<ICreateMessageDTO, CreateMessageDTO>();
            var attachmentConverter = new JsonInterfaceToObjectConverter<IAttachmentDTO, AttachmentDTO>();
            // var messageEntitiesConverter = new JsonInterfaceToObjectConverter<IMessageEntities, MessageEntitiesDTO>();


            JsonConverters.Add(typeof(IQuickReplyOption), quickReplyOptionConverter);
            JsonConverters.Add(typeof(IQuickReplyDTO), quickReplyConverter);
            JsonConverters.Add(typeof(IEventInitiatedViaDTO), eventInitiatedViaConverter);
            JsonConverters.Add(typeof(IMessageDataDTO), messageDataConverter);
            JsonConverters.Add(typeof(IQuickReplyResponse), quickReplyResponseConverter);
            JsonConverters.Add(typeof(IMessageCreateTargetDTO), messageCreateTargetConverter);
            JsonConverters.Add(typeof(IMessageEventDTO), eventConverter);
            JsonConverters.Add(typeof(IMessageCreateDTO), messageCreateConverter);
            JsonConverters.Add(typeof(IGetMessageDTO), getMessageConverter);
            JsonConverters.Add(typeof(ICreateMessageDTO), createMessageConverter);
            JsonConverters.Add(typeof(IAttachmentDTO), attachmentConverter);
            // JsonConverters.Add(typeof(IMessageEntities), messageEntitiesConverter);
        }

        private static readonly object _convertersLocker = new object();
        public static void TryOverride<TInterface, TTo>() where TTo : TInterface
        {
            lock (_convertersLocker)
            {
                var jsonInterfaceToObjectConverter = JsonConverters.Where(x => x.Value is IJsonInterfaceToObjectConverter);
                var matchingConverter = jsonInterfaceToObjectConverter.Where(x => ((IJsonInterfaceToObjectConverter)x.Value).InterfaceType == typeof(TInterface)).ToArray();

                if (matchingConverter.Length == 1)
                {
                    JsonConverters.Remove(typeof(TInterface));
                    JsonConverters.Add(typeof(TInterface), new JsonInterfaceToObjectConverter<TInterface, TTo>());
                }
            }
        }

        public JsonConverter GetObjectConverter(object objectToConvert)
        {
            return GetTypeConverter(objectToConvert.GetType());
        }

        public JsonConverter GetTypeConverter(Type objectType)
        {
            lock (_convertersLocker)
            {
                return JsonConverters[objectType];
            }
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            return GetTypeConverter(objectType).ReadJson(reader, objectType, existingValue, serializer);
        }

        public override bool CanConvert(Type objectType)
        {
            lock (_convertersLocker)
            {
                return JsonConverters.ContainsKey(objectType);
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            serializer.Serialize(writer, value);
        }
    }
}
