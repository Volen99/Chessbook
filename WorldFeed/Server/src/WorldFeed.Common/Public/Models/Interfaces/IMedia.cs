namespace WorldFeed.Common.Public.Models.Interfaces
{
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

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
