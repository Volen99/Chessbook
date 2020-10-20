namespace Sharebook.Science.API.Models.Media
{
    public class MediaUploadQuery
    {
        public string Command { get; set; }

        public long TotalBytes { get; set; }

        public string MediaType { get; set; }

        public string MediaCategory { get; set; }

        public int MediaId { get; set; }

        public int SegmentIndex { get; set; }
    }
}
