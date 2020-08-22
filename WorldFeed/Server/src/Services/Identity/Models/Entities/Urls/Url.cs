namespace WorldFeed.Identity.API.Models.Entities.Urls
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class Url
    {
        public string UrlPath { get; set; }

        public string ExpandedUrl { get; set; }

        public string DisplayUrl { get; set; }

        public Indices Indices { get; set; }
    }
}
