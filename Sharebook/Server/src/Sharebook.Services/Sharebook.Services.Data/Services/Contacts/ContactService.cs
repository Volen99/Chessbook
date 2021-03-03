namespace Sharebook.Services.Data.Services.Contacts
{
    using Microsoft.EntityFrameworkCore;
    using Sharebook.Data.Common.Repositories;
    using Sharebook.Data.Models;
    using Sharebook.Data.Models.Contact;
    using Sharebook.Services.Mapping;
    using Sharebook.Web.Models.Contact;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class ContactService : BaseService, IContactService
    {
        protected readonly IDeletableEntityRepository<Contact> contactRepository;
        protected readonly IRepository<ContactPhoto> contactPhotoRepository;

        public ContactService(ICurrentContextProvider contextProvider, IDeletableEntityRepository<Contact> contactRepository, IRepository<ContactPhoto> contactPhotoRepository)
            : base(contextProvider)
        {
            this.contactRepository = contactRepository;
            this.contactPhotoRepository = contactPhotoRepository;
        }

        public async Task<IEnumerable<ContactDTO>> GetAllContacts(ContactFilter filter)
        {
            var query = this.contactRepository.All();

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

        public async Task<byte[]> GetContactPhoto(int contactId)
        {
            var photoContent = await this.contactPhotoRepository.All()
               .Where(obj => obj.Id == contactId)
               .Include(obj => obj.Contact)
               .FirstOrDefaultAsync();

            return photoContent?.Image;

            /*var photoContent = await contactPhotoRepository.Get(contactId, Session);
            return photoContent?.Image;*/
        }
    }
}
