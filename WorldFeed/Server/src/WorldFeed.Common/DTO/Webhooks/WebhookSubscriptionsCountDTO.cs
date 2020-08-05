﻿namespace WorldFeed.Common.DTO.Webhooks
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces;

    public class WebhookSubscriptionsCountDTO : IWebhookSubscriptionsCount
    {
        [JsonProperty("account_name")]
        public string AccountName { get; set; }

        [JsonProperty("subscriptions_count")]
        public string SubscriptionsCount { get; set; }

        [JsonProperty("provisioned_count")]
        public string ProvisionedCount { get; set; }
    }
}
