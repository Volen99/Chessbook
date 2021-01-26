namespace Sharebook.Data.Repositories
{
    using Sharebook.Data.Models;
    using Sharebook.Data.Models.System;
    using System.Threading.Tasks;

    public interface IUserRepository<TUser> where TUser : User
    {
        Task Delete(int id, ContextSession session);
        Task<TUser> GetByLogin(string login, ContextSession session, bool includeDeleted = false);
        Task<TUser> GetByEmail(string email, ContextSession session, bool includeDeleted = false);
        Task<TUser> Get(int id, ContextSession session, bool includeDeleted = false);
        Task<TUser> Edit(TUser user, ContextSession session);
    }
}
