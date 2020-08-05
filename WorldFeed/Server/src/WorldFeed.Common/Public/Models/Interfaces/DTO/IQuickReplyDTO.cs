namespace WorldFeed.Common.Public.Models.Interfaces.DTO
{
    using WorldFeed.Common.Public.Models.Enums;

    public interface IQuickReplyDTO
    {
        QuickReplyType Type { get; set; }

        IQuickReplyOption[] Options { get; set; }
    }
}
