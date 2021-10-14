using System.Threading.Tasks;
using Chessbook.Core.Domain.Posts;

namespace Chessbook.Services.Entities
{
    public interface IRepostService
    {
        Task<Post> Create(int userId, Post originalPost);

        Task Destroy(Post repostedPost, Post originalPost);
    }
}
