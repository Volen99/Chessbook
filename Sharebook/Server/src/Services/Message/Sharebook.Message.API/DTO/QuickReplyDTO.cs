namespace Sharebook.Message.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Message.Domain.AggregateRoots.MessageAggregate;
    using Sharebook.Message.Domain.AggregateRoots.MessageAggregate.Enums;

    public class QuickReplyDTO : IQuickReplyDTO
    {
        [JsonProperty("type")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public QuickReplyType Type { get; set; }

        [JsonProperty("options")]
        public IQuickReplyOption[] Options { get; set; }
    }
}
