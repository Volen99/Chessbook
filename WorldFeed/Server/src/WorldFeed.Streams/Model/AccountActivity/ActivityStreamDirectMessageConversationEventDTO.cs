﻿namespace WorldFeed.Streams.Model.AccountActivity
{
    using System;
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    public class ActivityStreamTargetRecipientDTO
    {
        [JsonProperty("recipient_id")]
        public long RecipientId { get; set; }
    }

    public class ActivityStreamDirectMessageConversationEventDTO
    {
        [JsonProperty("created_timestamp")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("sender_id")]
        public long SenderId { get; set; }

        [JsonProperty("target")]
        public ActivityStreamTargetRecipientDTO Target { get; set; }

        [JsonProperty("last_read_event_id")]
        public string LastReadEventId { get; set; }
    }
}
