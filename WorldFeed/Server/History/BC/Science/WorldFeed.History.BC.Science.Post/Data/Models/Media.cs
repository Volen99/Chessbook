namespace WorldFeed.History.BC.Science.Post.Data.Models
{
    using System;

    using WorldFeed.Common.Models;
    using WorldFeed.History.BC.Science.Post.Data.Models.Enums;

    public class Media : IAuditInfo, IDeletableEntity
    {
        public Media()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        public long Size { get; set; }

        public string Directory { get; set; }

        public string Path { get; set; }

        public string FileExtension { get; set; }

        public int? Width { get; set; }

        public int? Height { get; set; }

        public string PostId { get; set; }
        public Post Post { get; set; }

        public Status Status { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public DateTime? DeletedOn { get; set; }

        public bool IsDeleted { get; set; }
    }
}
