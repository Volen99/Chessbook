﻿namespace Sharebook.Storage.API.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Settings;
    using Sharebook.Storage.API.Data.Models.Properties;
    using Sharebook.Storage.API.Data.Models.TwitterEntities;

    // ReSharper disable UnusedMember.Global

    /// <summary>
    /// ... Well a Tweet :)
    /// https://dev.twitter.com/docs/platform-objects/tweets
    /// </summary>
    public interface IPost : ITweetIdentifier, IEquatable<IPost>
    {
        /// <summary>
        /// Client used by the instance to perform any request to Twitter
        /// </summary>
        //ITwitterClient Client { get; set; }

        #region Twitter API Properties

        /// <summary>
        /// Creation date of the Tweet
        /// </summary>
        DateTime CreatedAt { get; }

        /// <summary>
        /// Formatted text of the tweet.
        /// </summary>
        string Text { get; }

        /// <summary>
        /// Prefix of an extended tweet.
        /// </summary>
        string Prefix { get; }

        /// <summary>
        /// Suffix of an extended tweet.
        /// </summary>
        string Suffix { get; }

        /// <summary>
        /// Full text of an extended tweet.
        /// </summary>
        string FullText { get; }

        /// <summary>
        /// Content display text range for FullText.
        /// </summary>
        int[] DisplayTextRange { get; }

        /// <summary>
        /// The range of text to be displayed for any Tweet.
        /// If this is an Extended Tweet, this will be the range supplied by Twitter.
        /// If this is an old-style 140 character Tweet, the range will be 0 - Length.
        /// </summary>
        int[] SafeDisplayTextRange { get; }

        /// <summary>
        /// Extended Tweet details.
        /// </summary>
       // IExtendedTweet ExtendedTweet { get; }

        /// <summary>
        /// Coordinates of the location from where the tweet has been sent
        /// </summary>
        ICoordinates Coordinates { get; }

        /// <summary>
        /// source field
        /// </summary>
        string Source { get; }

        /// <summary>
        /// Whether the tweet text was truncated because it was longer than 140 characters.
        /// </summary>
        bool Truncated { get; }

        /// <summary>
        /// Number of times this Tweet has been replied to
        /// This property is only available with the Premium and Enterprise tier products.
        /// </summary>
        int? ReplyCount { get; }

        /// <summary>
        /// In_reply_to_status_id
        /// </summary>
        long? InReplyToStatusId { get; }

        /// <summary>
        /// In_reply_to_status_id_str
        /// </summary>
        string InReplyToStatusIdStr { get; }

        /// <summary>
        /// In_reply_to_user_id
        /// </summary>
        long? InReplyToUserId { get; }

        /// <summary>
        /// In_reply_to_user_id_str
        /// </summary>
        string InReplyToUserIdStr { get; }

        /// <summary>
        /// In_reply_to_screen_name
        /// </summary>
        string InReplyToScreenName { get; }

        /// <summary>
        /// User who created the Tweet
        /// </summary>
        //IUser CreatedBy { get; }

        /// <summary>
        /// Details the Tweet ID of the user's own retweet (if existent) of this Tweet.
        /// </summary>
        ITweetIdentifier CurrentUserRetweetIdentifier { get; }

        /// <summary>
        /// Ids of the users who contributed in the Tweet
        /// </summary>
        int[] ContributorsIds { get; }

        /// <summary>
        /// Users who contributed to the authorship of the tweet, on behalf of the official tweet author.
        /// </summary>
        IEnumerable<long> Contributors { get; }

        /// <summary>
        /// Number of retweets related with this tweet
        /// </summary>
        int RetweetCount { get; }

        /// <summary>
        /// Extended entities in the tweet. Used by twitter for multiple photos
        /// </summary>
        TweetEntities Entities { get; }

        /// <summary>
        /// Is the tweet Favorited
        /// </summary>
        bool Favorited { get; }

        /// <summary>
        /// Number of time the tweet has been Favorited
        /// </summary>
        int FavoriteCount { get; }

        /// <summary>
        /// Has the tweet been retweeted
        /// </summary>
        bool Retweeted { get; }

        /// <summary>
        /// Is the tweet potentialy sensitive
        /// </summary>
        bool PossiblySensitive { get; }

        /// <summary>
        /// Main language used in the tweet
        /// </summary>
        Language? Language { get; }

        /// <summary>
        /// Geographic details concerning the location where the tweet has been published
        /// </summary>
        Place Place { get; }

        /// <summary>
        /// Informed whether a tweet is displayed or not in a specific type of scope. This property is most of the time null.
        /// </summary>
        Dictionary<string, object> Scopes { get; }

        /// <summary>
        /// Streaming tweets requires a filter level. A tweet will be streamed if its filter level is higher than the one of the stream
        /// </summary>
        string FilterLevel { get; }

        /// <summary>
        /// Informs that a tweet has been withheld for a copyright reason
        /// </summary>
        bool WithheldCopyright { get; }

        /// <summary>
        /// Countries in which the tweet will be withheld
        /// </summary>
        IEnumerable<string> WithheldInCountries { get; }

        /// <summary>
        /// When present, indicates whether the content being withheld is the "status" or a "user."
        /// </summary>
        string WithheldScope { get; }

        #endregion

        #region Tweetinvi API Properties

        /// <summary>
        /// Property used to store the data received from Twitter
        /// </summary>
        //ITweetDTO TweetDTO { get; }

        /// <summary>
        /// Collection of hashtags associated with a Tweet
        /// </summary>
        List<HashtagEntity> Hashtags { get; }

        /// <summary>
        /// Collection of urls associated with a tweet
        /// </summary>
        List<UrlEntity> Urls { get; }

        /// <summary>
        /// Collection of medias associated with a tweet
        /// </summary>
        List<MediaEntity> Media { get; }

        /// <summary>
        /// Collection of tweets mentioning this tweet
        /// </summary>
        List<UserMentionEntity> UserMentions { get; }

        /// <summary>
        /// Indicates whether the current tweet is a retweet of another tweet
        /// </summary>
        bool IsRetweet { get; }

        /// <summary>
        /// If the tweet is a retweet this field provides
        /// the tweet that it retweeted
        /// </summary>
        IPost RetweetedTweet { get; }

        /// <summary>
        /// Indicates approximately how many times this Tweet has been quoted by Twitter users.
        /// This property is only available with the Premium and Enterprise tier products.
        /// </summary>
        int? QuoteCount { get; }

        /// <summary>
        /// Tweet Id that was retweeted with a quote
        /// </summary>
        long? QuotedStatusId { get; }

        /// <summary>
        /// Tweet Id that was retweeted with a quote
        /// </summary>
        string QuotedStatusIdStr { get; }

        /// <summary>
        /// Tweet that was retweeted with a quote
        /// </summary>
        IPost QuotedTweet { get; }

        /// <summary>
        /// URL of the tweet on twitter.com
        /// </summary>
        string Url { get; }

        TweetMode TweetMode { get; }

        #endregion

        #region Favorites

        /// <summary>
        /// Favorites the tweet
        /// </summary>
        Task FavoriteAsync();

        /// <summary>
        /// Remove the tweet from favorites
        /// </summary>
        Task UnfavoriteAsync();

        #endregion

        /// <summary>
        /// Retweet the current tweet from the authenticated user.
        /// </summary>
        Task<IPost> PublishRetweetAsync();

        /// <summary>
        /// Get the retweets of the current tweet
        /// </summary>
        Task<IPost[]> GetRetweetsAsync();

        /// <summary>
        /// Remove your retweet.
        /// </summary>
        Task DestroyRetweetAsync();

        /// <summary>
        /// Delete a tweet from Twitter
        /// </summary>
        Task DestroyAsync();

        /// <summary>
        /// Generate an OEmbedTweet.
        /// </summary>
        // Task<OEmbedTweet> GenerateOEmbedTweetAsync();
    }
}
