using Chessbook.Data.Common.Models;

namespace Chessbook.Data.Models
{
    public class UserClaim : BaseEntity
    {
        public int UserId { get; set; }

        public virtual Customer User { get; set; }

        public string ClaimType { get; set; }

        public string ClaimValue { get; set; }
    }
}
