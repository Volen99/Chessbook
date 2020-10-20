namespace Sharebook.Message.DTO
{
    using Sharebook.Message.Domain.AggregateRoots.MessageAggregate;
    using Sharebook.Message.Domain.AggregateRoots.MessageAggregate.Enums;

    public interface IQuickReplyDTO
    {
        QuickReplyType Type { get; set; }

        IQuickReplyOption[] Options { get; set; }
    }
}
