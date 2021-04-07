namespace Chessbook.Web.Models.Phone
{
    using System;

    using Chessbook.Data.Models.Phone;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models.Contact;

    public class PhoneCallDTO : IMapFrom<PhoneCall>, IMapTo<PhoneCall>
    {
        public int Id { get; set; }

        public ContactDTO Contact { get; set; }

        public DateTime DateOfCall { get; set; }
    }
}
