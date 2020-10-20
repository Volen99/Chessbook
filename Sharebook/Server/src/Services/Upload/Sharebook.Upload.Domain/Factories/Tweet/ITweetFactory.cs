namespace Sharebook.Upload.Domain.Factories.Tweet
{
    using System.Collections.Generic;

    using Sharebook.Common.Public.Models;
    using Sharebook.Upload.Domain.AggregatesModel.PostAggregate.Enums;
    using Sharebook.Upload.Domain.AggregatesModel.PostAggregate.TwitterEntities;
    using Sharebook.Upload.Domain.AggregatesModel.TweetAggregate;
    using Sharebook.Upload.Domain.AggregatesModel.TweetAggregate.Properties;

    public interface ITweetFactory : IFactory<Tweet>
    {
        ITweetFactory WithIdStr(string idStr);

        ITweetFactory WithText(string text);

        ITweetFactory WithFullText(string fullText);

        ITweetFactory WithTruncated(bool truncated);

        ITweetFactory WithTweetEntities(TweetEntities tweetEntities);

        ITweetFactory WithSource(string source);

        ITweetFactory WithInReplyToStatusId(int inReplyToStatusId);

        ITweetFactory WithInReplyToStatusIdStr(string inReplyToStatusIdStr);

        ITweetFactory WithInReplyToUserId(int inReplyToUserId);

        ITweetFactory WithInReplyToUserIdStr(string inReplyToUserIdStr);

        ITweetFactory WithInReplyToScreenName(string inReplyToScreenName);

        ITweetFactory WithUserId(string userId);

        ITweetFactory WithGeo(string type, List<Coordinates> coordinates);

        ITweetFactory WithCoordinates(double latitude, double longitude);

        ITweetFactory WithPlace(string idStr, string name, string fullName, string url, PlaceType placeType, string country, string countryCode, Dictionary<string, string> attributes, List<Place> containedWithin, Geo boundingBox, Geo geometry);

        ITweetFactory WithContributors(string contributors);

        ITweetFactory WithIsQuoteStatus(bool isQuoteStatus);

        ITweetFactory WithRetweetCount(int retweetCount);

        ITweetFactory WithFavoriteCount(int favoriteCount);

        ITweetFactory WithReplyCount(int replyCount);

        ITweetFactory WithQuoteCount(int quoteCount);

        ITweetFactory WithFavorited(bool favorited);

        ITweetFactory WithRetweeted(bool retweeted);

        ITweetFactory WithPossiblySensitive(bool possiblySensitive);

        ITweetFactory WithPossiblySensitiveEditable(bool possiblySensitiveEditable);

        ITweetFactory WithLang(string lang);

        ITweetFactory WithSupplementalLanguage(string supplementalLanguage);

        ITweetFactory WithCreatedAt(string createdAt);
    }
}
