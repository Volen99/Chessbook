namespace WorldFeed.Dealers.Gateway.Models.CarAds
{
    using WorldFeed.Models;

    public class MineCarAdOutputModel : CarAdOutputModel, IMapFrom<CarAdOutputModel>
    {
        public int TotalViews { get; set; }
    }
}
