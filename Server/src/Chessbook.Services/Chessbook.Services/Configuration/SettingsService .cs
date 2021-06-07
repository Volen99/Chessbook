namespace Chessbook.Services.Data.Services
{
    using System.Linq;
    using System.Threading.Tasks;
    using Chessbook.Data;
    using Chessbook.Data.Models;
    using Chessbook.Data.Repositories;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models;
    using LinqToDB;

    public class SettingsService : BaseService, ISettingsService
    {
        protected readonly IRepository<Settings> settingsRepository;

        public SettingsService(ICurrentContextProvider contextProvider, IRepository<Settings> settingsRepository) : base(contextProvider)
        {
            this.settingsRepository = settingsRepository;
        }

        public async Task CreateAsync(Settings settings)
        {
            await this.settingsRepository.InsertAsync(settings);
        }

        public async Task<Settings> GetById(int userId)
        {
            var user = await settingsRepository.Table
                .Where(s => s.CustomerId == userId)
                .FirstOrDefaultAsync();

            return user;
        }

        public async Task<Settings> Edit(Settings settings)
        {
            await settingsRepository.UpdateAsync(settings);

            return settings;
        }
    }
}
