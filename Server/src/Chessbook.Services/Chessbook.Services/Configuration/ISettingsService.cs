namespace Chessbook.Services.Data.Services
{
    using System.Threading.Tasks;
    using Chessbook.Data.Models;
    using Chessbook.Web.Models;

    public interface ISettingsService
    {
        Task CreateAsync(Settings setting);

        Task<Settings> GetById(int id);

        Task<Settings> Edit(Settings settings);
    }
}
