using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Post;
using Chessbook.Data.Models.Post;
using Chessbook.Web.Api.Areas.Admin.Models.Post;
using Chessbook.Web.Api.Models.Posts;

namespace Chessbook.Web.Api.Factories
{
    public interface IPostModelFactory
    {
        Task<PostModel> PreparePostModelAsync(Post post, bool isAssociatedProduct = false);

        Task<PostCommentModel> PreparePostCommentModelAsync(PostComment postComment);

        Task<PostCommentThreadModel> PreparePostCommentTree(IList<PostComment> comments);
    }
}
