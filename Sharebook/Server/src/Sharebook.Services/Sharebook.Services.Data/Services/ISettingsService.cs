namespace Sharebook.Services.Data.Services
{
    using System.Threading.Tasks;

    using Sharebook.Web.Models;

    public interface ISettingsService
    {
        Task<SettingsDTO> GetById(int id);

        Task<SettingsDTO> Edit(SettingsDTO settings);
    }
}
