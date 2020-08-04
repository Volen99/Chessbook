using System.Threading.Tasks;
using MassTransit;

using WorldFeed.History.BC.Science.Services.Photos;
using WorldFeed.History.Common.Messages.Media;

namespace WorldFeed.History.BC.Science.Messages.Media
{
    public class MediaCreatedConsumer : IConsumer<MediaCreatedMessage>
    {
        private readonly IMediaService mediaService;

        public MediaCreatedConsumer(IMediaService mediaService)
        {
            this.mediaService = mediaService;
        }

        public async Task Consume(ConsumeContext<MediaCreatedMessage> context)
        {
            await this.mediaService.CreateMediaAsync
                (
                    context.Message.Id,
                    context.Message.Directory,
                    context.Message.Path,
                    context.Message.FileExtension,
                    context.Message.PostId,
                    context.Message.Size,
                    context.Message.Width,
                    context.Message.Height
                );
        }
    }
}
