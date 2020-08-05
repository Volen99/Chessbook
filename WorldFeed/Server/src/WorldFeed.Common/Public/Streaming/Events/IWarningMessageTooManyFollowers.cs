namespace WorldFeed.Common.Public.Streaming.Events
{
    public interface IWarningMessageTooManyFollowers : IWarningMessage
    {
        long UserId { get; }

        string TimestampInMs { get; set; }
    }
}
