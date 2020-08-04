namespace WorldFeed.History.BC.Science.Services.Text
{
    using MassTransit;
    using System.Threading.Tasks;

    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.History.BC.Science.Data.Models;

    public class TextService : ITextService
    {
        private readonly IDeletableEntityRepository<Text> textRepository;
        private readonly IBus publish;

        public TextService(IDeletableEntityRepository<Text> textRepository, IBus publish)
        {
            this.textRepository = textRepository;
            this.publish = publish;
        }

        public async Task<int> CreateTextAsync(int textId, string content, int postId)
        {
            var textNew = new Text
            {
                //Id = textId,
                Content = content,
                PostId = postId,
            };

            await this.textRepository.AddAsync(textNew);
            await this.textRepository.SaveChangesAsync();

            return textNew.Id;
        }
    }
}
