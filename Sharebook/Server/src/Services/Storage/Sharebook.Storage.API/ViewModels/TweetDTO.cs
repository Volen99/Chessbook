namespace Sharebook.Storage.API.ViewModels
{
    using System;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Storage.API.Data.Models.Properties;
    using Sharebook.Storage.API.Data.Models.TwitterEntities;

    public class TweetDTO
    {
        public long Id { get; set; }

        public string IdStr { get; set; }

        public string Text { get; set; }

        public string FullText { get; set; }

        public int[] DisplayTextRange { get; set; }

        public ExtendedTweet ExtendedTweet { get; set; }

        public bool Favorited { get; set; }

        public int? FavoriteCount { get; set; }

        [JsonProperty("user")]
        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public UserDTO CreatedBy { get; set; }

        [JsonProperty("currentUserRetweet")]
        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetIdentifier CurrentUserRetweetIdentifier { get; set; }

        public ICoordinates Coordinates { get; set; }

        [JsonProperty("entities")]
        public TweetEntities LegacyEntities { get; set; }

        [JsonProperty("extendedEntities")]
        public TweetEntities Entities { get; set; }

        public DateTimeOffset CreatedAt { get; set; } // we have it here :D

        public bool Truncated { get; set; }

        public int? ReplyCount { get; set; }

        public long? InReplyToStatusId { get; set; }

        public string InReplyToStatusIdStr { get; set; }

        public long? InReplyToUserId { get; set; }

        public string InReplyToUserIdStr { get; set; }

        public string InReplyToScreenName { get; set; }

        public int? QuoteCount { get; set; }

        public long? QuotedStatusId { get; set; }

        public string QuotedStatusIdStr { get; set; }

        public TweetDTO QuotedTweetDTO { get; set; }

        public int RetweetCount { get; set; }

        public bool Retweeted { get; set; }

        [JsonProperty("retweetedStatus")]
        public TweetDTO RetweetedTweetDTO { get; set; }

        public bool PossiblySensitive { get; set; }

        [JsonProperty("lang")]
        public Language? Language { get; set; }

        [JsonProperty("contributorsIds")]
        public int[] ContributorsIds { get; set; }

        [JsonProperty("contributors")]
        public IEnumerable<long> Contributors { get; set; }

        [JsonProperty("source")]
        public string Source { get; set; }

        [JsonProperty("place")]
        public Place Place { get; set; }

        [JsonProperty("scopes")]
        public Dictionary<string, object> Scopes { get; set; }

        public string FilterLevel { get; set; }

        public bool WithheldCopyright { get; set; }

        public IEnumerable<string> WithheldInCountries { get; set; }

        public string WithheldScope { get; set; }
    }
}
