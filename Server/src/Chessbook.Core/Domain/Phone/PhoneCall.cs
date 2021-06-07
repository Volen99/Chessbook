namespace Chessbook.Data.Models.Phone
{
    using global::System;
    using Chessbook.Data.Common.Models;
    using Chessbook.Data.Models;
    using Chessbook.Data.Models.Contact;

    public class PhoneCall : BaseEntity
    {
        public DateTime DateOfCall { get; set; }
        public int ContactId { get; set; }
        public virtual Contact Contact { get; set; }
    }
}
