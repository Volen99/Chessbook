namespace WorldFeed.Common.Public.Models.Interfaces.DTO
{
    using WorldFeed.Common.Public.Models.Entities;

    public interface IMessageDataDTO
    {
        string Text { get; set; }

        IMessageEntities Entities { get; set; }

        IQuickReplyDTO QuickReply { get; set; }

        IQuickReplyResponse QuickReplyResponse { get; set; }

        IAttachmentDTO Attachment { get; set; }
    }
}
