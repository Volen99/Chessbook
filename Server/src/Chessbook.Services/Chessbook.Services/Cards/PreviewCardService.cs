using System.Threading.Tasks;
using System.Linq;
using LinqToDB;

using Chessbook.Core.Domain.Cards;
using Chessbook.Data;

namespace Chessbook.Services.Cards
{
    public class PreviewCardService : IPreviewCardService
    {
        private readonly IRepository<PreviewCard> previewCardRepository;
        private readonly IRepository<PreviewCardPost> previewCardPostRepository;

        public PreviewCardService(IRepository<PreviewCard> previewCardRepository, IRepository<PreviewCardPost> previewCardPostRepository)
        {
            this.previewCardRepository = previewCardRepository;
            this.previewCardPostRepository = previewCardPostRepository;
        }

        public async Task Create(PreviewCard previewCard)
        {
            await this.previewCardRepository.InsertAsync(previewCard);
        }

        public async Task CreatePreviewCardPost(PreviewCardPost previewCard)
        {
            await this.previewCardPostRepository.InsertAsync(previewCard);
        }

        public async Task<PreviewCard> GetPreviewCardByPostIdAsync(int postId)
        {
            if (postId == 0)
            {
                return null;
            }

            var query = from p in this.previewCardRepository.Table
                        join pp in this.previewCardPostRepository.Table on p.Id equals pp.PreviewCardId
                        where pp.PostId == postId
                        select p;

            var pic = await query.FirstOrDefaultAsync();

            return pic;
        }
    }
}
