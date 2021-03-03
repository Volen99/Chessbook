namespace Sharebook.Web.Models.Phone
{
    using System;

    using Sharebook.Data.Models.Phone;
    using Sharebook.Services.Mapping;
    using Sharebook.Web.Models.Contact;

    public class PhoneCallDTO : IMapFrom<PhoneCall>, IMapTo<PhoneCall>
    {
        public int Id { get; set; }

        public ContactDTO Contact { get; set; }

        public DateTime DateOfCall { get; set; }
    }
}
