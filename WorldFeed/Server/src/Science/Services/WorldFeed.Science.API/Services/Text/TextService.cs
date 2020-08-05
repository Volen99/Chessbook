namespace WorldFeed.Science.API.Services.Text
{
    using MassTransit;
    using System.Threading.Tasks;

    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.Science.API.Services.Files;

    public class TextService : ITextService
    {
        private readonly IDeletableEntityRepository<Data.Models.Text> textRepository;
        private readonly IMediaService mediaService;
        private readonly IBus publisher;

        public TextService(IDeletableEntityRepository<Data.Models.Text> textRepository, IMediaService mediaService, IBus publisher)
        {
            this.textRepository = textRepository;
            this.mediaService = mediaService;
            this.publisher = publisher;
        }

        public async Task<int> CreateTextAsync(string text, int postId)
        {
            var textNew = new Data.Models.Text
            {
                Content = text,
                PostId = postId,
            };

            await this.textRepository.AddAsync(textNew);
            await this.textRepository.SaveChangesAsync();

            return textNew.Id;
        }
    }
}
