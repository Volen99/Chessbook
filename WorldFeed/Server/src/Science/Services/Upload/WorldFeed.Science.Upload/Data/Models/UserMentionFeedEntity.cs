namespace WorldFeed.Science.Upload.Data.Models
{
    using WorldFeed.Common.Models.WorldFeed.Feed.Entities;
    using WorldFeed.Science.API.Data.Models;

    public class UserMentionFeedEntity : IUserMentionFeedEntity
    {
        public long? Id { get; set; }

        public string IdStr { get; set; }

        public string ScreenName { get; set; }

        public string Name { get; set; }

        public string Indices { get; set; }

        public long FeedEntitiesId { get; set; }
        public FeedEntities Feed { get; set; }
    }
}
