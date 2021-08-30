namespace Chessbook.Data.Models.Post.Entities
{
    using Chessbook.Data.Common.Models;

    public class Indices : BaseDeletableModel<long>
    {
        public int IndexFirst { get; set; }

        public int IndexSecond { get; set; }
    }
}
