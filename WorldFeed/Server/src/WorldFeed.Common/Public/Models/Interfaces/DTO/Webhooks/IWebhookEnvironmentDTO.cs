namespace WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks
{
    public interface IWebhookEnvironmentDTO
    {
        string Name { get; set; }
        IWebhookDTO[] Webhooks { get; set; }
    }
}
