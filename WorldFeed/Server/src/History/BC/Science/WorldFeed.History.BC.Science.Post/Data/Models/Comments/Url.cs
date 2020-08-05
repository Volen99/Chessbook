namespace WorldFeed.History.BC.Science.Post.Data.Models.Comments
{
    using WorldFeed.Common.Models.Entities;

    public class Url
    {
        public string UrlPath { get; set; }

        public string ExpandedUrl { get; set; }

        public string DisplayUrl { get; set; }

        public int IndicesId { get; set; }
        public Indices Indices { get; set; }
    }
}
