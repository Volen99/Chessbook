using Microsoft.EntityFrameworkCore;

namespace Chessbook.Data.Models.Post.Entities.ExtendedEntities
{

    [Owned]
    public class VideoEntityVariant
    {
        public int Bitrate { get; set; }

        public string ContentType { get; set; }

        public string URL { get; set; }
    }
}
