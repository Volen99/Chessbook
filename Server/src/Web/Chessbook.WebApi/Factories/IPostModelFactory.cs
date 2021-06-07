using Chessbook.Data.Models.Post;
using Chessbook.Web.Api.Areas.Admin.Models.Post;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Factories
{
    public interface IPostModelFactory
    {
        Task<PostModel> PreparePostModelAsync(Post post, bool isAssociatedProduct = false);
    }
}
