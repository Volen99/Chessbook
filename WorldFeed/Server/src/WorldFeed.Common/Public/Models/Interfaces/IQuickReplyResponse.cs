namespace WorldFeed.Common.Public.Models.Interfaces
{
    using WorldFeed.Common.Public.Models.Enums;

    public interface IQuickReplyResponse
    {
        QuickReplyType Type { get; }
        string Metadata { get; }
    }
}
