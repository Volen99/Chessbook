namespace WorldFeed.Upload.Domain.Factories.Tweet
{
    using System.Collections.Generic;

    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Settings;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.Enums;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.TwitterEntities;
    using WorldFeed.Upload.Domain.AggregatesModel.TweetAggregate.Properties;
    using WorldFeed.Upload.Domain.AggregatesModel.TweetAggregate;
    using System;

    internal class TweetFactory : ITweetFactory
    {
        private string idStr = default!;
        private string text = default!;
        private string fullText = default!;
        private bool truncated = false;
        private TweetEntities tweetEntities = default!;
        private string source = default!;
        private int inReplyToStatusId = 0;
        private string inReplyToStatusIdStr = default!;
        private int inReplyToUserId = 0!;
        private string inReplyToUserIdStr = default!;
        private string inReplyToScreenName = default!;
        private string userId = default!;
        private Geo geo = default!;
        private Coordinates coordinates = default!;
        private Place place = default!;
        private string contributors = default!;
        private bool isQuoteStatus = false;
        private int retweetCount = 0;
        private int favoriteCount = 0;
        private int replyCount = 0;
        private int quoteCount = 0;
        private bool favorited = false;
        private bool retweeted = false;
        private bool possiblySensitive = false;
        private bool possiblySensitiveEditable = false;
        private string lang = default!;
        private string supplementalLanguage = default!;
        private string createdAt = default!;

        public ITweetFactory WithIdStr(string idStr)
        {
            this.idStr = idStr;

            return this;
        }

        public ITweetFactory WithText(string text)
        {
            this.text = text;

            return this;
        }

        public ITweetFactory WithFullText(string fullText)
        {
            this.fullText = fullText;

            return this;
        }

        public ITweetFactory WithContributors(string contributors)
        {
            this.contributors = contributors;

            return this;
        }

        public ITweetFactory WithCoordinates(double latitude, double longitude)
        {
            return this.WithCoordinates(new Coordinates(latitude, longitude));
        }

        public ITweetFactory WithCoordinates(Coordinates coordinates)
        {
            this.coordinates = coordinates;

            return this;
        }

        public ITweetFactory WithCreatedAt(string createdAt)
        {
            this.createdAt = createdAt;

            return this;
        }

        public ITweetFactory WithFavoriteCount(int favoriteCount)
        {
            this.favoriteCount = favoriteCount;

            return this;
        }

        public ITweetFactory WithFavorited(bool favorited)
        {
            this.favorited = favorited;

            return this;
        }

        public ITweetFactory WithGeo(string type, List<Coordinates> coordinates)
        {
            return this.WithGeo(new Geo(type, coordinates));
        }

        public ITweetFactory WithGeo(Geo geo)
        {
            this.geo = geo;

            return this;
        }

        public ITweetFactory WithInReplyToScreenName(string inReplyToScreenName)
        {
            this.inReplyToScreenName = inReplyToScreenName;

            return this;
        }

        public ITweetFactory WithInReplyToStatusId(int inReplyToStatusId)
        {
            this.inReplyToStatusId = inReplyToStatusId;

            return this;
        }

        public ITweetFactory WithInReplyToStatusIdStr(string inReplyToStatusIdStr)
        {
            this.inReplyToStatusIdStr = inReplyToStatusIdStr;

            return this;
        }

        public ITweetFactory WithInReplyToUserId(int inReplyToUserId)
        {
            this.inReplyToUserId = inReplyToUserId;

            return this;
        }

        public ITweetFactory WithInReplyToUserIdStr(string inReplyToUserIdStr)
        {
            this.inReplyToUserIdStr = inReplyToUserIdStr;

            return this;
        }

        public ITweetFactory WithIsQuoteStatus(bool isQuoteStatus)
        {
            this.isQuoteStatus = isQuoteStatus;

            return this;
        }

        public ITweetFactory WithLang(string lang)
        {
            this.lang = lang;

            return this;
        }

        public ITweetFactory WithPlace(string idStr, string name, string fullName, string url, PlaceType placeType, string country, string countryCode, Dictionary<string, string> attributes, List<Place> containedWithin, Geo boundingBox, Geo geometry)
        {
            return this.WithPlace(new Place(idStr, name, fullName, url, placeType, country, countryCode, attributes, containedWithin, boundingBox, geometry));
        }

        public ITweetFactory WithPlace(Place place)
        {
            this.place = place;

            return this;
        }

        public ITweetFactory WithPossiblySensitive(bool possiblySensitive)
        {
            this.possiblySensitive = possiblySensitive;

            return this;
        }

        public ITweetFactory WithPossiblySensitiveEditable(bool possiblySensitiveEditable)
        {
            this.possiblySensitiveEditable = possiblySensitiveEditable;

            return this;
        }

        public ITweetFactory WithQuoteCount(int quoteCount)
        {
            this.quoteCount = quoteCount;

            return this;
        }

        public ITweetFactory WithReplyCount(int replyCount)
        {
            this.replyCount = replyCount;

            return this;
        }

        public ITweetFactory WithRetweetCount(int retweetCount)
        {
            this.replyCount = retweetCount;

            return this;
        }

        public ITweetFactory WithRetweeted(bool retweeted)
        {
            this.retweeted = retweeted;

            return this;
        }

        public ITweetFactory WithSource(string source)
        {
            this.source = source;

            return this;
        }

        public ITweetFactory WithSupplementalLanguage(string supplementalLanguage)
        {
            this.supplementalLanguage = supplementalLanguage;

            return this;
        }

        public ITweetFactory WithTruncated(bool truncated)
        {
            this.truncated = truncated;

            return this;
        }

        public ITweetFactory WithTweetEntities(TweetMode tweetMode)
        {
            return this.WithTweetEntities(new TweetEntities(tweetMode));
        }

        public ITweetFactory WithTweetEntities(TweetEntities tweetEntities)
        {
            this.tweetEntities = tweetEntities;

            return this;
        }

        public ITweetFactory WithUserId(string userId)
        {
            this.userId = userId;

            return this;
        }

        public Tweet Build()
        {
            if (this.tweetEntities == null || geo == null || this.coordinates == null)
            {
                throw new ArgumentNullException(); //InvalidTweetException("Tweet Entities, geo and coordinates must have a value.");
            }

            return new Tweet(this.text, this.fullText, this.truncated, this.tweetEntities, this.source, this.inReplyToStatusId, this.inReplyToStatusIdStr,
                this.inReplyToUserId, this.inReplyToUserIdStr, this.inReplyToScreenName, this.userId, this.geo, this.coordinates, this.place,
                this.contributors, this.isQuoteStatus, this.retweetCount, this.favoriteCount, this.replyCount, this.quoteCount, this.favorited,
                this.retweeted, this.possiblySensitive, this.possiblySensitiveEditable, this.lang, this.supplementalLanguage, this.createdAt);
        }
    }
}
