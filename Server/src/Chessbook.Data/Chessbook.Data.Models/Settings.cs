using Chessbook.Data.Common.Models;

namespace Chessbook.Data.Models
{
    public class Settings : BaseEntity
    {
        public string ThemeName { get; set; }

        public virtual User User { get; set; }
    }
}
