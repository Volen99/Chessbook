namespace Sharebook.Data.Repositories
{
    using System.Threading.Tasks;

    using Sharebook.Data.Models;
    using Sharebook.Data.Models.System;

    public interface IRoleRepository<TRole> where TRole : Role
    {
        Task Delete(int id, ContextSession session);
        Task<TRole> Get(int id, ContextSession session);
        Task<TRole> Get(string name, ContextSession session);
        Task<TRole> Edit(TRole role, ContextSession session);
    }
}
