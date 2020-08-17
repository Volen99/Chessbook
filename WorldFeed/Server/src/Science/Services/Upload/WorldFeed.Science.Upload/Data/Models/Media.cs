namespace WorldFeed.Science.Upload.Data.Models
{
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.WorldFeed;
    using WorldFeed.Common.Models.WorldFeed.Feed;

    public class Media : BaseDeletableModel<long>, IFeedMedia
    {
        // public long? Id { get; set; }

        public string IdStr { get; set; }

        public string MediaKey { get; set; }

        public byte[] Data { get; set; }

        public string ContentType { get; set; }

        public string MediaUrl { get; set; }

        public string MediaUrlHttps { get; set; }

        public string Url { get; set; }

        public string DisplayUrl { get; set; }

        public string ExpandedUrl { get; set; }

        public string Type { get; set; }

        public string OriginalInfo { get; set; }

        public bool HasBeenUploaded { get; }

        public bool IsReadyToBeUsed { get; }

        public long Size { get; set; }

        public string Directory { get; set; }

        public string Path { get; set; }

        public string FileExtension { get; set; }

        public string Indices { get; set; }

        // public Feature Feature { get; set; }

        public int ExtMediaAvailability { get; set; }

        public string ExtAltText { get; set; }

        public string ExtMediaColor { get; set; }

        public int MediaSizeObjectId { get; set; }
        public MediaSizeObject Sizes { get; set; }

        public long FeedId { get; set; }
        public Feed Feed { get; set; }
    }
}
