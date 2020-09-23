namespace WorldFeed.Post.Application.Commands
{
    using System.Threading.Tasks;
    using System.Threading;

    using WorldFeed.Post.Domain.AggregatesModel.PostAggregate;
    using WorldFeed.Post.Application.Common.Interfaces;

    public interface IPostRepository : IRepository<Post>
    {
        Task<Post> Find(long postId, CancellationToken cancellationToken = default);

        Task<bool> Delete(int id, CancellationToken cancellationToken = default);

        Task<Post> GetPost(long postId, CancellationToken cancellationToken = default);

        Post Add(Post Tweet);     // TODO: Not good?!

        void Update(Post Tweet);
    }
}
