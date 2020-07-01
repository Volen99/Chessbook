namespace WorldFeed.Statistics.Data.Models
{
    using WorldFeed.Common.Models;

    public class Statistics : BaseDeletableModel<int>
    {
        public int TotalCarAds { get; set; }

        public int TotalRentedCars { get; set; }
    }
}
