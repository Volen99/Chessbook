namespace WorldFeed.Streams.Model.AccountActivity
{
    using System;
    using Newtonsoft.Json;

    public class ActivityStreamUserRevokedAppPermissionsDTO
    {
        [JsonProperty("date_time")]
        public DateTime DateTime { get; set; }

        [JsonProperty("target")]
        public ActivityStreamAppIdentifierDTO Target { get; set; }

        [JsonProperty("source")]
        public ActivityStreamUserIdentifierDTO Source { get; set; }
    }
}
