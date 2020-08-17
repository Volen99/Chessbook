namespace WorldFeed.Common.Models.WorldFeed.Feed.Entities
{
    public interface IUserMentionFeedEntity
    {
        /// <summary>
        /// User Id
        /// </summary>
        long? Id { get; set; }

        /// <summary>
        /// User Id as a string
        /// </summary>
        string IdStr { get; set; }

        /// <summary>
        /// User ScreenName
        /// </summary>
        string ScreenName { get; set; }

        /// <summary>
        /// User displayed name
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// An array of integers indicating the offsets within 
        /// the TwitterObject where the hashtag begins and ends.
        /// </summary>
        string Indices { get; set; }

        long FeedEntitiesId { get; set; }
    }
}
