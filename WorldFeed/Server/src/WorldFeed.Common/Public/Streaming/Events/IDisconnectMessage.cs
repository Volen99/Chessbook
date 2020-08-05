namespace WorldFeed.Common.Public.Streaming.Events
{
    public interface IDisconnectMessage
    {
        int Code { get; set; }

        string StreamName { get; set; }

        string Reason { get; set; }
    }
}
