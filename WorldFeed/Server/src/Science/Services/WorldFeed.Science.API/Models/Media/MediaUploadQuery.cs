namespace WorldFeed.Science.API.Models.Media
{
    using System;

    public class MediaUploadQuery
    {
        public string Command { get; set; }

        public long total_bytes { get; set; }

        public string media_type { get; set; }

        public string media_category { get; set; }

        public int media_id { get; set; }

        public int segment_index { get; set; }
    }
}
