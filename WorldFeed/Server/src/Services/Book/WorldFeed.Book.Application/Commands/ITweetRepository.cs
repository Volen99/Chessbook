namespace WorldFeed.Post.Application.Commands
{
    using System.Threading.Tasks;

    using WorldFeed.Upload.Application.Common.Interfaces;

    public interface ITweetRepository : IRepository<Tweet>
    {
        Task<Tweet> GetAsync(int feedId);

        Tweet Add(Tweet Tweet);     // TODO: Not good?!

        void Update(Tweet Tweet);
    }
}
