namespace WorldFeed.Upload.Application.Commands
{
    using System.Threading.Tasks;

    using WorldFeed.Upload.Application.Common.Interfaces;
    using WorldFeed.Upload.Domain.AggregatesModel.TweetAggregate;

    public interface ITweetRepository : IRepository<Tweet>
    {
        Task<Tweet> GetAsync(int feedId);

        Tweet Add(Tweet Tweet);     // TODO: Not good?!

        void Update(Tweet Tweet);
    }
}
