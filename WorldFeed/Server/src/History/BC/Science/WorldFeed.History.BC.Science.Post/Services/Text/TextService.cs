namespace WorldFeed.History.API.Services.Text
{
    using MassTransit;
    using System.Threading.Tasks;

    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.History.API.Data.Models.Enums;
    using WorldFeed.History.API.Services.Files;
    using WorldFeed.History.Common.Messages.Posts;
    using WorldFeed.History.Common.Messages.Texts;
    using WorldFeed.History.API.Data.Models;

    public class TextService : ITextService
    {
        private readonly IDeletableEntityRepository<Text> textRepository;
        private readonly IMediaService mediaService;
        private readonly IBus publisher;

        public TextService(IDeletableEntityRepository<Text> textRepository, IMediaService mediaService, IBus publisher)
        {
            this.textRepository = textRepository;
            this.mediaService = mediaService;
            this.publisher = publisher;
        }

        public async Task<int> CreateTextAsync(string text, int postId)
        {
            var textNew = new Text
            {
                Content = text,
                PostId = postId,
            };

            await this.textRepository.AddAsync(textNew);
            await this.textRepository.SaveChangesAsync();

            await this.mediaService.ChangeAllStatus(postId, Status.Inserted);

            // TODO: Add Outbox Pattern

            await this.publisher.Publish(new TextCreatedMessage
            {
                Id = textNew.Id,
                Content = textNew.Content,
                PostId = textNew.PostId,
            });

            await this.publisher.Publish(new PostUploadedMessage { PostId = postId });

            return textNew.Id;
        }
    }
}
