using Chessbook.Data.Common.Models;

namespace Chessbook.Data.Models
{
    public class Settings : BaseEntity
    {
        public string ThemeName { get; set; }

        public int CustomerId { get; set; }
        public virtual Customer User { get; set; }
    }
}
