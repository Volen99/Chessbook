namespace Sharebook.Data.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    using Sharebook.Data.Models;
    using Sharebook.Data.Models.System;

    public abstract class BaseDeletableRepository<TType, TContext>
        where TType : DeletableEntity, new()
        where TContext : DataContext
    {
        private readonly TContext _dbContext;

        protected BaseDeletableRepository(TContext context)
        {
            _dbContext = context;
        }

        protected TContext GetContext(ContextSession session)
        {
            _dbContext.Session = session;
            return _dbContext;
        }

        protected IQueryable<TType> GetEntities(ContextSession session, bool includeDeleted = false)
        {
            var query = GetContext(session).Set<TType>().AsQueryable();
            if (!includeDeleted)
            {
                query = query.Where(obj => !obj.IsDeleted);
            }

            return query.AsNoTracking();
        }

        public virtual async Task<IEnumerable<TType>> GetList(ContextSession session, bool includeDeleted = false)
        {
            return await GetEntities(session, includeDeleted).ToListAsync();
        }

        public virtual async Task<TType> Get(int id, ContextSession session, bool includeDeleted = false)
        {
            return await GetEntities(session, includeDeleted).Where(obj => obj.Id == id).FirstOrDefaultAsync();
        }

        public virtual async Task<bool> Exists(TType obj, ContextSession session, bool includeDeleted = false)
        {
            return await GetEntities(session, includeDeleted).Where(x => x.Id == obj.Id).CountAsync() > 0;
        }

        public virtual async Task<TType> Edit(TType obj, ContextSession session)
        {
            var objectExists = await Exists(obj, session);
            _dbContext.Entry(obj).State = objectExists ? EntityState.Modified : EntityState.Added;
            await _dbContext.SaveChangesAsync();
            return obj;
        }

        public virtual async Task Delete(int id, ContextSession session)
        {
            var itemToDelete = new TType {Id = id, IsDeleted = true};
            _dbContext.Entry(itemToDelete).Property(obj => obj.IsDeleted).IsModified = true;
            await _dbContext.SaveChangesAsync();
        }
    }
}
