namespace Sharebook.Message.Domain.AggregateRoots.MessageAggregate.Enums
{
    using Sharebook.Common.Attributes;

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
