namespace Chessbook.Services.Data.Services.Contacts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Chessbook.Web.Models.Contact;
    using Chessbook.Data.Models;

    public interface IContactService
    {
        Task<IEnumerable<ContactDTO>> GetAllContacts(ContactFilter filter);
        Task<byte[]> GetContactPhoto(int contactId);
    }
}
