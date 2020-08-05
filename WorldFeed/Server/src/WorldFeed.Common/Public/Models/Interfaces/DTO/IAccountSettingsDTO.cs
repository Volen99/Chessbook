namespace WorldFeed.Common.Public.Models.Interfaces.DTO
{
    using WorldFeed.Common.Public.Models.Enums;

    // I am the stupidest person in the world
    public interface IAccountSettingsDTO
    {
        string ScreenName { get; set; }

        PrivacyMode PrivacyMode { get; set; }

        Language Language { get; set; }

        bool AlwaysUseHttps { get; set; }

        bool DiscoverableByEmail { get; set; }

        bool DiscoverableByMobilePhone { get; set; }

        bool DisplaySensitiveMedia { get; set; }

        bool SmartMute { get; set; }

        bool GeoEnabled { get; set; }

        bool UseCookiePersonalization { get; set; }

        AllowDirectMessagesFrom AllowDirectMessagesFrom { get; set; }

        AllowDirectMessagesFrom AllowGroupDirectMessagesFrom { get; set; }

        AllowContributorRequestMode AllowContributorRequest { get; set; }

        ITimeZone TimeZone { get; set; }

        bool SleepTimeEnabled { get; set; }

        int SleepTimeStartHour { get; set; }

        int SleepTimeEndHour { get; set; }
        
        string TranslatorType { get; set; }

        ITrendLocation[] TrendLocations { get; set; }
    }
}
