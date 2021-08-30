using Chessbook.Web.Api.Areas.Admin.Models.Users;
using Nop.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.Relationships
{
    public record FollowInfoModel : BaseNopEntityModel
    {
        public UserInfoModel Follower { get; set; }
    }
}   
