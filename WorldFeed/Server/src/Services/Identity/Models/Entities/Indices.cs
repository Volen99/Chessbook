namespace WorldFeed.Identity.API.Models.Entities
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class Indices
    {
        public int IndexFirst { get; set; }

        public int IndexSecond { get; set; }
    }
}
