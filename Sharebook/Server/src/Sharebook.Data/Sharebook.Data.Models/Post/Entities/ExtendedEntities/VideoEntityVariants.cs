namespace Sharebook.Data.Models.Post.Entities.ExtendedEntities
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class VideoEntityVariant
    {
        public int Bitrate { get; set; }

        public string ContentType { get; set; }

        public string URL { get; set; }
    }
}
