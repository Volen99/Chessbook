namespace WorldFeed.Message.Domain.AggregateRoots.MessageAggregate
{
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate.Enums;

    public interface IQuickReplyResponse
    {
        QuickReplyType Type { get; }

        string Metadata { get; }
    }
}
