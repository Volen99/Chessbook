namespace WorldFeed.History.BC.Science.Repositories
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.History.BC.Science.Data;
    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.Common.Data;

    public class EfRepository<TEntity> : IRepository<TEntity>
        where TEntity : class
    {
        public EfRepository(ScienceDbContext context)
        {
            this.Context = context ?? throw new ArgumentNullException(nameof(context));
            this.DbSet = this.Context.Set<TEntity>();
        }

        protected DbSet<TEntity> DbSet { get; set; }

        protected ScienceDbContext Context { get; set; }

        public virtual IQueryable<TEntity> All() => this.DbSet;

        public virtual IQueryable<TEntity> AllAsNoTracking() => this.DbSet.AsNoTracking();

        public virtual Task AddAsync(TEntity entity) => this.DbSet.AddAsync(entity).AsTask();

        public virtual void Update(TEntity entity)
        {
            var entry = this.Context.Entry(entity);
            if (entry.State == EntityState.Detached)
            {
                this.DbSet.Attach(entity);
            }

            entry.State = EntityState.Modified;
        }

        public virtual void Delete(TEntity entity) => this.DbSet.Remove(entity);


        public Task<int> SaveChangesAsync(params Message[] messages)
        {
            foreach (var message in messages)
            {
                this.Context.AddAsync(message);
            }

            // this.Data.Update(entity); Kenov

            return this.Context.SaveChangesAsync();
        }

        public async Task MarkMessageAsPublished(int id)
        {
            var message = await this.Context.FindAsync<Message>(id);

            message.MarkAsPublished();

            await this.Context.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.Context?.Dispose();
            }
        }
    }
}
