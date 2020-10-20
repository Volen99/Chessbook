namespace Sharebook.Post.Infrastructure.Repositories
{
    using System.Threading.Tasks;

    using Sharebook.Upload.Domain.AggregatesModel.PostAggregate;

    public class PostRepository : DataRepository<Tweet>, IPostRepository
    {
        public Post Add(Post feed)
        {
            throw new System.NotImplementedException();
        }

        public Task<Post> GetAsync(int feedId)
        {
            throw new System.NotImplementedException();
        }

        public void Update(Post feed)
        {
            throw new System.NotImplementedException();
        }
    }
}
