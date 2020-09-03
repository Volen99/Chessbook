namespace WorldFeed.Upload.Domain.FeedAggregate
{
    using System.Threading.Tasks;

    using WorldFeed.Upload.Domain.Models;
    using WorldFeed.Upload.Domain.Common;

    // This is just the RepositoryContracts or Interface defined at the Domain Layer as requisite for the Feed Aggregate.
    // For each aggregate or aggregate root, you should create one repository class
    public interface IFeedRepository : IRepository<Feed>
    {
        Task<Feed> GetAsync(int feedId);

        Feed Add(Feed feed);

        void Update(Feed feed);

    }
}
