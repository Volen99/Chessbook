namespace Sharebook.Data.Repositories
{
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using Sharebook.Data.Common.Repositories;
    using Sharebook.Data.Models;
    using Sharebook.Data.Models.System;

    public class RoleRepository: BaseRepository<Role, DataContext>, IRoleRepository<Role>
    {
        public RoleRepository(DataContext context) : base(context)
        {
        }

        public async Task<Role> Get(string name, ContextSession session)
        {
            return await GetEntities(session)
                .Where(obj => obj.Name == name)
                .FirstOrDefaultAsync();
        }
    }
}
