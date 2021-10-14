using System.Threading.Tasks;

using Chessbook.Core.Domain.Cards;
using Chessbook.Web.Api.Models.Cards;

namespace Chessbook.Web.Api.Factories
{
    public interface IPreviewCardFactory
    {
        Task<PreviewCardModel> PreparePreviewCardModel(PreviewCard previewCard);
    }
}
