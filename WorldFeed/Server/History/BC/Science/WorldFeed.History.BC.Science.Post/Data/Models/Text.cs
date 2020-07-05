namespace WorldFeed.History.BC.Science.Post.Data.Models
{
    using System;
    using WorldFeed.Common.Models;

    public class Text : IAuditInfo, IDeletableEntity
    {
        public Text()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        public string Content { get; set; }

        public string PostId { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
