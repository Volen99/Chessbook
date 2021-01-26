namespace Sharebook.Data.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Sharebook.Data.Models;
    using Sharebook.Data.Models.System;

    public class UserClaimRepository: IUserClaimRepository<UserClaim>
    {
        private readonly DataContext _dbContext;

        public UserClaimRepository(DataContext context)
        {
            _dbContext = context;
        }

        protected DataContext GetContext(ContextSession session)
        {
            _dbContext.Session = session;
            return _dbContext;
        }

        public async Task<UserClaim> Add(UserClaim userClaim, ContextSession session)
        {
            var context = GetContext(session);
            context.Entry(userClaim).State = EntityState.Added;
            await context.SaveChangesAsync();
            return userClaim;
        }

        public async Task<IList<UserClaim>> EditMany(IList<UserClaim> userClaims, ContextSession session)
        {
            var context = GetContext(session);

            foreach (var uc in userClaims)
            {
                context.Entry(uc).State = EntityState.Modified;
            }

            await context.SaveChangesAsync();

            return userClaims;
        }

        public async Task Delete(int userId, string claimType, string claimValue, ContextSession session)
        {
            var context = GetContext(session);
            var itemsToDelete = await context.Set<UserClaim>()
                .Where(cl => cl.UserId == userId && cl.ClaimType == claimType && cl.ClaimValue == claimValue)
                .ToListAsync();
            context.Set<UserClaim>().RemoveRange(itemsToDelete);
            await context.SaveChangesAsync();
        }

        public async Task<IList<UserClaim>> GetByUserId(int userId, ContextSession session)
        {
            var context = GetContext(session);
            var list = await context.Set<UserClaim>()
                .AsNoTracking()
                .Where(obj => obj.UserId == userId)
                .ToListAsync();

            return list.ToList();
        }

        public async Task<IList<UserClaim>> GetList(int userId, string claimType, string claimValue,
            ContextSession session)
        {
            var context = GetContext(session);
            return await context.Set<UserClaim>()
                .AsNoTracking()
                .Where(obj => obj.UserId == userId && obj.ClaimType == claimType && obj.ClaimValue == claimValue)
                .ToListAsync();
        }
    }
}
