namespace Sharebook.Message.Domain.AggregateRoots.MessageAggregate
{
    using Sharebook.Message.Domain.AggregateRoots.MessageAggregate.Enums;

    public interface IQuickReplyResponse
    {
        QuickReplyType Type { get; }

        string Metadata { get; }
    }
}
