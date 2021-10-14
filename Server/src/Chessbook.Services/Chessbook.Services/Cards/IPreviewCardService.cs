using System.Threading.Tasks;
using Chessbook.Core.Domain.Cards;

namespace Chessbook.Services.Cards
{
    public interface IPreviewCardService
    {
        Task Create(PreviewCard previewCard);

        Task CreatePreviewCardPost(PreviewCardPost previewCard);

        Task<PreviewCard> GetPreviewCardByPostIdAsync(int postId);
    }
}
