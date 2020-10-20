namespace Sharebook.Post.DTO
{
    using Sharebook.Post.Domain.AggregatesModel.PostAggregate.Entities;

    /// <summary>
    /// Class storing multiple types of TweetEntities
    /// https://dev.twitter.com/docs/tweet-entities
    /// </summary>
    public class TweetEntitiesDTO : ObjectEntitiesDTO, ITweetEntities
    {
        
    }
}
