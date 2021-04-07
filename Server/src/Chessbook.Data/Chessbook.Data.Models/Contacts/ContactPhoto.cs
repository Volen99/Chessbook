namespace Chessbook.Data.Models.Contact
{
    using Chessbook.Data.Common.Models;

    public class ContactPhoto : BaseEntity
    {
        public byte[] Image { get; set; }

        public virtual Contact Contact { get; set; }
    }
}
