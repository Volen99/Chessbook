namespace WorldFeed.Message.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate.Enums;

    public class QuickReplyDTO : IQuickReplyDTO
    {
        [JsonProperty("type")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public QuickReplyType Type { get; set; }

        [JsonProperty("options")]
        public IQuickReplyOption[] Options { get; set; }
    }
}
