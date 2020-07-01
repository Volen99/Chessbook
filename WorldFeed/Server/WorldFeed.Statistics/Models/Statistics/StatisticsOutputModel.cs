namespace WorldFeed.Statistics.Models.Statistics
{
    using Data.Models;
    using WorldFeed.Common.Models;

    public class StatisticsOutputModel : IMapFrom<Statistics>
    {
        public int TotalCarAds { get; set; }

        public int TotalRentedCars { get; set; }
    }
}
