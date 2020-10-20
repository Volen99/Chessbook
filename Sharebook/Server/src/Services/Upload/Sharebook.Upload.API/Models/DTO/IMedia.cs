namespace Sharebook.Upload.Models.DTO
{
    using Sharebook.Upload.DTO;

    public interface IMedia
    {
        string Name { get; set; }

        byte[] Data { get; set; }

        long? Id { get; set; }

        string ContentType { get; set; }

        bool HasBeenUploaded { get; }

        bool IsReadyToBeUsed { get; }

        IUploadedMediaInfo UploadedMediaInfo { get; set; }

        IMedia CloneWithoutMediaInfo(IMedia source);

        IMedia CloneWithoutUploadInfo();
    }
}
