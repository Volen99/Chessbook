namespace WorldFeed.Identity.API.Models.Entities
{
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.Identity.API.Models.Entities.Urls;

    [Owned]
    public class Entity
    {
        public Url Url { get; set; }

        public Description Description { get; set; }
    }
}
