namespace WorldFeed.Science.Upload.Infrastructure.Persistence.Repositories
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    using WorldFeed.Science.Upload.Domain.Common;

    internal abstract class DataRepository<TEntity> : IRepository<TEntity>
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
