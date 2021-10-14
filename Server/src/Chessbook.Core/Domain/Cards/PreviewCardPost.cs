using Chessbook.Core.Domain.Posts;
using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Cards
{
    public class PreviewCardPost : BaseEntity
    {
        public int PreviewCardId { get; set; }
        public PreviewCard PreviewCard { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }

    }
}
