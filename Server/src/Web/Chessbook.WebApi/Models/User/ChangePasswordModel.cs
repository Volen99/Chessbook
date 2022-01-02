using System.ComponentModel.DataAnnotations;
using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.User
{
    public partial record ChangePasswordModel : BaseNopModel
    {
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}
