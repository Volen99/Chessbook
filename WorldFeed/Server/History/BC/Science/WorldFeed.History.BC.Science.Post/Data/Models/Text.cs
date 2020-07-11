namespace WorldFeed.History.BC.Science.Post.Data.Models
{
    using System;
    using WorldFeed.Common.Models;

    public class Text : BaseDeletableModel<int>, IAuditInfo
    {
        public string Content { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
