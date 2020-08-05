namespace WorldFeed.Common.Public.Streaming.Events
{
    public interface IWarningMessage
    {
        string Code { get; }

        string Message { get; }
    }
}
