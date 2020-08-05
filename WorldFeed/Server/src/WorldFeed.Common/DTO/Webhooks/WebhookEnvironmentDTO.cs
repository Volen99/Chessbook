namespace WorldFeed.Common.DTO.Webhooks
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;

    public class WebhookEnvironmentDTO : IWebhookEnvironmentDTO
    {
        [JsonProperty("environment_name")]
        public string Name { get; set; }

        public IWebhookDTO[] Webhooks { get; set; }
    }
}
