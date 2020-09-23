namespace WorldFeed.Post.Infrastructure.Persistence.Repositories
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    using WorldFeed.Post.Domain.Common;
    using WorldFeed.Post.Infrastructure.Data.Dbs;

    internal abstract class DataRepository<TEntity> : IRepository<TEntity>
        where TEntity : class, IAggregateRoot
    {
        protected ScienceDbContext Data { get; }

        public IUnitOfWork UnitOfWork => throw new System.NotImplementedException();

        protected DataRepository(ScienceDbContext db)
        {
            this.Data = db;
        }

        protected IQueryable<TEntity> All() => this.Data.Set<TEntity>();

        public async Task Save(TEntity entity, CancellationToken cancellationToken = default)
        {
            this.Data.Update(entity);

            await this.Data.SaveChangesAsync(cancellationToken);
        }
    }
}
