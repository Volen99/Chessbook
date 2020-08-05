namespace WorldFeed.History.Common.Messages.Media
{
    using System;

    public class MediaCreatedMessage
    {
        public int Id { get; set; }

        public long Size { get; set; }

        public string Directory { get; set; }

        public string Path { get; set; }

        public string FileExtension { get; set; }

        public int? Width { get; set; }

        public int? Height { get; set; }

        public int PostId { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
