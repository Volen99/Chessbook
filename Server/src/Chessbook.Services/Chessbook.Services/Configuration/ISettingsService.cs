namespace Chessbook.Services.Configuration
{
    using System.Threading.Tasks;
    using Chessbook.Data.Models;

    public interface ISettingsService
    {
        Task CreateAsync(Settings setting);

        Task<Settings> GetById(int id);

        Task<Settings> Edit(Settings settings);
    }
}
