using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Tournaments
{
    // 25.08.2021, Wednesday, 18:17 | Dark City Ambient
    public class Tournament : BaseEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Picture { get; set; }

        public string Date { get; set; }

        public string Site { get; set; }

        public string Twitter { get; set; }

        public string Facebook { get; set; }

        public string Youtube { get; set; }

        public string Status { get; set; }

        public int PlayerCount { get; set; }

        public int DisplayOrder { get; set; }
    }
}
