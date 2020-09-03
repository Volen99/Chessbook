namespace WorldFeed.AccountSettings.Models
{
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.Properties;
    using WorldFeed.Common.Public.Models.Enums;

    public class Account
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string ScreenName { get; set; }

        public PrivacyMode PrivacyMode { get; set; }

        public Language Language { get; set; }

        public bool AlwaysUseHttps { get; set; }

        public bool DiscoverableByEmail { get; set; }

        public bool DiscoverableByMobilePhone { get; set; }

        public bool GeoEnabled { get; set; }

        public bool UseCookiePersonalization { get; set; }

        public AllowDirectMessagesFrom AllowDirectMessagesFrom { get; set; }

        public AllowDirectMessagesFrom AllowGroupDirectMessagesFrom { get; set; }

        public AllowContributorRequestMode AllowContributorRequest { get; set; }

        public bool DisplaySensitiveMedia { get; set; }

        public bool SmartMute { get; set; }

        public TimeZone TimeZone { get; set; }

        public bool SleepTimeEnabled { get; set; }

        public int StartSleepHour { get; set; }

        public int EndSleepHour { get; set; }

        public string TranslatorType { get; set; }

        public TrendLocation[] TrendLocations { get; set; }
    }
}
