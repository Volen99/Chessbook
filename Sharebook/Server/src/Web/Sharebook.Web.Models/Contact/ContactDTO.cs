namespace Sharebook.Web.Models.Contact
{
    using Sharebook.Services.Mapping;
    using Sharebook.Data.Models.Contact;

    public class ContactDTO : IMapFrom<Contact>, IMapTo<Contact>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

       // public ContactNumberTypeEnum NumberType { get; set; }

        public int NumberType { get; set; }
    }
}
