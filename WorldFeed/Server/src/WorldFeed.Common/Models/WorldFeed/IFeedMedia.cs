namespace WorldFeed.Common.Models.WorldFeed.Feed
{
    public interface IFeedMedia : IAuditInfo
    {
        byte[] Data { get; set; }

        string ContentType { get; set; }


        string OriginalInfo { get; set; }

        int MediaSizeObjectId { get; set; }
        MediaSizeObject Sizes { get; set; }

        bool HasBeenUploaded { get; }

        bool IsReadyToBeUsed { get; }

        public long Size { get; set; }

        public string Directory { get; set; }

        public string Path { get; set; }

        public string FileExtension { get; set; }

        public long FeedId { get; set; }
    }
}
