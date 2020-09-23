namespace WorldFeed.Message.DTO
{
    using WorldFeed.Common.Public.Models.Entities;
    using WorldFeed.Message.Domain.AggregateRoots.MessageAggregate;

    public interface IMessageDataDTO
    {
        string Text { get; set; }

        IMessageEntities Entities { get; set; }

        IQuickReplyDTO QuickReply { get; set; }

        IQuickReplyResponse QuickReplyResponse { get; set; }

        IAttachmentDTO Attachment { get; set; }
    }
}
