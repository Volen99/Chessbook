namespace WorldFeed.Upload.Infrastructure.Persistence.Repositories
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    using WorldFeed.Upload.Application.Commands;
    using WorldFeed.Upload.Domain.AggregatesModel.TweetAggregate;

    internal class TweetRepository : ITweetRepository
    {
        public Tweet Add(Tweet Tweet)
        {
            throw new NotImplementedException();
        }

        public Task<Tweet> GetAsync(int feedId)
        {
            throw new NotImplementedException();
        }

        public Task Save(Tweet entity, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public void Update(Tweet Tweet)
        {
            throw new NotImplementedException();
        }
    }
}
