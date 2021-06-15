using System;

using Chessbook.Web.Api.Models.Posts;
using Chessbook.Web.Api.Models.Relationships;
using Nop.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.UserNotification
{
    public partial record UserNotificationModel : BaseNopEntityModel
    {
        public int Type { get; set; }

        public bool Read { get; set; }

        public PostInfoModel Post { get; set; }

        public FollowInfoModel ActorFollow { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
