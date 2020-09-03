namespace WorldFeed.Upload.Domain.Models
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class MediaObject
    {
        public MediaSize Thumb { get; set; }

        public MediaSize Large { get; set; }

        public MediaSize Medium { get; set; }

        public MediaSize Small { get; set; }
    }
}
