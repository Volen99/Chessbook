using System;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Cards;
using Chessbook.Services.Data.Services.Media;
using Chessbook.Web.Api.Models.Cards;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Chessbook.Web.Api.Factories
{
    public class PreviewCardFactory : IPreviewCardFactory
    {
        private readonly IPictureService pictureService;
        private readonly IWebHostEnvironment env;

        public PreviewCardFactory(IPictureService pictureService, IWebHostEnvironment env)
        {
            this.pictureService = pictureService;
            this.env = env;
        }

        public async Task<PreviewCardModel> PreparePreviewCardModel(PreviewCard previewCard)
        {
            if (previewCard == null)
            {
                throw new ArgumentNullException(nameof(previewCard));
            }

            var siteUrl = this.env.IsDevelopment() ? "https://localhost:5001" : "https://chessbook.me";
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
                Image = previewCard.PictureId.HasValue ? siteUrl + await this.pictureService.GetPictureUrlAsync(previewCard.PictureId.Value, 400, true) : null,
                Blurhash = previewCard.Blurhash,
            };

            return model;
        }
    }
}
