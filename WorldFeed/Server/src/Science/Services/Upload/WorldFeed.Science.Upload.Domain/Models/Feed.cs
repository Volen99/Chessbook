namespace WorldFeed.Science.Upload.Domain.Models
{
    using WorldFeed.Science.Upload.Domain.Common;
    using WorldFeed.Science.Upload.Domain.Models.ExtendedFeedEntities;
    using WorldFeed.Science.Upload.Domain.Models.Properties;

    public class Feed : Entity, IAggregateRoot
    {
        protected Feed()
        {

        }

        public Feed(string fullText, bool truncated, Entities entities, ExtendedEntities extendedEntities, string source, int inReplyToStatusId,
            string inReplyToStatusIdStr, int inReplyToUserId, string inReplyToUserIdStr, string inReplyToScreenName, string userId, Geo geo,
            Coordinates coordinates, Place place, string contributors, bool isQuoteStatus, int retweetCount, int favoriteCount, int replyCount,
            int quoteCount, bool favorited, bool retweeted, bool possiblySensitive, bool possiblySensitiveEditable, string lang,
            string supplementalLanguage, string createdAt)
        {
            this.FullText = fullText;
            this.Truncated = truncated;
            this.Entities = entities;
            this.ExtendedEntities = extendedEntities;
            this.Source = source;
            this.InReplyToStatusId = inReplyToStatusId;
            this.InReplyToStatusIdStr = inReplyToStatusIdStr;
            this.InReplyToUserId = inReplyToUserId;
            this.InReplyToUserIdStr = inReplyToUserIdStr;
            this.InReplyToScreenName = inReplyToScreenName;
            this.UserId = userId;
            this.Geo = geo;
            this.Coordinates = coordinates;
            this.Place = place;
            this.Contributors = contributors;
            this.IsQuoteStatus = isQuoteStatus;
            this.RetweetCount = retweetCount;
            this.FavoriteCount = favoriteCount;
            this.ReplyCount = replyCount;
            this.QuoteCount = quoteCount;
            this.Favorited = favorited;
            this.Retweeted = retweeted;
            this.PossiblySensitive = possiblySensitive;
            this.PossiblySensitiveEditable = possiblySensitiveEditable;
            this.Lang = lang;
            this.SupplementalLanguage = supplementalLanguage;
            this.CreatedAt = createdAt;
        }

        public string IdStr { get; }


        public string FullText { get; set; }

        public bool Truncated { get; set; }

        // By default, EF Core will name the database columns for the properties of the owned entity type
        // following the pattern Navigation_OwnedEntityProperty.
        public Entities Entities { get; set; }

        public ExtendedEntities ExtendedEntities { get; set; }

        public string Source { get; set; }

        public int InReplyToStatusId { get; set; }

        public string InReplyToStatusIdStr { get; set; }

        public int InReplyToUserId { get; set; }

        public string InReplyToUserIdStr { get; set; }

        public string InReplyToScreenName { get; set; }

        public string UserId { get; set; }

        public Geo Geo { get; set; }

        public Coordinates Coordinates { get; set; }

        public Place Place { get; set; }

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

        public string CreatedAt { get; set; }
    }
}
