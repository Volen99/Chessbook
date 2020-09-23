namespace WorldFeed.Identity.API.Models
{
    using global::WorldFeed.Common.Public.Models.Enums;
    using global::WorldFeed.Common.Public.Models.Interfaces;
    using global::WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Identity.API.DTO;
    using WorldFeed.Identity.Domain.AggregatesModel.ApplicationUserAggregate.Enums;

    public class AccountSettings : IAccountSettings
    {
        private IAccountSettingsDTO accountSettingsDTO;

        public AccountSettings(IAccountSettingsDTO accountSettingsDTO)
        {
            this.accountSettingsDTO = accountSettingsDTO;
        }
        
        public IAccountSettingsDTO AccountSettingsDTO
        {
            get => this.accountSettingsDTO;
            set => this.accountSettingsDTO = value;
        }

        public string ScreenName => this.accountSettingsDTO.ScreenName;
        public PrivacyMode PrivacyMode => this.accountSettingsDTO.PrivacyMode;
        public Language Language => this.accountSettingsDTO.Language;
        public bool AlwaysUseHttps => this.accountSettingsDTO.AlwaysUseHttps;
        public bool DiscoverableByEmail => this.accountSettingsDTO.DiscoverableByEmail;
        public bool DiscoverableByMobilePhone => this.accountSettingsDTO.DiscoverableByMobilePhone;
        public bool GeoEnabled => this.accountSettingsDTO.GeoEnabled;
        public bool UseCookiePersonalization => this.accountSettingsDTO.UseCookiePersonalization;
        public AllowDirectMessagesFrom AllowDirectMessagesFrom => this.accountSettingsDTO.AllowDirectMessagesFrom;
        public AllowDirectMessagesFrom AllowGroupDirectMessagesFrom => this.accountSettingsDTO.AllowGroupDirectMessagesFrom;
        public AllowContributorRequestMode AllowContributorRequest => this.accountSettingsDTO.AllowContributorRequest;
        public bool DisplaySensitiveMedia => this.accountSettingsDTO.DisplaySensitiveMedia;
        public bool SmartMute => this.accountSettingsDTO.SmartMute;
        public ITimeZone TimeZone => this.accountSettingsDTO.TimeZone;
        public bool SleepTimeEnabled => this.accountSettingsDTO.SleepTimeEnabled;
        public int StartSleepHour => this.accountSettingsDTO.SleepTimeStartHour;
        public int EndSleepHour => this.accountSettingsDTO.SleepTimeEndHour;
        public string TranslatorType => this.accountSettingsDTO.TranslatorType;
        public ITrendLocation[] TrendLocations => this.accountSettingsDTO.TrendLocations;
    }
}
