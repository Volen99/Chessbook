namespace Chessbook.Services.Data.Services
{
    using System.Threading.Tasks;

    using Chessbook.Web.Models;

    public interface ISettingsService
    {
        Task<SettingsDTO> GetById(int id);

        Task<SettingsDTO> Edit(SettingsDTO settings);
    }
}
