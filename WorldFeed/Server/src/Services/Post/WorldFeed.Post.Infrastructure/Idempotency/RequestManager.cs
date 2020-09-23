namespace WorldFeed.Post.Infrastructure.Idempotency
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Post.Domain.Exceptions;
    using WorldFeed.Post.Infrastructure.Data.Dbs;

    public class RequestManager : IRequestManager
    {
        private readonly ScienceDbContext context;

        public RequestManager(ScienceDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<bool> ExistAsync(Guid id)
        {
            var request = await this.context.
                FindAsync<ClientRequest>(id);

            return request != null;
        }

        public async Task CreateRequestForCommandAsync<T>(Guid id)
        {
            var exists = await ExistAsync(id);

            var request = exists ? throw new PostDomainException($"Request with {id} already exists") :
                new ClientRequest()
                {
                    Id = id,
                    Name = typeof(T).Name,
                    Time = DateTime.UtcNow
                };

            this.context.Add(request);

            await this.context.SaveChangesAsync();
        }
    }
}
