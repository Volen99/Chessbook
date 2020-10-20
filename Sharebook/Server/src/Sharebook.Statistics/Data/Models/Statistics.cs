namespace WorldFeed.Statistics.Data.Models
{
    using WorldFeed.Common.Models;

    public class Statistics : BaseDeletableModel<int>
    {
        public int TotalUploads { get; set; }
    }
}
