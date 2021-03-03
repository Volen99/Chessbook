namespace Sharebook.Web.Models.Outputs.Posts
{
    using Sharebook.Data.Models.Post;
    using Sharebook.Data.Models.Post.Enums;
    using Sharebook.Services.Mapping;

    public class PostRateDTO : IMapFrom<PostVote>
    {
        public PostRateType Type { get; set; }
    }
}
