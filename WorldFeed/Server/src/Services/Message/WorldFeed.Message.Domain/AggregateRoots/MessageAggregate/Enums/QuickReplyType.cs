namespace WorldFeed.Message.Domain.AggregateRoots.MessageAggregate.Enums
{
    using WorldFeed.Common.Attributes;

    public enum QuickReplyType
    {
        /// <summary>
        /// Default value used when the string from Twitter is not a value in the Enum
        /// </summary>
        UnrecognisedValue = 0,

        [JsonEnumString("options")]
        Options
    }
}
