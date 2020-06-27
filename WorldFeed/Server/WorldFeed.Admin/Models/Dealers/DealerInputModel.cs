namespace WorldFeed.Admin.Models.Dealers
{
    using WorldFeed.Models;

    public class DealerInputModel : IMapFrom<DealerFormModel>
    {
        public string Name { get; set; }

        public string PhoneNumber { get; set; }
    }
}
