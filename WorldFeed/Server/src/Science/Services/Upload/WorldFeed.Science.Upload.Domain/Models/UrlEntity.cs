namespace WorldFeed.Science.Upload.Domain.Models
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class UrlEntity
    {
        public string URL { get; set; }

        public string DisplayedURL { get; set; }

        public string ExpandedURL { get; set; }

        public string Indices { get; set; }
    }
}
