namespace Chessbook.Services.Data.Services
{
    using System.Threading.Tasks;

    using Chessbook.Data.Models;
    using Chessbook.Data.Repositories;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models;

    public class SettingsService : BaseService, ISettingsService
    {
        protected readonly ISettingsRepository settingsRepository;

        public SettingsService(ICurrentContextProvider contextProvider, ISettingsRepository settingsRepository) : base(contextProvider)
        {
            this.settingsRepository = settingsRepository;
        }

        public async Task<SettingsDTO> Edit(SettingsDTO dto)
        {
            var settings = dto.MapTo<Settings>();
            await settingsRepository.Edit(settings, Session);
            return settings.MapTo<SettingsDTO>();
        }

        public async Task<SettingsDTO> GetById(int id)
        {
            var user = await settingsRepository.Get(id, Session);
            return user.MapTo<SettingsDTO>();
        }
    }
}
