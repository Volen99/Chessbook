namespace Chessbook.Services.Data.Services.Phone
{
    using Microsoft.EntityFrameworkCore;
    using Chessbook.Data.Common.Filters;
    using Chessbook.Data.Common.Repositories;
    using Chessbook.Data.Models.Phone;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models.Phone;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Chessbook.Data;

    public class PhoneCallService : BaseService, IPhoneCallService
    {
        protected readonly IRepository<PhoneCall> phoneCallRepository;

        public PhoneCallService(ICurrentContextProvider contextProvider, IRepository<PhoneCall> phoneCallRepository) : base(contextProvider)
        {
            this.phoneCallRepository = phoneCallRepository;
        }

        public async Task<IEnumerable<PhoneCallDTO>> GetRecentCalls(BaseFilter filter)
        {
            var calls = await this.phoneCallRepository.Table
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
