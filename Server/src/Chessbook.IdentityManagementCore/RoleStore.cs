
using Microsoft.AspNetCore.Identity;
using Chessbook.Data.Models;
using Chessbook.Data.Models.System;
using Chessbook.Data.Repositories;
using System.Threading;
using System.Threading.Tasks;
using Chessbook.Services.Data.Services;
using Chessbook.Data;

namespace Chessbook.IdentityManagementCore
{
    public class RoleStore<TRole> : IRoleStore<TRole> where TRole : Role, new()
    {
        protected ContextSession session;
        protected readonly IRepository<TRole> repository;

        public RoleStore(ICurrentContextProvider contextProvider, IRepository<TRole> repository)
        {
            session = contextProvider.GetCurrentContext();

            this.repository = repository;
        }

        public void Dispose()
        {
            // Nothing to dispose.
        }

        public async Task<IdentityResult> CreateAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            await repository.UpdateAsync(role);

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> UpdateAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            await repository.UpdateAsync(role);

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> DeleteAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();

            // await repository.DeleteAsync(role.Id);

            return IdentityResult.Success;
        }

        public Task<string> GetRoleIdAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.FromResult(role.Id.ToString());
        }

        public Task<string> GetRoleNameAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.FromResult(role.Name);
        }

        public Task SetRoleNameAsync(TRole role, string roleName, CancellationToken cancellationToken = default(CancellationToken))
        {
            role.Name = roleName;
            return Task.CompletedTask;
        }

        public Task<string> GetNormalizedRoleNameAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.FromResult(role.Name);
        }

        public Task SetNormalizedRoleNameAsync(TRole role, string normalizedName, CancellationToken cancellationToken = default(CancellationToken))
        {
            role.Name = normalizedName;
            return Task.CompletedTask;
        }

        public async Task<TRole> FindByIdAsync(string roleId, CancellationToken cancellationToken = default(CancellationToken))
        {
            //  return await repository.Get(roleId, session);

            return default(TRole);
        }

        public async Task<TRole> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken = default(CancellationToken))
        {
            // return await repository.Get(normalizedRoleName, session);

            return default(TRole);
        }
    }

    //public class RoleStore<TRole> : IRoleStore<TRole> where TRole : Role, new()
    //{
    //    protected ContextSession session;
    //    protected readonly IRoleRepository<TRole> repository;

    //    public RoleStore(ICurrentContextProvider contextProvider, IRoleRepository<TRole> repository)
    //    {
    //        session = contextProvider.GetCurrentContext();

    //        this.repository = repository;
    //    }

    //    public void Dispose()
    //    {
    //        // Nothing to dispose.
    //    }

    //    public async Task<IdentityResult> CreateAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
    //    {
    //        cancellationToken.ThrowIfCancellationRequested();
    //        await repository.Edit(role, session);

    //        return IdentityResult.Success;
    //    }

    //    public async Task<IdentityResult> UpdateAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
    //    {
    //        cancellationToken.ThrowIfCancellationRequested();
    //        await repository.Edit(role, session);

    //        return IdentityResult.Success;
    //    }

    //    public async Task<IdentityResult> DeleteAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
    //    {
    //        cancellationToken.ThrowIfCancellationRequested();

    //        await repository.Delete(role.Id, session);

    //        return IdentityResult.Success;
    //    }

    //    public Task<string> GetRoleIdAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
    //    {
    //        return Task.FromResult(role.Id.ToString());
    //    }

    //    public Task<string> GetRoleNameAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
    //    {
    //        return Task.FromResult(role.Name);
    //    }

    //    public Task SetRoleNameAsync(TRole role, string roleName, CancellationToken cancellationToken = default(CancellationToken))
    //    {
    //        role.Name = roleName;
    //        return Task.CompletedTask;
    //    }

    //    public Task<string> GetNormalizedRoleNameAsync(TRole role, CancellationToken cancellationToken = default(CancellationToken))
    //    {
    //        return Task.FromResult(role.Name);
    //    }

    //    public Task SetNormalizedRoleNameAsync(TRole role, string normalizedName, CancellationToken cancellationToken = default(CancellationToken))
    //    {
    //        role.Name = normalizedName;
    //        return Task.CompletedTask;
    //    }

    //    public async Task<TRole> FindByIdAsync(string roleId, CancellationToken cancellationToken = default(CancellationToken))
    //    {
    //        return await repository.Get(roleId, session);
    //    }

    //    public async Task<TRole> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken = default(CancellationToken))
    //    {
    //        return await repository.Get(normalizedRoleName, session);
    //    }
    //}
}
