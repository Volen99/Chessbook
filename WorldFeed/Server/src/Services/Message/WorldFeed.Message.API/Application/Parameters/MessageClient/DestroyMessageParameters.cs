namespace WorldFeed.Message.Application.Parameters.MessageClient
{
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate;
    using WorldFeed.Message.DTO.Events;

    /// <summary>
    /// For more information visit : https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/guides/direct-message-migration
    /// </summary>
    public interface IDeleteMessageParameters : ICustomRequestParameters
    {
        /// <summary>
        /// Identifier of the message that you want to delete
        /// </summary>
        long MessageId { get; set; }
    }

    /// <inheritdoc/>
    public class DestroyMessageParameters : CustomRequestParameters, IDeleteMessageParameters
    {
        public DestroyMessageParameters(long messageId)
        {
            MessageId = messageId;
        }

        public DestroyMessageParameters(IMessageEventDTO messageEvent)
        {
            MessageId = messageEvent.Id;
        }

        public DestroyMessageParameters(IMessage message)
        {
            MessageId = message.Id;
        }

        /// <inheritdoc/>
        public long MessageId { get; set; }
    }
}
