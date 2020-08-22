namespace WorldFeed.Science.Upload.Infrastructure.Persistence.Repositories
{
    using System.Threading.Tasks;

    using WorldFeed.Science.Upload.Domain.FeedAggregate;
    using WorldFeed.Science.Upload.Domain.Models;

    // It's okay to query the database through other channels(as you can do following a CQRS approach), because queries don't
    // change the state of the database. However, the transactional area(that is, the updates) must always be controlled by the
    // repositories and the aggregate roots.
    internal class FeedRepository : DataRepository<Feed>, IFeedRepository
    {
        public FeedRepository(ScienceUploadDbContext db)
            : base(db)
        {
        }

        public Feed Add(Feed feed)
        {
            throw new System.NotImplementedException();
        }

        public Task<Feed> GetAsync(int feedId)
        {
            throw new System.NotImplementedException();
        }

        public void Update(Feed feed)
        {
            throw new System.NotImplementedException();
        }
    }
}
