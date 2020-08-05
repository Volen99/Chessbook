namespace WorldFeed.Statistics.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Models.Statistics;
    using Services.Statistics;
    using WorldFeed.Common.Controllers;

    public class StatisticsController : ApiController
    {
        private readonly IStatisticsService statistics;

        public StatisticsController(IStatisticsService statistics) 
            => this.statistics = statistics;

        [HttpGet]
        public async Task<StatisticsOutputModel> Full()
            => await this.statistics.Full();
    }
}
