namespace Sharebook.Post.Application.Commands
{
    using System.Threading.Tasks;

    using Sharebook.Upload.Application.Common.Interfaces;

    public interface ITweetRepository : IRepository<Tweet>
    {
        Task<Tweet> GetAsync(int feedId);

        Tweet Add(Tweet Tweet);     // TODO: Not good?!

        void Update(Tweet Tweet);
    }
}
