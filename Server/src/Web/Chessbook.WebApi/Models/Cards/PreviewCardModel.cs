using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.Cards
{
    public record PreviewCardModel : BaseNopEntityModel
    {
        public string Url { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Type { get; set; }

        public string AuthorName { get; set; }

        public string AuthorUrl { get; set; }

        public string ProviderName { get; set; }

        public string ProviderUrl { get; set; }

        public string Html { get; set; } 

        public int Width { get; set; }

        public int Height { get; set; }

        public string Image { get; set; }

        public string EmbedUrl { get; set; }

        public string Blurhash { get; set; }
    }
}
