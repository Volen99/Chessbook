namespace WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks
{
    public interface IGetAccountActivityWebhookEnvironmentsResultDTO
    {
        IWebhookEnvironmentDTO[] Environments { get; set; }
    }
}
