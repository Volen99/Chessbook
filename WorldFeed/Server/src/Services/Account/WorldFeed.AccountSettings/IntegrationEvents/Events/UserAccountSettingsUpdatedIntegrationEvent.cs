namespace WorldFeed.AccountSettings.IntegrationEvents.Events
{
    using System;
    using WorldFeed.BuildingBlocks.EventBus.Events;

    public class UserAccountSettingsUpdatedIntegrationEvent : IntegrationEvent
    {
        public UserAccountSettingsUpdatedIntegrationEvent(string userId, string timeZone, int? displayLanguage, int? trendLocationWoeid, bool? sleepTimeEnabled, int? endSleepHour)
        {
            this.UserId = userId;
            this.TimeZone = timeZone;
            this.DisplayLanguage = displayLanguage;
            this.TrendLocationWoeid = trendLocationWoeid;
            this.SleepTimeEnabled = sleepTimeEnabled;
            this.EndSleepHour = endSleepHour;
        }

        public string UserId { get; set; }

        public int? DisplayLanguage { get; set; }

        public string TimeZone { get; set; }

        public int? TrendLocationWoeid { get; set; }

        public bool? SleepTimeEnabled { get; set; }

        public int? EndSleepHour { get; set; }

        public Guid RequestId { get; set; }
    }
}
