namespace WorldFeed.Common.Public.Models.Interfaces.DTO
{
    using WorldFeed.Common.Public.Models.Enums;

    public interface IUploadProcessingInfo
    {
        string State { get; set; }

        ProcessingState ProcessingState { get; set; }

        int CheckAfterInSeconds { get; set; }

        int CheckAfterInMilliseconds { get; }

        int ProgressPercentage { get; set; }

        IUploadProcessingError Error { get; set; }
    }
}
