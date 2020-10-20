﻿namespace Sharebook.Message.Domain.AggregateRoots.MessageAggregate
{
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Message.Domain.AggregateRoots.MessageAggregate.Enums;

    public class QuickReplyResponse : IQuickReplyResponse
    {
        [JsonProperty("type")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public QuickReplyType Type { get; set; }

        [JsonProperty("metadata")]
        public string Metadata { get; set; }
    }
}