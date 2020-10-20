namespace Sharebook.Common.Public.Models.Interfaces.DTO
{
    using Sharebook.Common.Public.Models.Entities;

    using Sharebook.Common.Public.Models.Enums;

    public interface IAttachmentDTO
    {
        AttachmentType Type { get; set; }

        IMediaEntity Media { get; set; }
    }
}
