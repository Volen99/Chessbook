using System.Collections.Generic;

using Chessbook.Web.Api.Areas.Admin.Models.Post;
using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Models.Media
{
    public partial record PictureModel : BaseNopModel
    {
        public string ImageUrl { get; set; }

        public string ThumbImageUrl { get; set; }

        public string FullSizeImageUrl { get; set; }

        public string Title { get; set; }

        public string AlternateText { get; set; }

        public string Blurhash { get; set; }            // omg I love its name so much 🤪

        public Dictionary<string, MediaEntitySizeModel> Meta { get; set; }
    }
}
