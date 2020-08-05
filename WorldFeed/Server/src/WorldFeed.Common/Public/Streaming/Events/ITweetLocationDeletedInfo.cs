namespace WorldFeed.Common.Public.Streaming.Events
{
    public interface ITweetLocationDeletedInfo
    {
        long UserId { get; }

        string UserIdStr { get; }

        long UpToStatusId { get; }

        string UpToStatusIdStr { get; }
    }
}
