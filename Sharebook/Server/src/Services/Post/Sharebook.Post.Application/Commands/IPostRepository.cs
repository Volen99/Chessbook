namespace Sharebook.Post.Application.Commands
{
    using System.Threading.Tasks;
    using System.Threading;

    using Sharebook.Post.Domain.AggregatesModel.PostAggregate;
    using Sharebook.Post.Application.Common.Interfaces;

    public interface IPostRepository : IRepository<Post>
    {
        Task<Post> Find(long postId, CancellationToken cancellationToken = default);

        Task<bool> Delete(int id, CancellationToken cancellationToken = default);

        Task<Post> GetPost(long postId, CancellationToken cancellationToken = default);

        Post Add(Post Tweet);     // TODO: Not good?!

        void Update(Post Tweet);
    }
}
