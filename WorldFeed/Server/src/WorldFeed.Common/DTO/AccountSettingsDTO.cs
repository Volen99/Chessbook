﻿namespace WorldFeed.Common.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class AccountSettingsDTO : IAccountSettingsDTO
    {
        private class SleepTimeDTO
        {
            [JsonProperty("enabled")]
            public bool Enabled { get; set; }

            [JsonProperty("start_time")]
            [JsonConverter(typeof(JsonPropertyConverterRepository))]
            public int StartTime { get; set; }

            [JsonProperty("end_time")]
            [JsonConverter(typeof(JsonPropertyConverterRepository))]
            public int EndTime { get; set; }
        }

        [JsonProperty("screen_name")]
        public string ScreenName { get; set; }

        [JsonProperty("protected")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public PrivacyMode PrivacyMode { get; set; }

        [JsonProperty("language")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public Language Language { get; set; }

        [JsonProperty("always_use_https")]
        public bool AlwaysUseHttps { get; set; }

        [JsonProperty("discoverable_by_email")]
        public bool DiscoverableByEmail { get; set; }

        [JsonProperty("discoverable_by_mobile_phone")]
        public bool DiscoverableByMobilePhone { get; set; }

        [JsonProperty("geo_enabled")]
        public bool GeoEnabled { get; set; }

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

        [JsonProperty("time_zone")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITimeZone TimeZone { get; set; }

        [JsonProperty("display_sensitive_media")]
        public bool DisplaySensitiveMedia { get; set; }

        [JsonProperty("smart_mute")]
        public bool SmartMute { get; set; }

        [JsonProperty("sleep_time")]
        private SleepTimeDTO _sleepTime { get; set; }

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
        
        [JsonProperty("trend_location")]
        public ITrendLocation[] TrendLocations { get; set; }    
    }
}
