namespace WorldFeed.Science.Upload.Domain.Models
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class MediaSize
    {
        public int? Width { get; set; }

        public int? Height { get; set; }

        public string Resize { get; set; }
    }
}
