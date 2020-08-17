namespace WorldFeed.Science.Upload.Data.Models
{
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.WorldFeed.Feed;
    using WorldFeed.Science.API.Data.Models;
    using WorldFeed.Science.Upload.Data.Models.ExtendedFeedEntities;
    using WorldFeed.Science.Upload.Data.Models.Properties;

    public class Feed : BaseDeletableModel<long>, IFeed
    {
        public string IdStr { get; }

        public string CreatedAt { get; set; }

        public string FullText { get; set; }

        public bool Truncated { get; set; }

        // public long EntitiesId { get; set; }
        public FeedEntities Entities { get; set; }

        public long ExtendedEntitiesId { get; set; }
        public ExtendedEntities ExtendedEntities { get; set; }

        public string Source { get; set; }

        public int InReplyToStatusId { get; set; }

        public string InReplyToStatusIdStr { get; set; }

        public int InReplyToUserId { get; set; }

        public string InReplyToUserIdStr { get; set; }

        public string InReplyToScreenName { get; set; }

        public string UserId { get; set; }



        public long GeoId { get; set; }
        public GeoFeed Geo { get; set; }

        public long CoordinatesId { get; set; }
        public Coordinates Coordinates { get; set; }

        public long PlaceId { get; set; }
        public PlaceFeed Place { get; set; }

        public string Contributors { get; set; }

        public bool IsQuoteStatus { get; set; }

        public int RetweetCount { get; set; }

        public int FavoriteCount { get; set; }

        public int ReplyCount { get; set; }

        public int QuoteCount { get; set; }

        public bool Favorited { get; set; }

        public bool Retweeted { get; set; }

        public bool PossiblySensitive { get; set; }

        public bool PossiblySensitiveEditable { get; set; }

        public string Lang { get; set; }

        public string SupplementalLanguage { get; set; }
    }
}
