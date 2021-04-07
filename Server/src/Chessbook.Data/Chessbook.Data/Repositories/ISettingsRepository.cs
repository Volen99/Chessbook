namespace Chessbook.Data.Repositories
{
    using System.Threading.Tasks;

    using Chessbook.Data.Models;
    using Chessbook.Data.Models.System;

    public interface ISettingsRepository
    {
        Task<Settings> Get(int id, ContextSession session);
        Task<Settings> Edit(Settings setting, ContextSession session);
    }
}
