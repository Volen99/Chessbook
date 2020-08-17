namespace WorldFeed.Common.Models.WorldFeed.Feed
{
    using global::WorldFeed.Common.Models.WorldFeed.Feed.Properties;
    using global::WorldFeed.Common.Public.Models;

    public interface IFeed
    {
         string IdStr { get; }

         string CreatedAt { get; set; }           // UTC time when this Tweet was created

         string FullText { get; set; }

         bool Truncated { get; set; }             // Indicates whether the value of the text parameter was truncated...

         long ExtendedEntitiesId { get; set; }

         string Source { get; set; } // Utility used to post the Tweet, as an HTML-formatted string. Tweets from the Twitter website have a source value of web

         int InReplyToStatusId { get; set; } // If the represented Tweet is a reply, this field will contain the integer representation of the original ID

         string InReplyToStatusIdStr { get; set; }

         int InReplyToUserId { get; set; }  // If the represented Tweet is a reply, it will contain the integer representation of the original author ID

         string InReplyToUserIdStr { get; set; }

         string InReplyToScreenName { get; set; } // If the represented Tweet is a reply, it will contain the screen name of the original Tweet’s author

         string UserId { get; set; }                   // The user who posted this Tweet
        
         //Coordinates Coordinates { get; set; }

         //PlaceFeed Place { get; set; }

         string Contributors { get; set; }

         bool IsQuoteStatus { get; set; }

         int RetweetCount { get; set; }

         int FavoriteCount { get; set; }

         int ReplyCount { get; set; }

         int QuoteCount { get; set; }

         bool Favorited { get; set; }

         bool Retweeted { get; set; }

         bool PossiblySensitive { get; set; }

         bool PossiblySensitiveEditable { get; set; }

         string Lang { get; set; }

         string SupplementalLanguage { get; set; }
    }
}
