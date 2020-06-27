namespace WorldFeed.Statistics.Models.Statistics
{
    using WorldFeed.Models;
    using Data.Models;

    public class StatisticsOutputModel : IMapFrom<Statistics>
    {
        public int TotalCarAds { get; set; }

        public int TotalRentedCars { get; set; }
    }
}
