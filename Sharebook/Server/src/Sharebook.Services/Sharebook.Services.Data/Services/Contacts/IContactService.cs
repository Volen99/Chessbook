namespace Sharebook.Services.Data.Services.Contacts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Sharebook.Web.Models.Contact;
    using Sharebook.Data.Models;

    public interface IContactService
    {
        Task<IEnumerable<ContactDTO>> GetAllContacts(ContactFilter filter);
        Task<byte[]> GetContactPhoto(int contactId);
    }
}
