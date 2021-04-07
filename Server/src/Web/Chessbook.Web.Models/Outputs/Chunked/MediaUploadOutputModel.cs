namespace Chessbook.Web.Models.Outputs.Chunked
{
    public class MediaUploadOutputModel
    {
        public long MediaId { get; set; }

        public string MediaIdString { get; set; }

        public long ExpiresAfterInSeconds { get; set; }
    }
}
