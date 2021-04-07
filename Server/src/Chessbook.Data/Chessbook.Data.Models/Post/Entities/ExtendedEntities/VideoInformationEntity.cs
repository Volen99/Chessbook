namespace Chessbook.Data.Models.Post.Entities.ExtendedEntities
{
    using global::System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class VideoInformationEntity
    {
        // public int[] AspectRatio { get; set; }
        public string AspectRatio { get; set; }

        // [JsonProperty("duration_millis")]
        public int DurationInMilliseconds { get; set; }

        public ICollection<VideoEntityVariant> Variants { get; set; }
    }
}
