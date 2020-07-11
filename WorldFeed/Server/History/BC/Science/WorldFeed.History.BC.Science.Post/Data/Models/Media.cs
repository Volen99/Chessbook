namespace WorldFeed.History.BC.Science.Post.Data.Models
{
    using System;

    using WorldFeed.Common.Models;
    using WorldFeed.History.BC.Science.Post.Data.Models.Enums;

    public class Media : BaseDeletableModel<int>, IAuditInfo
    {
        public long Size { get; set; }

        public string Directory { get; set; }

        public string Path { get; set; }

        public string FileExtension { get; set; }

        public int? Width { get; set; }

        public int? Height { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }

        public Status Status { get; set; }
    }
}
