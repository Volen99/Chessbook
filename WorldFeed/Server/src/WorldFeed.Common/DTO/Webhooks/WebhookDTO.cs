namespace WorldFeed.Common.DTO.Webhooks
{
    using System;
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;

    public class WebhookDTO : IWebhookDTO
    {
        private Uri uri;

        public string Id { get; set; }
        public string Url { get; set; }

        [JsonIgnore]
        public Uri Uri
        {
            get
            {
                if (this.uri == null)
                {
                    this.uri = new Uri(Url);
                }

                return this.uri;
            }
        }

        public bool Valid { get; set; }

        [JsonProperty("created_timestamp")]
        [JsonConverter(typeof(JsonTwitterDateTimeConverter), "yyyy-MM-dd HH:mm:ss zzzz")]
        public DateTime CreatedAt { get; set; }
    }
}
