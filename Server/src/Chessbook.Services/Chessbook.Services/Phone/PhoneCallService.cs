namespace Chessbook.Services.Data.Services.Phone
{
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    using Chessbook.Data.Common.Filters;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models.Phone;
    using Chessbook.Data;
    using Chessbook.Data.Models.Phone;

    public class PhoneCallService : IPhoneCallService
    {
        protected readonly IRepository<PhoneCall> phoneCallRepository;

        public PhoneCallService(IRepository<PhoneCall> phoneCallRepository)
        {
            this.phoneCallRepository = phoneCallRepository;
        }

        public async Task<IEnumerable<PhoneCall>> GetRecentCalls(BaseFilter filter)
        {
            var calls = await this.phoneCallRepository.Table
               .Include(obj => obj.Contact)
               .OrderByDescending(x => x.DateOfCall)
               .Skip((filter.PageNumber - 1) * filter.PageSize)
               .Take(filter.PageSize)
               .ToArrayAsync();

            return calls;

            //var calls = await phoneCallRepository.GetList(filter, Session);
            //return calls.MapTo<IEnumerable<PhoneCallDTO>>();
        }
    }
}
