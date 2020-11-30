namespace Sharebook.Storage.API.ViewModels
{
    using System;
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Storage.API.Data.Models.Properties;
    using Sharebook.Storage.API.Data.Models.TwitterEntities;

    public class UserDTO : UserIdentifierDTO
    {
        public string Text { get; set; }

        public string FullText { get; set; }

        public int[] DisplayTextRange { get; set; }

        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ExtendedTweet ExtendedTweet { get; set; }

        public bool Favorited { get; set; }

        public int? FavoriteCount { get; set; }

        [JsonProperty("user")]
        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public UserDTO CreatedBy { get; set; }

        [JsonProperty("currentUserRetweet")]
        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetIdentifier CurrentUserRetweetIdentifier { get; set; }

        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ICoordinates Coordinates { get; set; }

        [JsonProperty("entities")]
        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public TweetEntities LegacyEntities { get; set; }

        [JsonProperty("extendedEntities")]
        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public TweetEntities Entities { get; set; }

        [JsonProperty("createdAt")]
        // [JsonConverter(typeof(JsonTwitterDateTimeOffsetConverter))]
        public DateTimeOffset CreatedAt { get; set; }

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

        [JsonProperty("quotedStatus")]
       // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public TweetDTO QuotedTweetDTO { get; set; }

       // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public int RetweetCount { get; set; }

        public bool Retweeted { get; set; }

        [JsonProperty("retweetedStatus")]
       // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public TweetDTO RetweetedTweetDTO { get; set; }

        public bool PossiblySensitive { get; set; }

        [JsonProperty("lang")]
       // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public Language? Language { get; set; }

        [JsonProperty("contributorsIds")]
        public int[] ContributorsIds { get; set; }

        public IEnumerable<long> Contributors { get; set; }

        public string Source { get; set; }

        public Place Place { get; set; }

        public Dictionary<string, object> Scopes { get; set; }

        public string FilterLevel { get; set; }

        public bool WithheldCopyright { get; set; }

        public IEnumerable<string> WithheldInCountries { get; set; }

        public string WithheldScope { get; set; }
    }
}
