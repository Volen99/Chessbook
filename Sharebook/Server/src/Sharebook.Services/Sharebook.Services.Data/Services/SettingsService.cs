namespace Sharebook.Services.Data.Services
{
    using System.Threading.Tasks;

    using Sharebook.Data.Models;
    using Sharebook.Data.Repositories;
    using Sharebook.Services.Mapping;
    using Sharebook.Web.Models;

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
