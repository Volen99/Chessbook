namespace Chessbook.Web.Models.Outputs.Posts
{
    using Chessbook.Data.Models.Post;
    using Chessbook.Data.Models.Post.Enums;
    using Chessbook.Services.Mapping;

    public class PostRateDTO : IMapFrom<PostVote>
    {
        public PostRateType Type { get; set; }
    }
}
