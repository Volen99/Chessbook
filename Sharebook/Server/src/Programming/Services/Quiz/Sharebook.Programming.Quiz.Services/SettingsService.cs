namespace WorldFeed.Programming.Quiz.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;

    using WorldFeed.Programming.Quiz.Data.Common.Repositories;
    using WorldFeed.Programming.Quiz.Data.Models;
    using WorldFeed.Programming.Quiz.Services.Mapping;

    public class SettingsService : ISettingsService
    {
        private readonly IDeletableEntityRepository<Setting> settingsRepository;

        public SettingsService(IDeletableEntityRepository<Setting> settingsRepository)
        {
            this.settingsRepository = settingsRepository;
        }

        public IEnumerable<T> GetAll<T>()
        {
            return this.settingsRepository.All().To<T>().ToList();
        }

        public int GetCount()
        {
            return this.settingsRepository.All().Count();
        }
    }
}
