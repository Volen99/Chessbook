namespace Chessbook.Data.Models.Post.Entities
{
    using global::System.Collections.Generic;

    using Chessbook.Data.Common.Models;
    using Chessbook.Data.Models.Post.Entities.ExtendedEntities;

    /// <summary>
    /// Object storing information related with a Media on Twitter
    /// </summary>
    public class MediaEntity : BaseDeletableModel<int>
    {
        public string Directory { get; set; }

        public long Size { get; set; }

        public string Url { get; set; }

        public string DisplayURL { get; set; }

        public string ExpandedURL { get; set; }

        public string MediaURL { get; set; }

        public string MediaURLHttps { get; set; }

        public string Type { get; set; }

        public int IndicesId { get; set; }
        public Indices Indices { get; set; }

        // public Dictionary<string, MediaEntitySize> Sizes { get; set; }

        //[JsonProperty("video_info")]
        //[JsonConverter(typeof(JsonPropertyConverterRepository))]
        // public VideoInformationEntity VideoDetails { get; set; }

        //public bool Equals(IMediaEntity other)
        //{
        //    if (Id == null || other == null || Id != other.Id)
        //    {
        //        return false;
        //    }

        //    if (Indices == null || other.Indices == null)
        //    {
        //        return Indices == other.Indices;
        //    }

        //    return Indices.ContainsSameObjectsAs(other.Indices, true);
        //}
    }
}
