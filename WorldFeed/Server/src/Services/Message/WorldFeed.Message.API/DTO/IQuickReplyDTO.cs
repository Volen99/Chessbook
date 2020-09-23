namespace WorldFeed.Message.DTO
{
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate.Enums;

    public interface IQuickReplyDTO
    {
        QuickReplyType Type { get; set; }

        IQuickReplyOption[] Options { get; set; }
    }
}
