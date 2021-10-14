using System;
using System.Threading.Tasks;

using Chessbook.Common;
using Chessbook.Core.Domain.Cards;
using Chessbook.Services.Data.Services.Media;
using Chessbook.Web.Api.Models.Cards;

namespace Chessbook.Web.Api.Factories
{
    public class PreviewCardFactory : IPreviewCardFactory
    {
        private readonly IPictureService pictureService;

        public PreviewCardFactory(IPictureService pictureService)
        {
            this.pictureService = pictureService;
        }

        public async Task<PreviewCardModel> PreparePreviewCardModel(PreviewCard previewCard)
        {
            if (previewCard == null)
            {
                throw new ArgumentNullException(nameof(previewCard));
            }

            var model = new PreviewCardModel
            {
                Url = previewCard.Url,
                Title = previewCard.Title,
                Description = previewCard.Description,
                Type = previewCard.Type == PreviewCardType.Link ? "link" : previewCard.Type == PreviewCardType.Photo ? "photo" : previewCard.Type == PreviewCardType.Video ? "video" : "rich",
                AuthorName = previewCard.AuthorName,
                AuthorUrl = previewCard.AuthorUrl,
                ProviderName = previewCard.ProviderName,
                ProviderUrl = previewCard.ProviderUrl,
                Html = previewCard.Html,
                Width = previewCard.Width,
                Height = previewCard.Height,
                Image = previewCard.PictureId.HasValue ? ChessbookConstants.SiteHttps + await this.pictureService.GetPictureUrlAsync(previewCard.PictureId.Value, 400, true) : null,
                Blurhash = previewCard.Blurhash,
            };

            return model;
        }
    }
}
