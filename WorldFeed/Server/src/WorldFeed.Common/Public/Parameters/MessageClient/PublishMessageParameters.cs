﻿namespace WorldFeed.Common.Public.Parameters.MessageClient
{
    using WorldFeed.Common.Public.Models.Interfaces;

    /// <summary>
    /// For more information visit : https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/new-event
    /// </summary>
    public interface IPublishMessageParameters : ICustomRequestParameters
    {
        /// <summary>
        /// Content of the message
        /// </summary>
        string Text { get; }

        /// <summary>
        /// UserId of the recipient
        /// </summary>
        long RecipientId { get; }

        /// <summary>
        /// Uploaded media id
        /// </summary>
        long? MediaId { get; set; }

        /// <summary>
        /// Quick reply options
        /// </summary>
        IQuickReplyOption[] QuickReplyOptions { get; set; }
    }

    /// <inheritdoc/>
    public class PublishMessageParameters : CustomRequestParameters, IPublishMessageParameters
    {
        public PublishMessageParameters(string text, long recipientId)
        {
            Text = text;
            RecipientId = recipientId;
        }

        public string Text { get; }

        public long RecipientId { get; }

        public long? MediaId { get; set; }

        public IQuickReplyOption[] QuickReplyOptions { get; set; }
    }
}
