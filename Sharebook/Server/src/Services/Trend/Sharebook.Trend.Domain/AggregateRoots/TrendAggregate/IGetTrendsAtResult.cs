namespace Sharebook.Trends.Domain.AggregateRoots.TrendAggregate
{
    using System;
    using System.Collections.Generic;
    public interface IGetTrendsAtResult
    {
        DateTime AsOf { get; set; }

        DateTime CreatedAt { get; set; }

        IWoeIdLocation[] WoeIdLocations { get; set; }

        ITrend[] Trends { get; set; }
    }
}
