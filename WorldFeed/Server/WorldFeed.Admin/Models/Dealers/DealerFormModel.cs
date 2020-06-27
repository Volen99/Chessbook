namespace WorldFeed.Admin.Models.Dealers
{
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using WorldFeed.Models;

    public class DealerFormModel : IMapFrom<DealerDetailsOutputModel>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [DisplayName("Phone Number")]
        public string PhoneNumber { get; set; }
    }
}
