using MassTransit;
using System.Threading.Tasks;
using WorldFeed.Common.Messages.Uploads;
using WorldFeed.Statistics.Services.Statistics;

namespace WorldFeed.Statistics.Messages
{
    public class UploadedMediaConsumer : IConsumer<UploadMediaCreatedMessage>
    {
        private readonly IStatisticsService statisticsService;

        public UploadedMediaConsumer(IStatisticsService statisticsService)
        {
            this.statisticsService = statisticsService;
        }

        public async Task Consume(ConsumeContext<UploadMediaCreatedMessage> context)
        {
            await this.statisticsService.UploadMedia();
        }
    }
}
