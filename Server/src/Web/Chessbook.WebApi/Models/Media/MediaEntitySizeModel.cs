using Newtonsoft.Json;
using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Areas.Admin.Models.Post
{
    public record MediaEntitySizeModel : BaseNopModel
    {
        public int? Width { get; set; }

        public int? Height { get; set; }

        public string Size { get; set; }

        public double Aspect { get; set; }

        public string Resize { get; set; }

        [JsonIgnore]
        public string Variant { get; set; }
    }
}
