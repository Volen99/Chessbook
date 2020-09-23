namespace WorldFeed.Upload.Models.DTO
{
    public interface IMediaMetadata
    {
        long? MediaId { get; set; }

        string AltText { get; set; }
    }
}