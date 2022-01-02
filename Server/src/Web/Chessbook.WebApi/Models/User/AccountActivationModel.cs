using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.User
{
    public partial record AccountActivationModel : BaseNopModel
    {
        public string Result { get; set; }

        public string ReturnUrl { get; set; }
    }
}
