namespace WorldFeed.AccountSettings.Services
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public interface IAccountSettingsSerivce
    {
        Task<IAccountSettingsDTO> GetAccountSettingsAsync(string userId);
    }
}
