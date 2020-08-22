namespace WorldFeed.Identity.API.Models.Entities
{
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.Identity.API.Models.Entities.Urls;

    [Owned]
    public class Description
    {
        public List<Url> Urls { get; set; }
    }
}
