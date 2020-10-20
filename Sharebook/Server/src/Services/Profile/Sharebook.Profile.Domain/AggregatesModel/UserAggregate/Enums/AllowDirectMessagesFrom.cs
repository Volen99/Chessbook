namespace Sharebook.Profile.Domain.AggregatesModel.UserAggregate.Enums
{
    public enum AllowDirectMessagesFrom
    {
        /// <summary>
        /// User can receive messages from people he follows
        /// </summary>
        Following,

        /// <summary>
        /// User can receive messages from anyone
        /// </summary>
        All
    }
}
