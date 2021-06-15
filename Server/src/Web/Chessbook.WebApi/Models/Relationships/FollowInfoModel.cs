using Nop.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.Relationships
{
    public record FollowInfoModel : BaseNopEntityModel
    {
        public Follower Follower { get; set; }
    }

    public record Follower
    {
        public int Id { get; set; }

        public string DisplayName { get; set; }

        public string ScreenName { get; set; }

        public string  AvatarUrl { get; set; }
    }
}   
