namespace WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks
{
    using System;

    public interface IWebhookDTO
    {
        string Id { get; set; }

        string Url { get; set; }

        bool Valid { get; set; }

        DateTime CreatedAt { get; set; }

        Uri Uri { get; }
    }
}
