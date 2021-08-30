using Chessbook.Data.Common.Models;

namespace Chessbook.Data.Models.Post.Entities
{
    /// <summary>
    /// Object storing information related with media size on Chessbook
    /// </summary>
    public class MediaEntitySize : BaseEntity
    {
        public int MediaId { get; set; }

        public string Variant { get; set; }

        public int? Width { get; set; }

        public int? Height { get; set; }

        public string Resize { get; set; } // Resizing method used to obtain this size
    }
}
