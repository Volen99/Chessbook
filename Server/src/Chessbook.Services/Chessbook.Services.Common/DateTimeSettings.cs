using Nop.Core.Configuration;

namespace Nop.Services.Helpers
{
    /// <summary>
    /// DateTime settings
    /// </summary>
    public static class DateTimeSettings
    {
        /// <summary>
        /// Gets or sets a default store time zone identifier
        /// </summary>
        public static string DefaultStoreTimeZoneId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether customers are allowed to select theirs time zone
        /// </summary>
        public static bool AllowCustomersToSetTimeZone = false;
    }
}
