using Chessbook.Data.Common.Models;

namespace Chessbook.Data.Models
{
    public class TwitchLoginName : BaseDeletableModel<int>
    {
        public string LoginName { get; set; }

        public int UserId { get; set; }
    }
}
