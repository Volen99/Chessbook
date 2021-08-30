namespace Chessbook.Web.Api.Areas.Admin.Models.Post
{
    using Chessbook.Core.Domain.Posts;
    using Chessbook.Data.Models.Post.Enums;
    using Chessbook.Services.Mapping;

    public class PostRateDTO : IMapFrom<PostVote>
    {
        public PostRateType Type { get; set; }
    }
}
