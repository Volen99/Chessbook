namespace WorldFeed.Post.DTO
{
    using WorldFeed.Post.Domain.AggregatesModel.PostAggregate.Entities;

    /// <summary>
    /// Class storing multiple types of TweetEntities
    /// https://dev.twitter.com/docs/tweet-entities
    /// </summary>
    public class TweetEntitiesDTO : ObjectEntitiesDTO, ITweetEntities
    {
        
    }
}
