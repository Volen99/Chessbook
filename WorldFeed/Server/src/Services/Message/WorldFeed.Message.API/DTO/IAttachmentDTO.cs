namespace WorldFeed.Common.Public.Models.Interfaces.DTO
{
    using WorldFeed.Common.Public.Models.Entities;

    using WorldFeed.Common.Public.Models.Enums;

    public interface IAttachmentDTO
    {
        AttachmentType Type { get; set; }

        IMediaEntity Media { get; set; }
    }
}
