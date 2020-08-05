namespace WorldFeed.Common.Public.Models.Interfaces
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;

    public interface IWebhookEnvironment
    {
        [JsonIgnore]
        IWebhookEnvironmentDTO WebhookEnvironmentDTO { get; }

        /// <summary>
        /// Name of the environment
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Webhooks registered in the environment
        /// </summary>
        IWebhook[] Webhooks { get; }
    }
}
