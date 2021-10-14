namespace Chessbook.Web.Models.Outputs.Chunked
{
    public class UploadFinalizeOutputModel : MediaUploadOutputModel
    {
        public UploadFinalizeOutputModel()
        {
        }

        public string MediaKey { get; set; }      // https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/media

        public UploadedImageDetailsOutputModel Image { get; set; }

        public long Size { get; set; }

        public string ImageUrl { get; set; }
    }
}
