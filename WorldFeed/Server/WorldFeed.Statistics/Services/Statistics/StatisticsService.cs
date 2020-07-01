namespace WorldFeed.Statistics.Services.Statistics
{
    using System.Threading.Tasks;
    using AutoMapper;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Models.Statistics;
    using WorldFeed.Common.Models.Repositories;


    public class StatisticsService : IStatisticsService
    {
        private IDeletableEntityRepository<Statistics> statisticsRepository;

        private readonly IMapper mapper;

        public StatisticsService(IMapper mapper)
        {
            this.mapper = mapper;
        }

        public async Task<StatisticsOutputModel> Full()
            => await this.mapper
                .ProjectTo<StatisticsOutputModel>(this.statisticsRepository.All())
                .SingleOrDefaultAsync();

        public async Task AddCarAd()
        {
            var statistics = await this.statisticsRepository.All().SingleOrDefaultAsync();

            statistics.TotalCarAds++;

            await this.statisticsRepository.SaveChangesAsync();
        }
    }
}
