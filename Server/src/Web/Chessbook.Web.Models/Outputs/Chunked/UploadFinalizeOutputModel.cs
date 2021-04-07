namespace Chessbook.Web.Models.Outputs.Chunked
{
    using Chessbook.Data.Models.Memory;

    public class UploadFinalizeOutputModel : MediaUploadOutputModel
    {
        public UploadFinalizeOutputModel()
        {
        }

        public static UploadFinalizeOutputModel FromSession(Session session)
        {
            return new UploadFinalizeOutputModel
            {
                MediaId = session.MediaId,
                MediaIdString = session.MediaId.ToString(),
                MediaKey = "13_" + session.MediaId,
                Size = session.FileInfo.Size,
                ExpiresAfterInSeconds = session.Timeout,
                Image = new UploadedImageDetailsOutputModel
                {
                    ImageType = session.FileInfo.MediaType,
                    Width = (int?)session.FileInfo.Size,
                    Height = (int?)session.FileInfo.Size,
                },
            };
        }

        public string MediaKey { get; set; }      // https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/media

        public UploadedImageDetailsOutputModel Image { get; set; }

        public long Size { get; set; }
    }
}
