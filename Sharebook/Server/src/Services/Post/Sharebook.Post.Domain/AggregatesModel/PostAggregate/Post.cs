namespace Sharebook.Post.Domain.AggregatesModel.PostAggregate
{
    using System;
    using System.Threading.Tasks;

    using Sharebook.Common.Public.Models;
    using Sharebook.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities;
    using Sharebook.Post.Domain.AggregatesModel.TweetAggregate.Properties;
    using Sharebook.Post.Domain.Common;

    public class Post : Entity<long>, IAggregateRoot
    {
        internal Post(string text, string fullText, bool truncated, TweetEntities entities, string source, int inReplyToStatusId, string inReplyToStatusIdStr,
            int inReplyToUserId, string inReplyToUserIdStr, string inReplyToScreenName, string userId, Geo geo, Coordinates coordinates, Place place,
            string contributors, bool isQuoteStatus, int retweetCount, int favoriteCount, int replyCount, int quoteCount, bool favorited, bool retweeted,
            bool possiblySensitive, bool possiblySensitiveEditable, string lang, string supplementalLanguage, string createdAt)
        {
            this.Text = text;
            this.FullText = fullText;
            this.Truncated = truncated;
            this.Entities = entities;
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

        private Post(string text, string fullText, bool truncated, string source, int inReplyToStatusId, string inReplyToStatusIdStr, int inReplyToUserId,
            string inReplyToUserIdStr, string inReplyToScreenName, string userId, string contributors, bool isQuoteStatus, int retweetCount,
            int favoriteCount, int replyCount, int quoteCount, bool favorited, bool retweeted, bool possiblySensitive,
            bool possiblySensitiveEditable, string lang, string supplementalLanguage, string createdAt)
        {
            this.Text = text;
            this.FullText = fullText;
            this.Truncated = truncated;
            this.Source = source;
            this.InReplyToStatusId = inReplyToStatusId;
            this.InReplyToStatusIdStr = inReplyToStatusIdStr;
            this.InReplyToUserId = inReplyToUserId;
            this.InReplyToUserIdStr = inReplyToUserIdStr;
            this.InReplyToScreenName = inReplyToScreenName;
            this.UserId = userId;
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

        public string IdStr { get; private set; }

        public string Text { get; set; }

        public string Prefix { get; }

        public string Suffix { get; set; }

        public string FullText { get; private set; }

        public bool Truncated { get; private set; }

        public TweetEntities Entities { get; private set; }

        // public ExtendedEntities ExtendedEntities { get; private set; }

        public string Source { get; private set; }

        public int InReplyToStatusId { get; private set; }

        public string InReplyToStatusIdStr { get; private set; }

        public int InReplyToUserId { get; private set; }

        public string InReplyToUserIdStr { get; private set; }

        public string InReplyToScreenName { get; private set; }

        public string UserId { get; private set; }

        public Geo Geo { get; private set; }

        public Coordinates Coordinates { get; private set; }

        public Place Place { get; private set; }

        public string Contributors { get; private set; }

        public bool IsQuoteStatus { get; private set; }

        public int RetweetCount { get; private set; }

        public int FavoriteCount { get; private set; }

        public int ReplyCount { get; private set; }

        public int QuoteCount { get; private set; }

        public bool Favorited { get; private set; }

        public bool Retweeted { get; private set; }

        public bool PossiblySensitive { get; private set; }

        public bool PossiblySensitiveEditable { get; private set; }

        public string Lang { get; private set; }

        public string SupplementalLanguage { get; private set; }

        public string CreatedAt { get; private set; }

        //public Task<IPost[]> GetRetweetsAsync()
        //{
        //    return Client.Tweets.GetRetweetsAsync(this);
        //}

        //public Task DestroyRetweetAsync()
        //{
        //    return Client.Tweets.DestroyTweetAsync(this);
        //}

        //public Task<IOEmbedTweet> GenerateOEmbedTweetAsync()
        //{
        //    return Client.Tweets.GetOEmbedTweetAsync(this);
        //}

        //public Task DestroyAsync()
        //{
        //    return Client.Tweets.DestroyTweetAsync(this);
        //}

        //public Task FavoriteAsync()
        //{
        //    return Client.Tweets.FavoriteTweetAsync(this);
        //}

        //public Task UnfavoriteAsync()
        //{
        //    return Client.Tweets.UnfavoriteTweetAsync(this);
        //}

        public override string ToString()
        {
            return FullText;
        }

        //public bool Equals(IPost other)
        //{
        //    if (other == null)
        //    {
        //        return false;
        //    } 

        //    // Equals is currently used to compare only if 2 tweets are the same
        //    // We do not look for the tweet version (DateTime)

        //    return _tweetDTO.Equals(other.TweetDTO);
        //}
    }
}
