using Nop.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.Posts
{
    public partial record PostTagModel : BaseNopEntityModel
    {
        public string Name { get; set; }

        public int PostCount { get; set; }
    }
}
