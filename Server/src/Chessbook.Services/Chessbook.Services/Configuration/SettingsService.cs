namespace Chessbook.Services.Configuration
{
    using System.Linq;
    using System.Threading.Tasks;
    using LinqToDB;

    using Chessbook.Data;
    using Chessbook.Data.Models;

    public class SettingsService : ISettingsService
    {
        protected readonly IRepository<Settings> settingsRepository;

        public SettingsService(IRepository<Settings> settingsRepository)
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
