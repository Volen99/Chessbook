namespace WorldFeed.Message.Client.Tools
{
    using System.Collections.Generic;
    using System.Linq;

    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate;
    using WorldFeed.Message.DTO;
    using WorldFeed.Message.DTO.Events;

    public class TwitterClientFactories : ITwitterClientFactories
    {
        private readonly ITwitterClient client;
        private readonly IJsonObjectConverter jsonObjectConverter;

        public TwitterClientFactories(ITwitterClient client, IJsonObjectConverter jsonObjectConverter)
        {
            this.client = client;
            this.jsonObjectConverter = jsonObjectConverter;
        }

        public IMessage CreateMessage(IMessageEventWithAppDTO messageEventWithAppDTO)
        {
            return new Message(messageEventWithAppDTO.MessageEvent, messageEventWithAppDTO.App, this.client);
        }

        public IMessage[] CreateMessages(IEnumerable<IMessageEventWithAppDTO> eventWithAppDTOs)
        {
            return eventWithAppDTOs?.Select(CreateMessage).ToArray();
        }

        public IMessage CreateMessage(IGetMessageDTO getMessageDTO)
        {
            return _buildMessage(getMessageDTO.MessageEvent, getMessageDTO.Apps);
        }

        public IMessage CreateMessage(ICreateMessageDTO createMessageDTO)
        {
            return CreateMessage(createMessageDTO?.MessageEvent);
        }

        public IMessage CreateMessage(IMessageEventDTO messageEventDTO)
        {
            if (messageEventDTO == null)
            {
                return null;
            }

            return new Message(messageEventDTO, null, this.client);
        }

        public IMessage CreateMessage(IMessageEventDTO messageEventDTO, IApp app)
        {
            if (messageEventDTO == null)
            {
                return null;
            }

            return new Message(messageEventDTO, app, this.client);
        }

        public IMessage CreateMessage(string json)
        {
            var eventWithAppDTO = this.jsonObjectConverter.Deserialize<IMessageEventDTO>(json);
            return CreateMessage(eventWithAppDTO);
        }

        public IMessage CreateMessageFromMessageEventWithApp(string json)
        {
            var eventWithAppDTO = this.jsonObjectConverter.Deserialize<IMessageEventWithAppDTO>(json);

            if (eventWithAppDTO.MessageEvent == null)
            {
                return null;
            }

            return CreateMessage(eventWithAppDTO);
        }

        private IMessage _buildMessage(IMessageEventDTO messageEventDTO, IDictionary<long, IApp> apps)
        {
            if (messageEventDTO.Type != EventType.MessageCreate)
            {
                return null;
            }

            // Get the app that was used to send this message.
            //  Note that we don't always get the App ID.
            //  Also assume that some apps could be missing from the dictionary.
            IApp app = null;
            if (messageEventDTO.MessageCreate.SourceAppId != null)
            {
                apps.TryGetValue(messageEventDTO.MessageCreate.SourceAppId.Value, out app);
            }

            return new Message(messageEventDTO, app, this.client);
        }
    }
}
