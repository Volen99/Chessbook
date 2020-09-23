namespace WorldFeed.Identity.Infrastructure.Persistence.Repositories
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    using WorldFeed.Identity.Domain.Common;
    using WorldFeed.Identity.Infrastructure.Data.Dbs;

    internal abstract class DataRepository<TEntity> : WorldFeed.Upload.Domain.Common.IRepository<TEntity>
        where TEntity : class, IAggregateRoot
    {
        protected ScienceUploadDbContext Data { get; }

        public IUnitOfWork UnitOfWork => throw new System.NotImplementedException();

        protected DataRepository(ScienceUploadDbContext db)
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
