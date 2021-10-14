namespace Chessbook.Data.Models.Contact
{
    public class ContactPhoto : BaseEntity
    {
        public byte[] Image { get; set; }

        public virtual Contact Contact { get; set; }
    }
}
