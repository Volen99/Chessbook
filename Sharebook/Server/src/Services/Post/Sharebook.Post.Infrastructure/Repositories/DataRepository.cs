namespace Sharebook.Post.Infrastructure.Repositories
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    using Sharebook.Post.Application.Common.Interfaces;
    using Sharebook.Post.Domain.Common;

    internal abstract class DataRepository<TDbContext, TEntity> : IRepository<TEntity>
        where TEntity : class, IAggregateRoot
        where TDbContext: DbContext
    {
        protected DataRepository(TDbContext db) => this.Data = db;

        protected DbContext Data { get; }

        protected IQueryable<TEntity> All() => this.Data.Set<TEntity>();

        public async Task Save(TEntity entity, CancellationToken cancellationToken = default)
        {
            this.Data.Update(entity);

            await this.Data.SaveChangesAsync(cancellationToken);
        }
    }
}
