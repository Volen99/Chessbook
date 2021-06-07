using Chessbook.Data.Common.Models;

namespace Chessbook.Data.Models
{
    public class UserPhoto : BaseEntity
    {
        public byte[] Image { get; set; }

        public virtual Customer User { get; set; }
    }
}
