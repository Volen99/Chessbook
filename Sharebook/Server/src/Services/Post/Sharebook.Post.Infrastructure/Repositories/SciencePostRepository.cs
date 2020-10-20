namespace Sharebook.Post.Infrastructure.Repositories
{
    using System.Threading;
    using System.Threading.Tasks;

    using Sharebook.Post.Application.Commands;
    using Sharebook.Post.Domain.AggregatesModel.PostAggregate;
    using Sharebook.Post.Infrastructure.Data.Dbs;

    internal class SciencePostRepository : DataRepository<ScienceDbContext, Post>, IPostRepository
    {
        public SciencePostRepository(ScienceDbContext db)
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
