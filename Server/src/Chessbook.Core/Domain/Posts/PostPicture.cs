using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Posts
{
    /// <summary>
    /// Represents a product picture mapping
    /// </summary>
    public partial class PostPicture : BaseEntity
    {
        /// <summary>
        /// Gets or sets the product identifier
        /// </summary>
        public int PostId { get; set; }

        /// <summary>
        /// Gets or sets the picture identifier
        /// </summary>
        public int PictureId { get; set; }

        /// <summary>
        /// Gets or sets the display order
        /// </summary>
        public int DisplayOrder { get; set; }
    }
}
