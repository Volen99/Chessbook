namespace WorldFeed.Science.Upload.Domain.Models
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class MediaFeedEntity
    {
        public string MediaURL { get; set; }

        public string MediaURLHttps { get; set; }

        public string URL { get; set; }

        public string DisplayURL { get; set; }

        public string ExpandedURL { get; set; }

        public string MediaType { get; set; }

        public string Indices { get; set; }

        public MediaObject Sizes { get; set; }

        // public VideoFeedInformationEntity VideoDetails { get; set; }

    }
}
