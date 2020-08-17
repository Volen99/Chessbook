namespace WorldFeed.Common.Models.WorldFeed
{
    public class MediaSizeObject
    {
        public int Id { get; set; }

        public MediaEntitySize Thumb { get; set; }

        public MediaEntitySize Large { get; set; }

        public MediaEntitySize Medium { get; set; }

        public MediaEntitySize Small { get; set; }
    }
}
