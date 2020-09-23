namespace WorldFeed.Message.Client.Tools
{
    using System.Collections.Generic;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate;
    using WorldFeed.Message.DTO;
    using WorldFeed.Message.DTO.Events;

    public interface ITwitterClientFactories
    {
        // MESSAGE

        /// <summary>
        /// Creates a message from create event message json
        /// </summary>
        IMessage CreateMessageFromMessageEventWithApp(string json);

        /// <summary>
        /// Creates a Message from json
        /// </summary>
        IMessage CreateMessage(string json);

        IMessage CreateMessage(IMessageEventDTO messageEventDTO);
        IMessage CreateMessage(IMessageEventDTO messageEventDTO, IApp app);
        IMessage CreateMessage(IGetMessageDTO getMessageDTO);
        IMessage CreateMessage(ICreateMessageDTO createMessageDTO);
        IMessage CreateMessage(IMessageEventWithAppDTO messageEventWithAppDTO);
        IMessage[] CreateMessages(IEnumerable<IMessageEventWithAppDTO> eventWithAppDTOs);
    }
}