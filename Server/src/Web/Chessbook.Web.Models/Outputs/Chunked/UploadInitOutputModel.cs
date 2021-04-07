namespace Chessbook.Web.Models.Outputs.Chunked
{
    using Chessbook.Data.Models.Memory;

    // ReSharper disable once ClassNeverInstantiated.Local
    public class UploadInitOutputModel : MediaUploadOutputModel
    {
        public UploadInitOutputModel()
        {
        }

        public static UploadInitOutputModel FromSession(Session session)
        {
            return new UploadInitOutputModel
            {
                MediaId = session.MediaId,
                MediaIdString = session.MediaId.ToString(),
                ExpiresAfterInSeconds = session.Timeout,
                MediaKey = "13_" + session.MediaId,
            };
        }

        public string MediaKey { get; set; }      // https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/media

    }
}
