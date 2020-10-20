﻿namespace WorldFeed.Identity.Domain.AggregatesModel.UserAggregate
{
    public interface ITimeZone
    {
        /// <summary>
        /// Timezone name.
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// Linux TZINFO name.
        /// </summary>
        string TzinfoName { get; set; }

        /// <summary>
        /// Difference in time between UTC time and the Timezone time.
        /// </summary>
        int UtcOffset { get; set; }
    }
}
