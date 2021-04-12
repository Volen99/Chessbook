using Chessbook.Data.Models.Post.Entities;
using Chessbook.Services.Mapping;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Web.Models.Outputs.Posts
{
    public class MediaEntitySizeDTO : IMapFrom<MediaEntitySize>
    {
        [JsonProperty("w")]
        public int? Width { get; set; }

        [JsonProperty("h")]
        public int? Height { get; set; }

        [JsonProperty("resize")]
        public string Resize { get; set; }

        [JsonIgnore]
        public string Variant { get; set; }
    }
}
