namespace WorldFeed.Common.Models.Urls
{
    using global::WorldFeed.Common.Models.Entities;

    public class Url
    {
        public int Id { get; set; }

        public string UrlPath { get; set; }

        public string ExpandedUrl { get; set; }

        public string DisplayUrl { get; set; }

        public int IndicesId { get; set; }
        public Indices Indices { get; set; }
    }
}
