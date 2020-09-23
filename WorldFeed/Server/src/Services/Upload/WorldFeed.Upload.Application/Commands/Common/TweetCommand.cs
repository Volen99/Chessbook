namespace WorldFeed.Upload.Application.Commands.Common
{
    using System.Runtime.Serialization;

    using WorldFeed.Common.Public.Models;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.TwitterEntities;
    using WorldFeed.Upload.Domain.AggregatesModel.TweetAggregate.Properties;

    public abstract class TweetCommand<TCommand> : EntityCommand<int>
        where TCommand : EntityCommand<int>
    {
        // CreateFeedCommand does not have an Feed Id, because the feed has not been created yet.

        [DataMember]
        public string Text { get; set; }

        [DataMember]
        public string FullText { get; set; }

        [DataMember]
        public bool Truncated { get; set; }

        // By default, EF Core will name the database columns for the properties of the owned entity type
        // following the pattern Navigation_OwnedEntityProperty.
        [DataMember]
        public TweetEntities Entities { get; set; }

        [DataMember]
        public string Source { get; set; }

        [DataMember]
        public int InReplyToStatusId { get; set; }

        [DataMember]
        public string InReplyToStatusIdStr { get; set; }

        [DataMember]
        public int InReplyToUserId { get; set; }

        [DataMember]
        public string InReplyToUserIdStr { get; set; }

        [DataMember]
        public string InReplyToScreenName { get; set; }

        [DataMember]
        public string UserId { get; set; }

        [DataMember]
        public Geo Geo { get; set; }

        [DataMember]
        public Coordinates Coordinates { get; set; }

        [DataMember]
        public Place Place { get; set; }

        [DataMember]
        public string Contributors { get; set; }

        [DataMember]
        public bool IsQuoteStatus { get; set; }

        [DataMember]
        public int RetweetCount { get; set; }

        [DataMember]
        public int FavoriteCount { get; set; }

        [DataMember]
        public int ReplyCount { get; set; }

        [DataMember]
        public int QuoteCount { get; set; }

        [DataMember]
        public bool Favorited { get; set; }

        [DataMember]
        public bool Retweeted { get; set; }

        [DataMember]
        public bool PossiblySensitive { get; set; }

        [DataMember]
        public bool PossiblySensitiveEditable { get; set; }

        [DataMember]
        public string Lang { get; set; }

        [DataMember]
        public string SupplementalLanguage { get; set; }

        [DataMember]
        public string CreatedAt { get; set; }

        //public class OrderItemDTO
        //{
        //    public int ProductId { get; set; }

        //    public string ProductName { get; set; }

        //    public decimal UnitPrice { get; set; }

        //    public decimal Discount { get; set; }

        //    public int Units { get; set; }

        //    public string PictureUrl { get; set; }
        //}
    }
}
