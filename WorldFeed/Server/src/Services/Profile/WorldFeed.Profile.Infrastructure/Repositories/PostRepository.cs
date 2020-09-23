namespace WorldFeed.Post.Infrastructure.Repositories
{
    using System.Threading.Tasks;

    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate;

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
