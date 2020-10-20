namespace Sharebook.Upload.Application.Commands
{
    using System.Threading.Tasks;

    using Sharebook.Upload.Application.Common.Interfaces;
    using Sharebook.Upload.Domain.AggregatesModel.TweetAggregate;

    public interface ITweetRepository : IRepository<Tweet>
    {
        Task<Tweet> GetAsync(int feedId);

        Tweet Add(Tweet Tweet);     // TODO: Not good?!

        void Update(Tweet Tweet);
    }
}
