namespace WorldFeed.Common.Public.Models.Webhooks
{
    // pff, I lost my phone.. 20.07.2020, Monday
    public interface IWebhookMessage
    {
        string Json { get; }
    }

    public class WebhookMessage : IWebhookMessage
    {
        public WebhookMessage(string json)
        {
            this.Json = json;
        }

        public string Json { get; set; }
    }
}
