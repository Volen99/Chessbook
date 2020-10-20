namespace Sharebook.Message.Domain.AggregateRoots.MessageAggregate
{
    using Newtonsoft.Json;

    public class QuickReplyOption : IQuickReplyOption
    {

        [JsonProperty("label")]
        public string Label { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("metadata")]
        public string Metadata { get; set; }
    }
}
