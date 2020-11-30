namespace Sharebook.Storage.API.ViewModels
{
    using Sharebook.Storage.API.Data;

    public class UploadFinalizeViewModel : MediaUploadViewModel
    {
        public UploadFinalizeViewModel()
        {
        }

        public static UploadFinalizeViewModel FromSession(Session session)
        {
            return new UploadFinalizeViewModel
            {
                MediaId = session.MediaId,
                MediaIdString = session.MediaId.ToString(),
                MediaKey = "13_" + session.MediaId,
                Size = session.FileInfo.Size,
                ExpiresAfterInSeconds = session.Timeout,
                Image = new UploadedImageDetailsViewModel
                {
                    ImageType = session.FileInfo.MediaType,
                    Width = (int?)session.FileInfo.Size,
                    Height = (int?)session.FileInfo.Size,
                },
            };
        }

        public string MediaKey { get; set; }      // https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/media

        public UploadedImageDetailsViewModel Image { get; set; }

        public long Size { get; set; }
    }
}
