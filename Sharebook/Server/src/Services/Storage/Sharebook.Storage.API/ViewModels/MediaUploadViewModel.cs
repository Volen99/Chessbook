namespace Sharebook.Storage.API.ViewModels
{
    public class MediaUploadViewModel
    {
        public long MediaId { get; set; }

        public string MediaIdString { get; set; }

        public long ExpiresAfterInSeconds { get; set; }
    }
}
