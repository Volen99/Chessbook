﻿namespace WorldFeed.Post.Infrastructure.Persistence.Repositories
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.Post.Application.Common.Interfaces;
    using WorldFeed.Post.Domain.Common;

    internal abstract class DataRepository<TDbContext, TEntity> : IRepository<TEntity>
        where TDbContext : DbContext
        where TEntity : class, IAggregateRoot
    {
        protected DataRepository(TDbContext db) => this.Data = db;

        protected TDbContext Data { get; }

        protected IQueryable<TEntity> All() => this.Data.Set<TEntity>();

        public async Task Save(TEntity entity, CancellationToken cancellationToken = default)
        {
            this.Data.Update(entity);

            await this.Data.SaveChangesAsync(cancellationToken);
        }
    }
}