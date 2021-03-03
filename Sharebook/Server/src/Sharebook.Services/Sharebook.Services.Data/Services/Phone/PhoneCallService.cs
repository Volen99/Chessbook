namespace Sharebook.Services.Data.Services.Phone
{
    using Microsoft.EntityFrameworkCore;
    using Sharebook.Data.Common.Filters;
    using Sharebook.Data.Common.Repositories;
    using Sharebook.Data.Models.Phone;
    using Sharebook.Services.Mapping;
    using Sharebook.Web.Models.Phone;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class PhoneCallService : BaseService, IPhoneCallService
    {
        protected readonly IRepository<PhoneCall> phoneCallRepository;

        public PhoneCallService(ICurrentContextProvider contextProvider, IRepository<PhoneCall> phoneCallRepository) : base(contextProvider)
        {
            this.phoneCallRepository = phoneCallRepository;
        }

        public async Task<IEnumerable<PhoneCallDTO>> GetRecentCalls(BaseFilter filter)
        {
            var calls = await this.phoneCallRepository.All()
               .Include(obj => obj.Contact)
               .OrderByDescending(x => x.DateOfCall)
               .Skip((filter.PageNumber - 1) * filter.PageSize)
               .Take(filter.PageSize)
               .To<PhoneCallDTO>()
               .ToArrayAsync();

            return calls;

            //var calls = await phoneCallRepository.GetList(filter, Session);
            //return calls.MapTo<IEnumerable<PhoneCallDTO>>();
        }
    }
}
