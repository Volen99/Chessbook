namespace WorldFeed.Statistics.Services.Statistics
{
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models.Statistics;
    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.Common.Services.Mapping;

    public class StatisticsService : IStatisticsService
    {
        private IDeletableEntityRepository<Statistics> statisticsRepository;

        public StatisticsService(IDeletableEntityRepository<Statistics> statisticsRepository)
        {
            this.statisticsRepository = statisticsRepository;
        }

        public async Task<StatisticsOutputModel> Full()
        {
            return await this.statisticsRepository.All()
                 .To<StatisticsOutputModel>()
                 .SingleOrDefaultAsync();
        }

        public async Task UploadMedia()
        {
            var statistics = await this.statisticsRepository.All()
                .SingleOrDefaultAsync();

            statistics.TotalUploads++;

            await this.statisticsRepository.SaveChangesAsync();
        }
    }
}
