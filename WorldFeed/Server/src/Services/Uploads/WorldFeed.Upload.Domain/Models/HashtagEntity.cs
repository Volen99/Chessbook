namespace WorldFeed.Upload.Domain.Models
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class HashtagEntity
    {
        public string Text { get; set; }

        public string Indices { get; set; }

        public long FeedEntitiesId { get; set; }

    }
}
