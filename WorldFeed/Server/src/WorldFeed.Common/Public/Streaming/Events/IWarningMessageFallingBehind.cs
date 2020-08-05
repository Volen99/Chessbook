namespace WorldFeed.Common.Public.Streaming.Events
{
    public interface IWarningMessageFallingBehind : IWarningMessage
    {
        int PercentFull { get; }
    }
}
