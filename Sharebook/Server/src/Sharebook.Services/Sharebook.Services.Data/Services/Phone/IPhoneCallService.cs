namespace Sharebook.Services.Data.Services.Phone
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Sharebook.Data.Common.Filters;
    using Sharebook.Web.Models.Phone;

    public interface IPhoneCallService
    {
        Task<IEnumerable<PhoneCallDTO>> GetRecentCalls(BaseFilter filter);
    }
}
