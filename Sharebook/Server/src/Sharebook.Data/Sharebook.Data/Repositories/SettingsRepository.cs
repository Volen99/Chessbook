namespace Sharebook.Data.Repositories
{
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    using Sharebook.Data.Common.Repositories;
    using Sharebook.Data.Models;
    using Sharebook.Data.Models.System;

    public class SettingsRepository : BaseRepository<Settings, DataContext>, ISettingsRepository
    {
        public SettingsRepository(DataContext context) : base(context) { }

        public override async Task<bool> Exists(Settings obj, ContextSession session)
        {
            var context = GetContext(session);
            return await context.Settings.Where(x => x.Id == obj.Id).AsNoTracking().CountAsync() > 0;
        }

        public override async Task<Settings> Get(int id, ContextSession session)
        {
            var context = GetContext(session);
            return await context.Settings.Where(obj => obj.Id == id).AsNoTracking().FirstOrDefaultAsync();
        }
    }
}
