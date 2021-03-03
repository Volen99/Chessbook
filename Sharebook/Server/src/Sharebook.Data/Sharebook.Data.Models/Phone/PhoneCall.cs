namespace Sharebook.Data.Models.Phone
{
    using global::System;
    using Sharebook.Data.Common.Models;
    using Sharebook.Data.Models;
    using Sharebook.Data.Models.Contact;

    public class PhoneCall : BaseModel<int>
    {
        public DateTime DateOfCall { get; set; }
        public int ContactId { get; set; }
        public virtual Contact Contact { get; set; }
    }
}
