namespace WorldFeed.History.BC.Science.Post.Data.Models
{
    using System.Collections.Generic;

    using WorldFeed.Common.Models;

    public class Post : BaseDeletableModel<int>, IAuditInfo
    {
        public string UserId { get; set; }

        public int TextId { get; set; }
        public Text Text { get; set; }

        public IEnumerable<Media> Media { get; set; } = new List<Media>();

        public ICollection<Comment> Comments { get; set; }

        public ICollection<Vote> Votes { get; set; }

    }
}
