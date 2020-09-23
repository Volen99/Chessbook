namespace WorldFeed.Post.Infrastructure.Persistence.Repositories
{
    using System.Threading;
    using System.Threading.Tasks;

    using WorldFeed.Post.Application.Commands;
    using WorldFeed.Post.Domain.AggregatesModel.PostAggregate;
    using WorldFeed.Post.Infrastructure.Data.Dbs;

    internal class KidsPostRepository : DataRepository<KidsDbContext, Post>, IPostRepository
    {
        public KidsPostRepository(KidsDbContext db)
            : base(db)
        {
        }

        public Post Add(Post Tweet)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(int id, CancellationToken cancellationToken = default)
        {
            throw new System.NotImplementedException();
        }

        public Task<Post> Find(long postId, CancellationToken cancellationToken = default)
        {
            throw new System.NotImplementedException();
        }

        public Task<Post> GetPost(long postId, CancellationToken cancellationToken = default)
        {
            throw new System.NotImplementedException();
        }

        public void Update(Post Tweet)
        {
            throw new System.NotImplementedException();
        }
    }
}
