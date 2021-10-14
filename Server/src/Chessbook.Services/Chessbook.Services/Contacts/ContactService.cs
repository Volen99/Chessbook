namespace Chessbook.Services.Data.Services.Contacts
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    using Chessbook.Data;
    using Chessbook.Data.Models;
    using Chessbook.Data.Models.Contact;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models.Contact;

    public class ContactService : IContactService
    {
        protected readonly IRepository<Contact> contactRepository;
        protected readonly IRepository<ContactPhoto> contactPhotoRepository;

        public ContactService(IRepository<Contact> contactRepository, IRepository<ContactPhoto> contactPhotoRepository)
        {
            this.contactRepository = contactRepository;
            this.contactPhotoRepository = contactPhotoRepository;
        }

        public async Task<byte[]> GetContactPhoto(int contactId)
        {
            var photoContent = await this.contactPhotoRepository.Table
               .Where(obj => obj.Id == contactId)
               .Include(obj => obj.Contact)
               .FirstOrDefaultAsync();

            return photoContent?.Image;

            /*var photoContent = await contactPhotoRepository.Get(contactId, Session);
            return photoContent?.Image;*/
        }

        public async Task<IEnumerable<ContactDTO>> GetAllContacts(ContactFilter filter)
        {
            var query = this.contactRepository.Table;

            if (filter?.SearchText != null)
            {
                query = query.Where(x =>
                    x.FirstName.StartsWith(filter.SearchText) || x.LastName.StartsWith(filter.SearchText));
            }

            var contacts = await query
                .OrderBy(x => x.FirstName)
                .Skip(filter.PageSize * (filter.PageNumber - 1))
                .Take(filter.PageSize)
                .To<ContactDTO>()
                .ToArrayAsync();

            return contacts;


            //var contacts = await contactRepository.GetList(filter, Session);
            //return contacts.MapTo<IEnumerable<ContactDTO>>();
        }
    }
}
