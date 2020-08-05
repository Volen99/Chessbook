namespace WorldFeed.Common.Public.Models.Enums
{
    using WorldFeed.Common.Attributes;

    public enum EventType
    {
        /// <summary>
        /// Default value used when the string from Twitter is not a value in the Enum
        /// </summary>
        UnrecognisedValue = 0,

        [JsonEnumString("message_create")]
        MessageCreate
    }
}
