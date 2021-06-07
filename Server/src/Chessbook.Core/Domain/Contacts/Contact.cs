namespace Chessbook.Data.Models.Contact
{
    using global::System.Collections.Generic;

    using Chessbook.Data.Common.Models;
    using Chessbook.Data.Models.Phone;

    public class Contact : BaseEntity // BaseTrackableEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string PhoneNumber { get; set; }
        public int NumberType { get; set; }

        public virtual ContactPhoto Photo { get; set; }

        public virtual ICollection<PhoneCall> Calls { get; set; }
    }
}
