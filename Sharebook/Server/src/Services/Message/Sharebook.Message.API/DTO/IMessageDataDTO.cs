namespace Sharebook.Message.DTO
{
    using Sharebook.Common.Public.Models.Entities;
    using Sharebook.Message.Domain.AggregateRoots.MessageAggregate;

    public interface IMessageDataDTO
    {
        string Text { get; set; }

        IMessageEntities Entities { get; set; }

        IQuickReplyDTO QuickReply { get; set; }

        IQuickReplyResponse QuickReplyResponse { get; set; }

        IAttachmentDTO Attachment { get; set; }
    }
}
