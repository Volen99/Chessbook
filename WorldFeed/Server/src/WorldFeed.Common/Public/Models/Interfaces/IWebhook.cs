namespace WorldFeed.Common.Public.Models.Interfaces
{
    using System;

    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;

    public interface IWebhook
    {
        IWebhookDTO WebhookDTO { get; }

        /// <summary>
        /// Webhook identifier
        /// </summary>
        string Id { get; }

        /// <summary>
        /// Registered url
        /// </summary>
        string Url { get; }

        /// <summary>
        /// Whether the webhook succeeded its last crc challenge
        /// </summary>
        bool Valid { get; }

        /// <summary>
        /// Registration date
        /// </summary>
        DateTime CreatedAt { get; }

        /// <summary>
        /// Registered Uri
        /// </summary>
        Uri Uri { get; }
    }
}
