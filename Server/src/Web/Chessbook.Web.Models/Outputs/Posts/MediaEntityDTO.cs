using Chessbook.Data.Models.Post.Entities;
using Chessbook.Data.Models.Post.Entities.ExtendedEntities;
using Chessbook.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Web.Models.Outputs.Posts
{
    public class MediaEntityDTO : IMapFrom<MediaEntity>
    {
        public MediaEntityDTO()
        {
            this.Sizes = new Dictionary<string, MediaEntitySizeDTO>();
        }

        public int Id { get; set; }

        public string IdStr { get; set; }

        public string Url { get; set; } // Wrapped URL for the media link. This corresponds with the URL embedded directly into the raw Tweet text,
                                        // and the values for the indices parameter.  Example: "url":"http://t.co/rJC5Pxsu"

        public string DisplayURL { get; set; }

        public string ExpandedURL { get; set; }

        public string MediaURL { get; set; }

        public string MediaURLHttps { get; set; }

        public string Type { get; set; }       // Type of uploaded media. Possible types include photo, video, and animated_gif.

        public Indices Indices { get; set; }

        public Dictionary<string, MediaEntitySizeDTO> Sizes { get; set; }

        public int? SourceStatusId { get; set; }

        public string SourceStatusIdStr { get; set; }

        //[JsonProperty("video_info")]
        //[JsonConverter(typeof(JsonPropertyConverterRepository))]
        public VideoInformationEntity VideoDetails { get; set; }

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
