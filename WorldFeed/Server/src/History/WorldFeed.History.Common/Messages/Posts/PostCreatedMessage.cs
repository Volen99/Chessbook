namespace WorldFeed.History.Common.Messages.Posts
{
    using System;

    public class PostCreatedMessage
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public DateTime CreatedOn { get; set; }

        public int TextId { get; set; }
    }
}
