namespace Sharebook.Data.Repositories
{
    using System.Threading.Tasks;
    using System.Collections.Generic;

    using Sharebook.Data.Common.Filters;
    using Sharebook.Data.Models;
    using Sharebook.Data.Models.System;

    public interface IUserRepository<TUser> where TUser : User
    {
        Task Delete(int id, ContextSession session);
        Task<(IEnumerable<TUser>, int)> GetFilteredListWithTotalCount(UsersGridFilter filter, ContextSession session, bool includeDeleted = false);
        Task<TUser> GetByLogin(string login, ContextSession session, bool includeDeleted = false);
        Task<TUser> GetByEmail(string email, ContextSession session, bool includeDeleted = false);
        Task<TUser> Get(int id, ContextSession session, bool includeDeleted = false);
        Task<TUser> Edit(TUser user, ContextSession session);
    }
}
