namespace WorldFeed.History.BC.Science.Post.Data.Models
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using WorldFeed.Common.Models;

    public class Post : IAuditInfo, IDeletableEntity
    {
        public Post()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        public string UserId { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public string TextId { get; set; }
        public Text Text { get; set; }

        public IEnumerable<Media> Media { get; set; } = new List<Media>();

    }
}
