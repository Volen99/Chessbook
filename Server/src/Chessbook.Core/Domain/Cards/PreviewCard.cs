using System;
using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Cards
{
    public class PreviewCard : BaseEntity
    {
        public string Url { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string ImageFileName { get; set; } // Preview thumbnail.

        public string ImageContentType { get; set; }

        public int ImageFileSize { get; set; }

        public DateTime ImageUpdatedAt { get; set; }

        public PreviewCardType Type { get; set; }

        public string Html { get; set; } // HTML to be used for generating the preview card

        public string AuthorName { get; set; } // The author of the original resource

        public string AuthorUrl { get; set; }  // A link to the author of the original resource

        public string ProviderName { get; set; } // The provider of the original resource

        public string ProviderUrl { get; set; } // A link to the provider of the original resource.

        public int Width { get; set; } // Width of preview, in pixels

        public int Height { get; set; } // Height of preview, in pixels

        public string EmbedUrl { get; set; } // Used for photo embeds, instead of custom html

        public int ImageStorageSchemaVersion { get; set; }

        public string Blurhash { get; set; } //  A hash computed by the BlurHash algorithm, for generating colorful preview thumbnails when media has not been downloaded yet

        public int? PictureId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
