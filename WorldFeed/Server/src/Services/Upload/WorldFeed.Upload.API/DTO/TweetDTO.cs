﻿namespace WorldFeed.Upload.DTO
{
    using System;
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Upload.API.JsonConverters;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.Entities;
    using WorldFeed.Upload.Domain.AggregatesModel.TweetAggregate;
    using WorldFeed.Upload.Domain.AggregatesModel.TweetAggregate.Properties;

    public class TweetDTO : ITweetDTO
    {
        [JsonProperty("id")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public long Id { get; set; }

        [JsonProperty("id_str")]
        public string IdStr { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("full_text")]
        public string FullText { get; set; }

        [JsonProperty("display_text_range")]
        public int[] DisplayTextRange { get; set; }

        [JsonProperty("extended_tweet")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IExtendedTweet ExtendedTweet { get; set; }

        [JsonProperty("favorited")]
        public bool Favorited { get; set; }

        [JsonProperty("favorite_count")]
        public int? FavoriteCount { get; set; }

        [JsonProperty("user")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IUserDTO CreatedBy { get; set; }

		[JsonProperty("current_user_retweet")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetIdentifier CurrentUserRetweetIdentifier { get; set; }

        [JsonProperty("coordinates")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ICoordinates Coordinates { get; set; }

        [JsonProperty("entities")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetEntities LegacyEntities { get; set; }

        [JsonProperty("extended_entities")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetEntities Entities { get; set; }

        [JsonProperty("created_at")]
        [JsonConverter(typeof(JsonTwitterDateTimeConverter))]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("truncated")]
        public bool Truncated { get; set; }

        [JsonProperty("reply_count")]
        public int? ReplyCount { get; set; }

        [JsonProperty("in_reply_to_status_id")]
        public long? InReplyToStatusId { get; set; }

        [JsonProperty("in_reply_to_status_id_str")]
        public string InReplyToStatusIdStr { get; set; }

        [JsonProperty("in_reply_to_user_id")]
        public long? InReplyToUserId { get; set; }

        [JsonProperty("in_reply_to_user_id_str")]
        public string InReplyToUserIdStr { get; set; }

        [JsonProperty("in_reply_to_screen_name")]
        public string InReplyToScreenName { get; set; }

        [JsonProperty("quote_count")]
        public int? QuoteCount { get; set; }

        [JsonProperty("quoted_status_id")]
        public long? QuotedStatusId { get; set; }

        [JsonProperty("quoted_status_id_str")]
        public string QuotedStatusIdStr { get; set; }

        [JsonProperty("quoted_status")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetDTO QuotedTweetDTO { get; set; }

        [JsonProperty("retweet_count")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public int RetweetCount { get; set; }

        [JsonProperty("retweeted")]
        public bool Retweeted { get; set; }

        [JsonProperty("retweeted_status")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public ITweetDTO RetweetedTweetDTO { get; set; }

        [JsonProperty("possibly_sensitive")]
        public bool PossiblySensitive { get; set; }

        [JsonProperty("lang")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public Language? Language { get; set; }

        [JsonProperty("contributorsIds")]
        public int[] ContributorsIds { get; set; }

        [JsonProperty("contributors")]
        public IEnumerable<long> Contributors { get; set; }

        [JsonProperty("source")]
        public string Source { get; set; }

        [JsonProperty("place")]
        public IPlace Place { get; set; }

        [JsonProperty("scopes")]
        public Dictionary<string, object> Scopes { get; set; }

        [JsonProperty("filter_level")]
        public string FilterLevel { get; set; }

        [JsonProperty("withheld_copyright")]
        public bool WithheldCopyright { get; set; }

        [JsonProperty("withheld_in_countries")]
        public IEnumerable<string> WithheldInCountries { get; set; }

        [JsonProperty("withheld_scope")]
        public string WithheldScope { get; set; }
    }
}
