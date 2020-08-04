namespace WorldFeed.History.BC.Science.Messages.Texts
{
    using MassTransit;
    using System.Threading.Tasks;
    using WorldFeed.History.BC.Science.Services.Text;
    using WorldFeed.History.Common.Messages.Texts;

    public class TextCreatedConsumer : IConsumer<TextCreatedMessage>
    {
        private readonly ITextService textService;

        public TextCreatedConsumer(ITextService textService)
        {
            this.textService = textService;
        }

        public async Task Consume(ConsumeContext<TextCreatedMessage> context)
        {
                await this.textService.CreateTextAsync
                (
                    context.Message.Id,
                    context.Message.Content,
                    context.Message.PostId
                );
        }
    }
}
