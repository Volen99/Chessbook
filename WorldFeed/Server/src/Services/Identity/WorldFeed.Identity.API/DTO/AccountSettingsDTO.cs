namespace WorldFeed.Identity.API.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Identity.Domain.AggregatesModel.UserAggregate;
    using WorldFeed.Identity.Domain.AggregatesModel.UserAggregate.Enums;

    /// <summary>
    /// https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-account-settings
    /// </summary>
    public class AccountSettingsDTO : IAccountSettingsDTO
    {
        [JsonProperty("always_use_https")]
        public bool AlwaysUseHttps { get; set; }

        [JsonProperty("discoverable_by_email")]
        public bool DiscoverableByEmail { get; set; }

        [JsonProperty("geo_enabled")]
        public bool GeoEnabled { get; set; }

        [JsonProperty("language")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public Language Language { get; set; }

        [JsonProperty("protected")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public PrivacyMode PrivacyMode { get; set; }

        [JsonProperty("screen_name")]
        public string ScreenName { get; set; }

        [JsonProperty("sleep_time")]
        private SleepTimeDTO _sleepTime { get; set; }

        [JsonProperty("time_zone")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITimeZone TimeZone { get; set; } // The timezone dates and times should be displayed in for the user

        [JsonProperty("discoverable_by_mobile_phone")]
        public bool DiscoverableByMobilePhone { get; set; }

        [JsonProperty("trend_location")]
        public ITrendLocation[] TrendLocations { get; set; }

        [JsonProperty("use_cookie_personalization")]
        public bool UseCookiePersonalization { get; set; }

        [JsonProperty("allow_contributor_request")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public AllowContributorRequestMode AllowContributorRequest { get; set; }

        [JsonProperty("allow_dms_from")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public AllowDirectMessagesFrom AllowDirectMessagesFrom { get; set; }

        [JsonProperty("allow_dm_groups_from")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public AllowDirectMessagesFrom AllowGroupDirectMessagesFrom { get; set; }

        [JsonProperty("display_sensitive_media")]
        public bool DisplaySensitiveMedia { get; set; }

        [JsonProperty("smart_mute")]
        public bool SmartMute { get; set; }

        public bool SleepTimeEnabled
        {
            get => _sleepTime.Enabled;
            set => _sleepTime.Enabled = value;
        }

        public int SleepTimeStartHour
        {
            get => _sleepTime.StartTime;
            set => _sleepTime.StartTime = value;
        }

        public int SleepTimeEndHour
        {
            get => _sleepTime.EndTime;
            set => _sleepTime.EndTime = value;
        }
        
        [JsonProperty("translator_type")]
        public string TranslatorType { get; set; }

        /// <summary>
        /// https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/post-account-settings
        /// </summary>
        private class SleepTimeDTO
        {
            [JsonProperty("enabled")]
            public bool Enabled { get; set; }       // When set to true , t or 1 , will enable sleep time for the user

            [JsonProperty("start_time")]
            [JsonConverter(typeof(JsonPropertyConverterRepository))]
            public int StartTime { get; set; }      // The hour that sleep time should begin if it is enabled

            [JsonProperty("end_time")]
            [JsonConverter(typeof(JsonPropertyConverterRepository))]
            public int EndTime { get; set; }        // The hour that sleep time should end if it is enabled
        }
    }
}
