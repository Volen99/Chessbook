namespace WorldFeed.Common.Models.Entities
{
    using Microsoft.EntityFrameworkCore;

    using global::WorldFeed.Common.Models.Urls;

    [Owned]
    public class Entity
    {   
        public Url Url { get; set; }

        public int DescriptionId { get; set; }
        public Description Description { get; set; }
    }
}
