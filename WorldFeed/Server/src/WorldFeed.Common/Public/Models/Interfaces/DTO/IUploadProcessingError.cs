namespace WorldFeed.Common.Public.Models.Interfaces.DTO
{
    public interface IUploadProcessingError
    {
        int Code { get; set; }

        string Name { get; set; }

        string Message { get; set; }
    }
}
