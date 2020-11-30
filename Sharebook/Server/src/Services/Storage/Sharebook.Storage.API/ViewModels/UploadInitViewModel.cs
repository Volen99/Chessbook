namespace Sharebook.Storage.API.ViewModels
{
    using Sharebook.Storage.API.Data;

    // ReSharper disable once ClassNeverInstantiated.Local
    public class UploadInitViewModel : MediaUploadViewModel
    {
        public UploadInitViewModel()
        {
        }

        public static UploadInitViewModel FromSession(Session session)
        {
            return new UploadInitViewModel
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
