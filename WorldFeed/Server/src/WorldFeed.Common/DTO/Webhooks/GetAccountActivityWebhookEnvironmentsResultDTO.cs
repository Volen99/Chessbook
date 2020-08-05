namespace WorldFeed.Common.DTO.Webhooks
{
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;

    public class GetAccountActivityWebhookEnvironmentsResultDTO : IGetAccountActivityWebhookEnvironmentsResultDTO
    {
        public IWebhookEnvironmentDTO[] Environments { get; set; }
    }
}
