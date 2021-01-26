namespace Sharebook.Data.Repositories
{
    using System.Threading.Tasks;

    using Sharebook.Data.Models;
    using Sharebook.Data.Models.System;

    public interface ISettingsRepository
    {
        Task<Settings> Get(int id, ContextSession session);
        Task<Settings> Edit(Settings setting, ContextSession session);
    }
}
