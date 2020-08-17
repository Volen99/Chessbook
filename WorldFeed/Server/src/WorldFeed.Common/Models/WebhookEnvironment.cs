namespace WorldFeed.Common.Models
{
    using System.Linq;
    using Newtonsoft.Json;

    using global::WorldFeed.Common.Public;
    using global::WorldFeed.Common.Public.Models.Interfaces;
    using global::WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;

    public class WebhookEnvironment : IWebhookEnvironment
    {
        private readonly ITwitterClient client;

        public WebhookEnvironment(IWebhookEnvironmentDTO webhookEnvironmentDTO, ITwitterClient client)
        {
            this.client = client;
            WebhookEnvironmentDTO = webhookEnvironmentDTO;
        }

        [JsonIgnore]
        public IWebhookEnvironmentDTO WebhookEnvironmentDTO { get; }

        public string Name => WebhookEnvironmentDTO.Name;

        public IWebhook[] Webhooks => WebhookEnvironmentDTO.Webhooks.Select(x => this.client.Factories.CreateWebhook(x)).ToArray();
    }
}
